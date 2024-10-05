<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

/*********************/
/* VERY VERY DANGER **/
$routes->get('/clear-everything', 'ClearEverything::index');
/* VERY VERY DANGER **/
/*********************/

$routes->get('/', 'Home::index');
$routes->group('', ['filter' => 'cors'], static function($routes) {
  /*********************/
  /******** ANY ********/
  $routes->options('/(:any)', static function () {
    $response = response();
    $response->setStatusCode(200);
  
    return $response;
  });

  /*********************/
  /**** ACTIVITIES ****/
  $routes->get('/activities', 'Activities::index');
  $routes->post('/activities/create', 'Activities::create');
  /**
   * BODY JSON DATA
   * {
   *    "username": <>,
   *    "email": <>,
   *    "date": <>,
   * }
   */
  
  /*********************/
  /******* IMAGES ******/
  $routes->get('/images/count', 'Images::count');
  /**
   * NO PARAMS
   */
  $routes->get('/images/countintime', 'Images::countInTime');
  /**
   * PARAMS IN URL
   * ?month=<>&year=<>
   */
  $routes->get('/images/countinyear', 'Images::countInYear');
  /**
   * PARAMS IN URL
   * ?year=<>
   */
  $routes->get('/images/capacity', 'Images::capacity');
  $routes->get('/images/countrecent', 'Images::countRecent');
  /**
   * PARAMS IN URL
   * ?numberyearrecent=<>
   */
  $routes->get('/images/list', 'Images::List');
  /**
   * PARAMS IN URL
   * ?start=<>&perpage=<>
   */
  $routes->delete('/images/remove', 'Images::Remove');
  /**
   * BODY JSON DATA
   * [
   *  { object images }
   * ]
   */

  /*********************/
  /****** ALBUMS *******/
  $routes->get('/albums/count', 'Albums::count');
  /**
   * NO PARAMS
   */
  $routes->get('/albums/countintime', 'Albums::countInTime');
  /**
   * PARAMS IN URL
   * ?month=<>&year=<>
   */
  $routes->get('/albums/countinyear', 'Albums::countInYear');
  /**
   * PARAMS IN URL
   * ?year=<>
   */
  $routes->get('/albums/list', 'Albums::List');
  /**
   * PARAMS IN URL
   * ?start=<>&perpage=<>
   */
  $routes->get('/albums/(:num)', 'Albums::Detail/$1');
  /**
   * NO PARAMS
   */
  $routes->post('/albums/create', 'Albums::Create');
  /**
   * BODY JSON DATA
   * {
   *    album_title: <string>
   *    list_images: array<images>
   * }
   */
  $routes->put('/albums/update/(:num)', 'Albums::Update/$1');
  /**
   * BODY JSON DATA
   * {
   *    album_id: <number>
   *    album_title: <string>
   * }
   */
  $routes->delete('/albums/remove/(:num)', 'Albums::Remove/$1');
  /**
   * NO PARAMS
   */
  $routes->put('/albums/append/(:num)', 'Albums::Append/$1');
  /**
   * NO PARAMS
   */
  
  /*********************/
  /****** DIRECTORY ****/
  $routes->get('/directory/count', 'Directory::count');
  /**
   * NO PARAMS
   */
  
  /*********************/
  /****** OPTIONS ******/
  $routes->get('/options', 'Options::Index');
  /**
   * NO PARAMS
   */
  $routes->post('/options', 'Options::Index');
  /**
   * BODY JSON DATA
   * {
   *    [options key]: [options value],
   * }
   */
  
  /*********************/
  /****** UPLOAD ******/
  $routes->post('/upload', 'Upload::Index');
});