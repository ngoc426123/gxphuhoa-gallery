<?php

namespace App\Controllers;

use App\Models\Images as ModelImages;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class Upload extends ResourceController {
	public function index(){
		$image = service("image", "gd");
		$imagesModel = new ModelImages();

		// DATE
		$now    = getdate();
		$second = $now["seconds"];
		$minute = $now["minutes"];
		$hour   = $now["hours"];
		$day    = $now["mday"]; if(strlen($day)==1){$day="0".$day;}
		$month  = $now["mon"]; if(strlen($month)==1){$month="0".$month;}
		$year   = $now["year"];

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
				"date" => $day."/".$month."/".$year,
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
				"name" => $fileName.".".$fileExtension,
				"thumb" => $fileName."_thumb".".".$fileExtension,
				"location" => $year."/".$month,
				"date" => $day."/".$month."/".$year,
				"size" => $fileSize,
			];

			$respondData[] = array_merge($imageData, getImageUrl($imageData));
		}

		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}
}
