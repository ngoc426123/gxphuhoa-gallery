<?php

namespace App\Controllers;

use App\Models\Images as ModelImages;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class Upload extends ResourceController {
	public function index(){
		$imagesModel = new ModelImages();

		// UPLOAD DIR
		$uploadDir = "upload";

		// DATE
		$now    = getdate();
		$second = $now["seconds"];
		$minute = $now["minutes"];
		$hour   = $now["hours"];
		$day    = $now["mday"]; if(strlen($day)==1){$day="0".$day;}
		$month  = $now["mon"]; if(strlen($month)==1){$month="0".$month;}
		$year   = $now["year"];

		// DATA RESPONSE
		$dataRespond = [];

		// FILES
		$files = $this->request->getFiles();

		foreach ($files as $img) {
			// UPLOAD FILE
			$fileName = getImageName();
			$fileExtension = $img->getClientExtension();
			$fileSize = $img->getSizeByUnit('b');
			$fileMime = $img->getClientMimeType();
			$filePath = ROOTPATH . "/" . $uploadDir . "/" . $year . "/" . $month . "/";
			$img->move($filePath, $fileName.".".$fileExtension);

			// INSERT FILE
			$dataInsert = [
				"id" => "",
				"name" => $fileName.".".$fileExtension,
				"thumb" => $fileName."_thumb".".".$fileExtension,
				"date" => $day."/".$month."/".$year,
				"size" => $fileSize,
				"type" => $fileMime,
				"location" => $year . "/" . $month,
			];
			$imagesModel->insert($dataInsert);
			$imageID = $imagesModel->insertID();

			// RESPOND DATA
			$dataRespond[] = [
				"id" => $imageID,
				"location" => $year . "/" . $month,
				"thumb" => $fileName."_thumb".".".$fileExtension,
			];
		}

		return $this->respond($dataRespond, ResponseInterface::HTTP_OK);
	}
}
