<?php

namespace App\Model;
use App\Model\AbstractDatabase;
class AuthModel extends AbstractDatabase
{
    public function __construct()
    {
        parent::__construct();
    }
    public function verifyUser(string $email): bool
    {
        $req = $this->getBdd()->prepare('SELECT id_users FROM users WHERE email = :email');
        $req->bindValue(':email', $email, \PDO::PARAM_STR);
        $req->execute();
        $user = $req->fetch();
        if ($user) {
            return true;
        } else {
            return false;
        }
    }
    public function register()
    {

    }
}