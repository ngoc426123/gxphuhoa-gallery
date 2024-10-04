<?php

namespace App\Controllers;

use App\Models\Albums as ModelsAlbums;
use App\Models\Images as ModelImages;
use App\Models\Relationships as ModelRelationships;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\I18n\Time;

class Albums extends ResourceController {
	public function Count() {
		$albumsModel = new ModelsAlbums();
		$albumsCount = $albumsModel
			->selectCount('id')
			->first();

		$respondData = [
			"count" => $albumsCount["id"],
		];

		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}

	public function CountInTime() {
		$params = $this->request->getPostGet();

		if (!isset($params["month"]) || !isset($params["year"])) {
			$respondData = [
				"error" => "Thiếu 1 trong 2 trường tháng và năm.",
			];

			return $this->respond($respondData, ResponseInterface::HTTP_NOT_FOUND);
		}

		$month = $params["month"];
		$year = $params["year"];
		$albumsModel = new ModelsAlbums();
		$albumsCount = $albumsModel
			->selectCount("id")
			->where([
				"SUBSTRING(date, 4, 2)" => padding_number($month, 2),
				"SUBSTRING(date, 7, 4)" => $year,
			])
			->first();
		$respondData = [ "count" => $albumsCount["id"] ];

		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}

	public function CountInYear() {
		$params = $this->request->getPostGet();

		if (!isset($params["year"])) {
			$respondData = [
				"error" => "Thiếu trường năm.",
			];

			return $this->respond($respondData, ResponseInterface::HTTP_NOT_FOUND);
		}

		$year = $params["year"];
		$result = [];
		$albumsModel = new ModelsAlbums();

		for ($i=1; $i <= 12; $i++) { 
			$albumCount = $albumsModel
				->selectCount("id")
				->where([
					"SUBSTRING(date, 4, 2)" => padding_number($i, 2),
					"SUBSTRING(date, 7, 4)" => $year,
				])
				->first();
			$result[] = $albumCount["id"];
		}

		$respondData = ["count" => $result];

		return $this->respond($respondData, ResponseInterface::HTTP_NOT_FOUND);
	}

	public function List() {
		$params = $this->request->getPostGet();

		if (!isset($params["start"]) || !isset($params["perpage"])) {
			$respondData = [
				"error" => "Thiếu 1 trong 2 trường start hoặc perpage",
			];

			return $this->respond($respondData, ResponseInterface::HTTP_NOT_FOUND);
		}

		$start = (int)$params["start"];
		$perpage = (int)$params["perpage"];
		$albumsModel = new ModelsAlbums();
		$albumsCounter = $albumsModel
			->selectCount("id")
			->first();
		$albumsData = $albumsModel
			->select("id, name, slug, date, sl")
			->orderBy("id", "DESC")
			->limit($perpage, $start)
			->findAll();

		$albumsTotal = $albumsCounter["id"];

		foreach ($albumsData as $key => $value) {
			$albumsThumb = $albumsModel
				->select("images.name, images.id, images.thumb, images.location")
				->join("relationships", "relationships.id_albums = albums.id")
				->join("images", "images.id = relationships.id_images")
				->where(["albums.id" => $value["id"]])
				->orderBy("images.id", "ASC")
				->first();
			$albumsThumb = array_merge($albumsThumb, getImageUrl($albumsThumb));
			
			$albumsData[$key]["thumbnail"] = $albumsThumb;
		}

		$respondData = [
			"data" => $albumsData,
			"count" => count($albumsData),
			"more" => $start + $perpage < $albumsTotal,
		];

		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}

	public function Detail($id = null) {
		if (!$id) {
			$respondData = [
				"error" => "Thiếu ID",
			];

			return $this->respond($respondData, ResponseInterface::HTTP_NOT_FOUND);
		}

		$imagesModel = new ModelImages();
		$albumsModel = new ModelsAlbums();
		$albumsData = $albumsModel
			->select("id, name, slug, date, sl")
			->orderBy("id", "DESC")
			->where("id", $id)
			->first();
		$imagesData = $imagesModel
			->select("images.name, images.id, images.thumb, images.location")
			->join("relationships", "relationships.id_images = images.id")
			->join("albums", "albums.id = relationships.id_albums")
			->where("albums.id", $id)
			->orderBy("images.id", "ASC")
			->findAll();

		foreach ($imagesData as $key => $value) {
			$imagesData[$key]=array_merge($value, getImageUrl($value));
		}
		
		$respondData = [
			"detail" => $albumsData,
			"images" => $imagesData
		];

		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}

