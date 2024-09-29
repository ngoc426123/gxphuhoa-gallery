<?php

namespace App\Controllers;

use App\Models\Activities as ModelsActivities;
use App\Models\ActivitiesModel;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;

class Activities extends ResourceController {
	/**
	 * Return an array of resource objects, themselves in array format.
	 *
	 * @return ResponseInterface
	 */
	public function index() {
		$ActivitiesModel = new ModelsActivities();
		$activitiesData = $ActivitiesModel
			->orderBy('id', 'DESC')
			->limit(6, 0)
			->findAll();

		return $this->respond($activitiesData, ResponseInterface::HTTP_ACCEPTED);
	}

	/**
	 * Create a new resource object, from "posted" parameters.
	 *
	 * @return ResponseInterface
	 */
	public function create() {
		$ActivitiesModel = new ModelsActivities();
		$body = $this->request->getBody();
		$param = json_decode($body);
		$username = $param->user_login;
		$email = $param->user_email;
		$date = get_current_time();
		$data = [
			"username" => $username,
			"email" => $email,
			"date" => $date,
		];
		
		$ActivitiesModel
			->upsert($data);

		return $this->respond($data, ResponseInterface::HTTP_ACCEPTED);
	}

	/**
	 * Delete the designated resource object from the model.
	 *
	 * @param int|string|null $id
	 *
	 * @return ResponseInterface
	 */
	public function delete($id = null) {
		//
	}
}
