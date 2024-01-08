<?php
session_set_cookie_params([
    'samesite' => 'None',
    'secure' => true,
]);

use App\Controller\{
    AuthController,
    AccountController,
    CategoriesController,
    TagsController,
    TransactionController
};
require_once '../vendor/autoload.php';

session_start();
// Configurer les paramètres de session




// CORS headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$router = new AltoRouter();
/*Controllers*/
$authUser = new AuthController();
$account = new AccountController();
$categories = new CategoriesController();
$tags = new TagsController();
$transaction = new TransactionController();

$router->setBasePath('/buzzbudget/src');

// map homepage
$router->map('GET', '/', function () {
    var_dump($_SESSION);
    ?>
    <h1>Home page</h1>
    <a href="/buzzbudget/src/auth/logout">Logout</a>
    <?php
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
$router->map('POST', '/auth/login', function() use ($authUser) {
    $authUser->login();
});
$router->map('GET', '/get', function() {
    var_dump($_SESSION);
});

$router->map('GET', '/auth/logout', function() use ($authUser) {
    $authUser->logout();
});

/* ############################# 
        Profil routes
############################# */
$router->map('GET', '/profil/get', function() use ($authUser) {
    $authUser->getProfil();    
});
$router->map('POST', '/profil/edit/[i:id]', function($id) use ($authUser) {
    $authUser->editProfil($id);
});
/* ############################# 
        Account routes
############################# */
$router->map('GET', '/account/display/[i:id]', function($id) use ($account) {
    $account->displayHome($id);
});
/* #############################
        Transaction routes
############################# */

$router->map('POST', '/transaction/add', function() use ($transaction) {
    $transaction->add();
});
$router->map('POST', '/transaction/delete/[i:id]', function($id) use ($transaction) {
    $transaction->delete($id);
});
$router->map('GET', '/transaction/getOne/[i:id]', function($id) use ($transaction) {
    $transaction->getOne($id);
});
$router->map('POST', '/transaction/update/[i:id]', function($id) use ($transaction) {
    $transaction->update($id);
});
/* ############################# 
        Categories routes
############################# */
$router->map('GET', '/categories/get/', function() use ($categories) {
    $categories->getCategories();
});
$router->map('POST', '/categories/add', function() use ($categories) {
    $categories->add();
});
$router->map('POST', '/categories/delete/[i:id]', function($id) use ($categories) {
    $categories->delete($id);
});
$router->map('POST', '/categories/edit/[i:id]', function($id) use ($categories) {
    $categories->edit($id);
});

/* #############################
        Tags routes
############################# */

$router->map('GET', '/tags/get/', function() use ($tags) {
    $tags->getTags();
});
$router->map('POST', '/tags/add', function() use ($tags) {
    $tags->add();
});
$router->map('POST', '/tags/delete/[i:id]', function($id) use ($tags) {
    $tags->delete($id);
});
$router->map('POST', '/tags/edit/[i:id]', function($id) use ($tags) {
    $tags->edit($id);
});
/* ############################# 
        History routes
############################# */

$router->map('POST', '/history/get/filter/[i:id]', function($id) use ($transaction) {
    $transaction->getHistory($id);
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
