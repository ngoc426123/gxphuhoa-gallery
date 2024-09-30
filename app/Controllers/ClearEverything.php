<?php

namespace App\Controllers;

use App\Models\Images as ModelImages;
use App\Models\Albums as ModelAlbums;
use App\Models\Relationships as ModelRelationships;
use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class ClearEverything extends BaseController {
	public function index() {
		$imagesModel = new ModelImages();
		$imagesModel->emptyTable();
		$albumsModel = new ModelAlbums();
		$albumsModel->emptyTable();
		$relationshipsModel = new ModelRelationships();
		$relationshipsModel->emptyTable();
	}
}
