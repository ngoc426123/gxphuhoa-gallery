<?php

namespace App\Controllers;

use App\Models\Albums as ModelsAlbums;
use App\Models\Images as ModelImages;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class Albums extends ResourceController {
	public function Count() {
		$albumsModel = new ModelsAlbums();
		$albumsCount = $albumsModel
			->selectCount('id')
			->first();

		$dataRespond = [
			"count" => $albumsCount["id"],
		];

		return $this->respond($dataRespond, ResponseInterface::HTTP_OK);
	}

	public function CountInTime() {
		$params = $this->request->getPostGet();

		if (!isset($params["month"]) || !isset($params["year"])) {
			$dataRespond = [
				"error" => "Thiếu 1 trong 2 trường tháng và năm.",
			];

			return $this->respond($dataRespond, ResponseInterface::HTTP_NOT_FOUND);
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
		$dataRespond = [ "count" => $albumsCount["id"] ];

		return $this->respond($dataRespond, ResponseInterface::HTTP_OK);
	}

	public function CountInYear() {
		$params = $this->request->getPostGet();

		if (!isset($params["year"])) {
			$dataRespond = [
				"error" => "Thiếu trường năm.",
			];

			return $this->respond($dataRespond, ResponseInterface::HTTP_NOT_FOUND);
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

		$dataRespond = ["count" => $result];

		return $this->respond($dataRespond, ResponseInterface::HTTP_NOT_FOUND);
	}

	public function List() {
		$params = $this->request->getPostGet();

		if (!isset($params["start"]) || !isset($params["perpage"])) {
			$dataRespond = [
				"error" => "Thiếu 1 trong 2 trường start hoặc perpage",
			];

			return $this->respond($dataRespond, ResponseInterface::HTTP_NOT_FOUND);
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
				->select("images.id, images.thumb, images.location")
				->join("relationships", "relationships.id_albums = albums.id")
				->join("images", "images.id = relationships.id_images")
				->where("albums.id", $value["id"])
				->orderBy("images.id", "ASC")
				->first();
			
			$albumsData[$key]["thumbnail"] = $albumsThumb;
		}

		$dataRespond = [
			"data" => $albumsData,
			"count" => count($albumsData),
			"more" => $start + $perpage < $albumsTotal,
		];

		return $this->respond($dataRespond, ResponseInterface::HTTP_OK);
	}

	public function Detail($id) {
		$imagesModel = new ModelImages();
		$albumsModel = new ModelsAlbums();
		$albumsData = $albumsModel
			->select("id, name, slug, date, sl")
			->orderBy("id", "DESC")
			->where("id", $id)
			->findAll();
		$imagesData = $imagesModel
			->select("images.id, images.thumb, images.location")
			->join("relationships", "relationships.id_images = images.id")
			->join("albums", "albums.id = relationships.id_albums")
			->where("albums.id", $id)
			->orderBy("images.id", "ASC")
			->findAll();
		
		$dataRespond = [
			"detail" => $albumsData,
			"images" => $imagesData
		];

		return $this->respond($dataRespond, ResponseInterface::HTTP_OK);
	}
}
