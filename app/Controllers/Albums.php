<?php

namespace App\Controllers;

use App\Models\Albums as ModelsAlbums;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class Albums extends ResourceController {
	public function count() {
		$albumsModel = new ModelsAlbums();
		$albumsCount = $albumsModel
			->selectCount('id')
			->first();

		$dataRespond = [
			"count" => $albumsCount["id"],
		];

		return $this->respond($dataRespond, ResponseInterface::HTTP_OK);
	}

	public function countInTime() {
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

	public function countInYear() {
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
}
