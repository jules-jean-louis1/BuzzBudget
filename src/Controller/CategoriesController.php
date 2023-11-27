<?php

namespace App\Controller;
use App\Model\CategoriesModel;
class CategoriesController
{
    public function getCategories(): void
    {
        $categories = new CategoriesModel();
        $user = $_SESSION['user'];
        $id = $user->getId();
        $categories = $categories->getCategories($id);
        echo json_encode($categories);
    }
    public function add(): void
    {
        $_SESSION['user']['id_users'] = 1;
    }
}