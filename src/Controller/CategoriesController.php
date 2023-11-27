<?php

namespace App\Controller;
use App\Model\CategoriesModel;
class CategoriesController extends AbstractClasses\AbstractContoller
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
        $input_categories = $this->verifyField('categories');
        $user = $_SESSION['user'];
        $id = $user->getId();
        $categories = new CategoriesModel();

        $errors = [];

        if (!$input_categories) {
            $errors['categories'] = 'Entrer le nom de la catégorie';
        } elseif (strlen($input_categories) < 2 || strlen($input_categories) > 50) {
            $errors['categories'] = 'Le nom de la catégorie doit contenir entre 2 et 50 caractères';
        }

        if (empty($errors)) {
            $categories->addCategories($input_categories, $id);
            $errors['success'] = 'La catégorie a bien été ajoutée';
            echo json_encode($errors);
        } else {
            echo json_encode($errors);
        }
    }
}