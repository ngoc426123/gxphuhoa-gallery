<?php

namespace App\Controllers;

use App\Models\Images as ModelImages;
use App\Models\Albums as ModelAlbums;
use App\Models\Relationships as ModelRelationships;
use App\Models\Activities as ModelActivities;
use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\I18n\Time;

class QueryThings extends BaseController {
	public function ClearEverything() {
		$imagesModel = new ModelImages();
		$imagesModel->emptyTable();
		$albumsModel = new ModelAlbums();
		$albumsModel->emptyTable();
		$relationshipsModel = new ModelRelationships();
		$relationshipsModel->emptyTable();
		$activitiesModel = new ModelActivities();
		$activitiesModel->emptyTable();
	}

	public function FormatDate() {
		$field_name = "date";
		$format_field_name = "date_format";
		$forge = \Config\Database::forge();
		$imagesModel = new ModelImages();
		$albumsModel = new ModelAlbums();

		// ADD date_format FIELD TO TABLE
		$fields[$format_field_name] = ['type' => 'DATETIME'];
		$forge->addColumn('images', $fields);
		$forge->addColumn('albums', $fields);

		// GET ALL DATE OF TABLE
		$imagesData = $imagesModel
			->findAll();
		$albumsData = $albumsModel
			->findAll();

		// GET DATE -> FORMAT DATE TO datetime, AND ADD TO date_format FIELD
		foreach ($imagesData as $value) {
			$date = $value["date"];
			$time = Time::createFromFormat('d/m/Y', $date, "Asia/Ho_Chi_Minh");
			$localTime = $time->toLocalizedString();
			
			$imagesModel
				->set($format_field_name, $localTime)
				->where(["id" => $value["id"]])
				->update();
		}

		foreach ($albumsData as $value) {
			$date = $value["date"];
			$time = Time::createFromFormat('d/m/Y', $date, "Asia/Ho_Chi_Minh");
			
			$albumsModel
				->set($format_field_name, $time->toLocalizedString())
				->where(["id" => $value["id"]])
				->update();
		}

		// MODIFY date FIELD TO datetime FORMAT
		$fields[$field_name] = ['type' => 'DATETIME'];
		$forge->modifyColumn('images', $fields);
		$forge->modifyColumn('albums', $fields);

		// COPY date_format FIELD to date FIELD
		$imagesData = $imagesModel
			->findAll();
		$albumsData = $albumsModel
			->findAll();

		foreach ($imagesData as $value) {
			$date_format = $value[$format_field_name];
			
			$imagesModel
				->set($field_name, $date_format)
				->where(["id" => $value["id"]])
				->update();
		}

		foreach ($albumsData as $value) {
			$date_format = $value[$format_field_name];
			
			$albumsModel
				->set($field_name, $date_format)
				->where(["id" => $value["id"]])
				->update();
		}

		// REMOVE date_format FROM TABLE
		$forge->dropColumn('albums', $format_field_name);
		$forge->dropColumn('images', $format_field_name);
	}
}
