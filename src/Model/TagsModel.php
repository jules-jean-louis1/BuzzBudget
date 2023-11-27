<?php

namespace App\Model;
use PDO;
class TagsModel extends AbstractDatabase
{

    public function getTags(int $id): array
    {
        $req = $this->getBdd()->prepare('SELECT * FROM tags WHERE users_id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        return $req->fetchAll(PDO::FETCH_ASSOC);
    }
    public function addTags(string $tags, int $id): void
    {
        $req = $this->getBdd()->prepare('INSERT INTO tags (name_tags, users_id, created_at) VALUES (:name, :id, NOW())');
        $req->bindParam(':name', $tags, \PDO::PARAM_STR);
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
    }
    public function deleteTags(int $id): void
    {
        $req = $this->getBdd()->prepare('DELETE FROM tags WHERE id_tags = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
    }
    public function updateTags(int $id, string $name): void
    {
        $req = $this->getBdd()->prepare('UPDATE tags SET name_tags = :name, update_at = NOW() WHERE id_tags = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->bindParam(':name', $name, \PDO::PARAM_STR);
        $req->execute();
    }
    public function deleteTagsOfTransaction(int $id_tags, int $id_transaction): void
    {
        $req = $this->getBdd()->prepare('DELETE FROM tags_transaction WHERE tags_id = :id_tags AND transaction_id = :id_transaction;');
        $req->bindParam(':id', $id_tags, \PDO::PARAM_INT);
        $req->bindParam(':id_transaction', $id_transaction, \PDO::PARAM_INT);
        $req->execute();
    }
    public function addTagsOfTransaction(int $id_tags, int $id_transaction): void
    {
        $req = $this->getBdd()->prepare('INSERT INTO tags_transaction (tags_id, transaction_id) VALUES (:id_tags, :id_transaction)');
        $req->bindParam(':id_tags', $id_tags, \PDO::PARAM_INT);
        $req->bindParam(':id_transaction', $id_transaction, \PDO::PARAM_INT);
        $req->execute();
    }
}