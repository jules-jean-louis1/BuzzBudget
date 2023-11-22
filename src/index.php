<?php
use App\Controller\AuthController;
require_once '../vendor/autoload.php';


// CORS headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$router = new AltoRouter();
/*Controllers*/
$authUser = new AuthController();

$router->setBasePath('/buzzbudget/src');

// map homepage
$router->map('GET', '/', function () {
    echo 'This is the homepage buzz-budget';
});
/*
 * Auth routes
 */
$router->map('POST', '/auth/register/checkEmail', function() use ($authUser) {
    $authUser->checkEmail();
});
$router->map('POST', '/auth/register', function() use ($authUser) {
    $authUser->register();
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
