<?php
require_once '../vendor/autoload.php';

// CORS headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$router = new AltoRouter();


$router->setBasePath('/buzzbudget/api');

// map homepage
$router->map('GET', '/', function () {
    echo 'This is the homepage buzzbudget';
});
$router->map('GET','/users', function () {
    echo 'This is the users page';
});
$router->map('GET','/test', function () {
    echo 'This is the test page';
});


// match current request url
$match = $router->match();

// call closure or throw 404 status
if( $match && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] ); 
} else {
    // no route was matched
    header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}
