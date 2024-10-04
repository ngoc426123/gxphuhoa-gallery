<?php

namespace App\Controllers;

use App\Models\Images as ModelImages;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\I18n\Time;

class Upload extends ResourceController {
	public function index(){
		$image = service("image", "gd");
		$imagesModel = new ModelImages();
		$myTime = Time::now("Asia/Ho_Chi_Minh");
		$year = $myTime->getYear();
		$month = str_pad($myTime->getMonth(), "0", STR_PAD_LEFT);
		$locaTime = $myTime->toLocalizedString();

		// DATA RESPONSE
		$respondData = [];

		// FILES
		$files = $this->request->getFiles();

		// THUMBNAIL DIMEMSION
		$dim = $this->request->getPost()["dim_data"];
		$dim = json_decode($dim);

		foreach ($files as $img) {
			// UPLOAD FILE
			$fileName = getImageName();
			$fileExtension = $img->getClientExtension();
			$fileSize = $img->getSizeByUnit('b');
			$fileMime = $img->getClientMimeType();
			$filePath = ROOTPATH . "/" . UPLOAD_DIR . "/" . $year . "/" . $month . "/";
			$img->move($filePath, $fileName.".".$fileExtension);

			// INSERT FILE
			$dataInsert = [
				"id" => "",
				"name" => $fileName.".".$fileExtension,
				"thumb" => $fileName."_thumb".".".$fileExtension,
				"date" => $locaTime,
				"size" => $fileSize,
				"type" => $fileMime,
				"location" => $year . "/" . $month,
			];
			$imagesModel->insert($dataInsert);
			$imageID = $imagesModel->insertID();

			// CREATE THUMB
			$image
				->withFile($filePath . $fileName.".".$fileExtension)
				->fit($dim->atd_width, $dim->atd_height)
				->save($filePath . $fileName."_thumb".".".$fileExtension);

			// RESPOND DATA
			$imageData = [
				"id" => $imageID,
				"name" => $dataInsert["name"],
				"thumb" => $dataInsert["thumb"],
				"location" => $dataInsert["location"],
				"date" => $dataInsert["date"],
				"size" => $dataInsert["size"],
			];

			$respondData[] = array_merge($imageData, getImageUrl($imageData));
		}

		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}
}
