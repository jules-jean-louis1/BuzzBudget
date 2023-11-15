<?php

namespace App\Model;
use App\Model\AbstractDatabase;
class AuthModel extends AbstractDatabase
{
    public function __construct()
    {
        parent::__construct();
    }
    public function checkEmail(string $email):bool
    {
        $req = $this->getBdd()->prepare('SELECT COUNT(*) FROM users WHERE email = :email');
        $req->bindParam(':email', $email, \PDO::PARAM_STR);
        $req->execute();
        $user = $req->fetch();
        if ($user['COUNT(*)'] > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function register(string $email, string $firstname, string $lastname, string $password, mixed $avatar): void
    {
        $sql = "INSERT INTO users (email, firstname, lastname, password, avatar, created_at) VALUES (:email, :firstname, :lastname, :password, :avatar, NOW())";
        $req = $this->getBdd()->prepare($sql);
        $password = password_hash($password, PASSWORD_DEFAULT);
        $req->bindParam(':email', $email, \PDO::PARAM_STR);
        $req->bindParam(':firstname', $firstname, \PDO::PARAM_STR);
        $req->bindParam(':lastname', $lastname, \PDO::PARAM_STR);
        $req->bindParam(':password', $password, \PDO::PARAM_STR);
        $req->bindParam(':avatar', $avatar, \PDO::PARAM_STR);
        $req->execute();

        $id_users = $this->getBdd()->lastInsertId();
        // Créé un compte pour l'utilisateur
        $sql2 = "INSERT INTO account (users_id) VALUES (:users_id)";
        $req2 = $this->getBdd()->prepare($sql2);
        $req2->bindParam(':users_id', $id_users, \PDO::PARAM_INT);
        $req2->execute();
    }
}