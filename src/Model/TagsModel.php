<?php

namespace App\Model;

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
}