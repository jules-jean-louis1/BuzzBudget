<?php

namespace App\Controller;
use App\Model\CategoriesModel;
class CategoriesController
{
    public function getCategories(): void
    {
        $categories = new CategoriesModel();
        $id = $_SESSION['user']['id_users'];
        var_dump($_SESSION);
        $categories = $categories->getCategories($id);
        //echo json_encode($categories);
    }
}