<?php

namespace App\Controller;
use App\Model\CategoriesModel;
class CategoriesController
{
    public function getCategories(): void
    {
        $categories = new CategoriesModel();
        $id = $_SESSION['user']['id_users'];
        echo $id;
        //$categories = $categories->getCategories($id);
    }
}