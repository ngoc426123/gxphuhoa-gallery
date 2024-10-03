<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class Directory extends ResourceController {
	public function Count() {
		helper('filesystem');
		$yearMap = directory_map('../upload/');
		$respondData = [
			"yearStart" => null,
			"yearEnd" => null,
			"years" => null,
			"months" => null,
		];

		if (!count($yearMap)) {
			$respondData = [
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

			$respondData = [
				"yearStart" => +substr($yearStart, 0, 4),
				"yearEnd" => +substr($yearEnd, 0, 4),
				"years" => $yearCounter,
				"months" => $monthCounter,
			];
		}
		
		return $this->respond($respondData, ResponseInterface::HTTP_OK);
	}
}
