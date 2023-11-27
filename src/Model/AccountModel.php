<?php

namespace App\Model;

use App\Model\AbstractDatabase;

class AccountModel extends AbstractDatabase
{
    public function __construct()
    {
        parent::__construct();
    }
    public function getAccount(int $id): array
    {
        $req = $this->getBdd()->prepare('SELECT total, created_at, update_at, users_id FROM account WHERE users_id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        return $req->fetch();
    }
    public function updateAccount(int $id, string $total): void
    {
        $req = $this->getBdd()->prepare('UPDATE account SET total = :total, update_at = NOW() WHERE users_id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->bindParam(':total', $total, \PDO::PARAM_STR);
        $req->execute();
    }
}