<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class Directory extends ResourceController {
	public function Count() {
		helper('filesystem');
		$yearMap = directory_map('../upload/');
		$dataRespond = [
			"yearStart" => null,
			"yearEnd" => null,
			"years" => null,
			"months" => null,
		];

		if (!count($yearMap)) {
			$dataRespond = [
				"yearStart" => 0,
				"yearEnd" => 0,
				"years" => 0,
				"months" => 0,
			];
		} else {
			$yearCounter = count($yearMap);
			$monthCounter = 0;
			$yearStart = array_key_first($yearMap);
			$yearEnd = array_key_last($yearMap);

			foreach ($yearMap as $key => $value) {
				$monthMap = directory_map('../upload/' . $key);
				$monthCounter += count($monthMap);
			}

			$dataRespond = [
				"yearStart" => +substr($yearStart, 0, 4),
				"yearEnd" => +substr($yearEnd, 0, 4),
				"years" => $yearCounter,
				"months" => $monthCounter,
			];
		}
		
		return $this->respond($dataRespond, ResponseInterface::HTTP_OK);
	}
}
