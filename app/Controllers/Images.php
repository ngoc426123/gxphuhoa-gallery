<?php

namespace App\Controllers;

use App\Models\Images as ModelsImages;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class Images extends ResourceController {
	public function Count() {
		$imagesModel = new ModelsImages();
		$imagesCount = $imagesModel
			->selectCount('id')
			->first();

		$respondData = [
			"count" => $imagesCount["id"],
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
		$imagesModel = new ModelsImages();
		$imagesCount = $imagesModel
			->selectCount("id")
			->where([
				"SUBSTRING(date, 4, 2)" => padding_number($month, 2),
				"SUBSTRING(date, 7, 4)" => $year,
			])
			->first();
		$respondData = [ "count" => $imagesCount["id"] ];

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
		$imagesModel = new ModelsImages();

		for ($i=1; $i <= 12; $i++) { 
			$imageCount = $imagesModel
				->selectCount("id")
				->where([
					"SUBSTRING(date, 4, 2)" => padding_number($i, 2),
					"SUBSTRING(date, 7, 4)" => $year,
				])
				->first();
			$result[] = $imageCount["id"];
		}

		$respondData = ["count" => $result];

		return $this->respond($respondData, ResponseInterface::HTTP_NOT_FOUND);
	}

	public function CountRecent() {
		$params = $this->request->getPostGet();

		if (!isset($params["numberyearrecent"])) {
			$respondData = [
				"error" => "Thiếu trường số lượng năm.",
			];

			return $this->respond($respondData, ResponseInterface::HTTP_NOT_FOUND);
		}

		$numberYearRecent = $params["numberyearrecent"];
		$currentYear = date('Y');
		$preYear = $currentYear - ($numberYearRecent - 1);
		$imagesModel = new ModelsImages();

		for ($i=$preYear; $i <= $currentYear; $i++) { 
			$imageCount = $imagesModel
				->selectCount("id")
				->where("SUBSTRING(date, 7, 4)", $i)
				->first();
			$result[$i] = $imageCount["id"];
		}

		$respondData = $result;

		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}

	public function Capacity() {
		helper('number');
		$imagesModel = new ModelsImages();
		$capacityCount = $imagesModel
			->selectSum("size")
			->first();

		$respondData = [
			"capacity" => number_to_size($capacityCount["size"]),
		];

		return $this->respond($respondData, ResponseInterface::HTTP_OK);
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
		$imagesModel = new ModelsImages();
		$imagesCounter = $imagesModel
			->selectCount("id")
			->first();
		$imagesData = $imagesModel
			->select("id, name, thumb, date, size, location")
			->orderBy("id", "DESC")
			->limit($perpage, $start)
			->findAll();
		
		foreach ($imagesData as $key => $value) {
			$imagesData[$key] = array_merge($value, getImageUrl($value));
		}

		$imagesTotal = $imagesCounter["id"];

		$respondData = [
			"data" => $imagesData,
			"count" => count($imagesData),
			"more" => $start + $perpage < $imagesTotal,
		];

		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}

	public function Remove() {
		helper('filesystem');
		$imagesModel = new ModelsImages();
		$body = $this->request->getBody();
		$param = json_decode($body, true);

		foreach ($param as $key => $value) {
			$imageID = $value["id"];
			$urlPath = getImagePath($value);
			
			// REMOVE FROM DATABASE
			$imagesModel
				->where("id", $imageID)
				->delete();

			// REMOVE FROM SOURCE
			unlink($urlPath["imagePath"]);
			unlink($urlPath["thumbPath"]);
		}

		return $this->respond(["success" => $param], ResponseInterface::HTTP_OK);
	}
}
