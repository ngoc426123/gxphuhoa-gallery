<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/activities', 'Activities::index');
$routes->post('/activities/create', 'Activities::create');
