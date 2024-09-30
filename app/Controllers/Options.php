<?php

namespace App\Controllers;

use App\Models\Options as ModelOptions;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class Options extends ResourceController {
	public function index() {
		$method = $this->request->getMethod();

		if ($method == "POST") {
			return $this->respond(["method" => $method], ResponseInterface::HTTP_OK);
		}

		$optionsModel = new ModelOptions();
		$options = [];
		$optionsData = $optionsModel
			->findAll();
		
		foreach ($optionsData as $key => $value) {
			$options[$value["key"]] = $value["value"];
		}

		$dataRespond = $options;

		return $this->respond($dataRespond, ResponseInterface::HTTP_OK);
	}
}
