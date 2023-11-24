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
        $req = $this->getBdd()->prepare('SELECT * FROM account WHERE users_id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        $account = $req->fetch();
        return $account;
    }
}