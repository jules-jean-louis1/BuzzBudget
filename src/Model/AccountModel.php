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
        $req = $this->getBdd()->prepare('SELECT id_account, total, created_at, update_at, users_id FROM account WHERE users_id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        $account = $req->fetchAll(\PDO::FETCH_ASSOC);
        return $account[0];

    }
    public function updateAccount(int $id, string $total): void
    {
        $req = $this->getBdd()->prepare('UPDATE account SET total = :total, update_at = NOW() WHERE users_id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->bindParam(':total', $total, \PDO::PARAM_STR);
        $req->execute();
    }
}