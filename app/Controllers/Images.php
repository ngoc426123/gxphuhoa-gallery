<?php

namespace App\Controllers;

use App\Models\Images as ModelsImages;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class Images extends ResourceController {
	public function count() {
		$imagesModel = new ModelsImages();
		$imagesCount = $imagesModel
			->selectCount('id')
			->first();

		$dataRespond = [
			"count" => $imagesCount["id"],
		];

		return $this->respond($dataRespond, ResponseInterface::HTTP_ACCEPTED);
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
		$imagesModel = new ModelsImages();
		$imagesCount = $imagesModel
			->selectCount("id")
			->where([
				"SUBSTRING(date, 4, 2)" => padding_number($month, 2),
				"SUBSTRING(date, 7, 4)" => $year,
			])
			->first();
		$dataRespond = [ "count" => $imagesCount["id"] ];

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

		$dataRespond = ["count" => $result];

		return $this->respond($dataRespond, ResponseInterface::HTTP_NOT_FOUND);
	}

	public function countRecent() {
		$params = $this->request->getPostGet();

		if (!isset($params["numberyearrecent"])) {
			$dataRespond = [
				"error" => "Thiếu trường số lượng năm.",
			];

			return $this->respond($dataRespond, ResponseInterface::HTTP_NOT_FOUND);
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

		$dataRespond = $result;

		return $this->respond($dataRespond, ResponseInterface::HTTP_OK);
	}

	public function capacity() {
		helper('number');
		$imagesModel = new ModelsImages();
		$capacityCount = $imagesModel
			->selectSum("size")
			->first();

		$dataRespond = [
			"capacity" => number_to_size($capacityCount["size"]),
		];

		return $this->respond($dataRespond, ResponseInterface::HTTP_OK);
	}
}
