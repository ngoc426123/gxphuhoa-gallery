<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

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

/*********************/
/****** ALBUMS *******/
$routes->get('/albums/count', 'Albums::count');
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

/*********************/
/****** DIRECTORY ****/
$routes->get('/directory/count', 'Directory::count');

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