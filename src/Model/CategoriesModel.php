<?php

namespace App\Model;

use PDO;

class CategoriesModel extends AbstractDatabase
{

    public function getCategories(int $id): array
    {
        $req = $this->getBdd()->prepare('SELECT * FROM categories WHERE users_id = :id');
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
        $categories = $req->fetchAll(PDO::FETCH_ASSOC);
        return $categories;
    }
    public function addCategories(string $categories, int $id): void
    {
        $req = $this->getBdd()->prepare('INSERT INTO categories (name_categories, users_id, created_at) VALUES (:name, :id, NOW())');
        $req->bindParam(':name', $categories, PDO::PARAM_STR);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
    }
    public function deleteCategories(int $id): bool
    {
        $req = $this->getBdd()->prepare('DELETE FROM categories WHERE id_categories = :id');
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        return $req->execute();
    }
    public function deleteCategoriesOfUser(int $id_categories): bool
    {
        $req = $this->getBdd()->prepare('DELETE FROM categories_transaction WHERE categories_id = :id_categories');
        $req->bindParam(':id_categories', $id_categories, PDO::PARAM_INT);
        return $req->execute();
    }
}