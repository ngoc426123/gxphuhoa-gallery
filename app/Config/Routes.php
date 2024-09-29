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
 * PARAM IN URL
 * ?month=<>&year=<>
 */
$routes->get('/images/countinyear', 'Images::countInYear');
/**
 * PARAM IN URL
 * ?year=<>
 */
$routes->get('/images/capacity', 'Images::capacity');
$routes->get('/images/countrecent', 'Images::countRecent');
/**
 * PARAM IN URL
 * ?numberyearrecent=<>
 */

/*********************/
/****** ALBUMS *******/
$routes->get('/albums/count', 'Albums::count');
$routes->get('/albums/countintime', 'Albums::countInTime');
/**
 * PARAM IN URL
 * ?month=<>&year=<>
 */
$routes->get('/albums/countinyear', 'Albums::countInYear');
/**
 * PARAM IN URL
 * ?year=<>
 */

/*********************/
/****** DIRECTORY ****/
$routes->get('/directory/count', 'Directory::count');
