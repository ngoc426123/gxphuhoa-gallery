<?php

namespace App\Controllers;

use App\Models\Activities as ModelsActivities;
use App\Models\ActivitiesModel;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\I18n\Time;

class Activities extends ResourceController {
	public function Index() {
		$ActivitiesModel = new ModelsActivities();
		$activitiesData = $ActivitiesModel
			->orderBy('id', 'DESC')
			->limit(6, 0)
			->findAll();

		return $this->respond($activitiesData, ResponseInterface::HTTP_ACCEPTED);
	}

	public function Create() {
		$ActivitiesModel = new ModelsActivities();
		$body = $this->request->getBody();
		$param = json_decode($body);
		$username = $param->user_login;
		$email = $param->user_email;
		$myTime = Time::now("Asia/Ho_Chi_Minh");
		$date = $myTime->toLocalizedString();
		$data = [
			"username" => $username,
			"email" => $email,
			"date" => $date,
		];
		
		$ActivitiesModel
			->upsert($data);

		return $this->respond($data, ResponseInterface::HTTP_ACCEPTED);
	}
}
