<?php

namespace App\Controller;
use App\Model\CategoriesModel;
class CategoriesController
{
    public function getCategories(): void
    {
        $categories = new CategoriesModel();
    }
}