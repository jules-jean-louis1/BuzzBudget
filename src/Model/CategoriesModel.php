<?php

namespace App\Model;

class CategoriesModel extends AbstractDatabase
{

    public function getCategories(int $id): array
    {
        $req = $this->getBdd()->prepare('SELECT * FROM categories WHERE users_id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        $categories = $req->fetchAll();
        return $categories;
    }
}