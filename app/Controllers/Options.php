<?php

namespace App\Controllers;

use App\Models\Options as ModelOptions;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class Options extends ResourceController {
	public function index() {
		$optionsModel = new ModelOptions();
		$method = $this->request->getMethod();

		if ($method == "POST") {
			$data = [];
			$body = $this->request->getBody();
			$param = json_decode($body, true);

			foreach ($param as $key => $value) {
				$optionsData = $optionsModel
					->selectCount("id")
					->where("key", $key)
					->first();
					
				if ($optionsData["id"] > 0) {
					$optionsModel
						->set("value", $value)
						->where("key", $key)
						->update();
				} else {
					echo $key;
					$optionsModel
						->set([
							"id" => "",
							"key" => $key,
							"value" => $value,
							"note" => "",
						])
						->insert();
				}
			}
		}

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