	public function Create() {
		$body = $this->request->getBody();
		$params = json_decode($body, true);

		if (!isset($params["album_title"]) || !isset($params["list_images"])) {
			$respondData = [
				"error" => "Thiếu 1 trong 2 trường album_title hoặc list_images",
			];

			return $this->respond($respondData, ResponseInterface::HTTP_NOT_FOUND);
		}

		helper('text');
		$albumsModel = new ModelsAlbums();
		$relationshipsModel = new ModelRelationships();
		$myTime = Time::now("Asia/Ho_Chi_Minh");

		// CREATE ALBUMS
		$dataAlbumsInsert = [
			"id" => "",
			"name" =>  $params["album_title"],
			"slug" => url_title(convert_accented_characters(strtolower($params["album_title"]), '-')),
			"date" => $myTime->toLocalizedString(),
			"sl" => count($params["list_images"]),
			"stt" => 1,
		];

		$albumsModel->insert($dataAlbumsInsert);
		$IDAlbumInsert = $albumsModel->insertID();

		// CREATE RELATIONSHIPS ALBUMS AND IMAGES
		$dataImagesRelationshipInsert = [];

		foreach ($params["list_images"] as $key => $value) {
			$dataImagesRelationshipInsert[] = [
				"id" => "",
				"id_albums" => $IDAlbumInsert,
				"id_images" => $value["id"]
			];
		}
	
		$relationshipsModel
			->insertBatch($dataImagesRelationshipInsert);

		// GET ADDED ALBUMS
		$albumsData = $albumsModel
			->select("id, name, slug, date, sl")
			->orderBy("id", "DESC")
			->where(["id" => $IDAlbumInsert])
			->first();
		$albumsThumb = $albumsModel
			->select("images.name, images.id, images.thumb, images.location")
			->join("relationships", "relationships.id_albums = albums.id")
			->join("images", "images.id = relationships.id_images")
			->where(["albums.id" => $IDAlbumInsert])
			->orderBy("images.id", "ASC")
			->first();
		$albumsThumb = array_merge($albumsThumb, getImageUrl($albumsThumb));

		$albumsData["thumbnail"] = $albumsThumb;

		// RESNPOND DATA
		$respondData = ["data" => $albumsData];
		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}

	public function Update($id = null) {
		if (!$id) {
			$respondData = [
				"error" => "Thiếu ID",
			];

			return $this->respond($respondData, ResponseInterface::HTTP_NOT_FOUND);
		}

		$body = $this->request->getBody();
		$params = json_decode($body, true);

		if (!isset($params["album_title"])) {
			$respondData = [
				"error" => "Thiếu trường album_title",
			];

			return $this->respond($respondData, ResponseInterface::HTTP_NOT_FOUND);
		}

		helper('text');
		$albumsModel = new ModelsAlbums();

		// DATA EDIT ALBUMS
		$albumTitle = $params["album_title"];
		$dataAlbumsEdit = [
			"name" =>  $albumTitle,
			"slug" => url_title(convert_accented_characters(strtolower($albumTitle), '-')),
		];

		$albumsModel
			->set($dataAlbumsEdit)
			->where("id", $id)
			->update();

		// RESNPOND DATA
		$respondData = [
			"albumsID" => $id,
			"albumsTitle" => $params["album_title"],
		];
		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}

	public function Remove($id = null) {
		if (!$id) {
			$respondData = [
				"error" => "Thiếu ID",
			];

			return $this->respond($respondData, ResponseInterface::HTTP_NOT_FOUND);
		}

		$albumsModel = new ModelsAlbums();
		$relationshipsModel = new ModelRelationships();
		$albumsModel
			->where(["id" => $id])
			->delete();
		$relationshipsModel
			->where(["id_albums" => $id])
			->delete();

		$respondData = ["albumsID" => $id];
		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}
}
