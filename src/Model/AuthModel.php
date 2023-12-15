<?php

namespace App\Model;
use App\Model\AbstractDatabase;
use PDO;

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
        if ($user['COUNT(*)'] = 0) {
            return true;
        } else {
            return false;
        }
    }
    public function register(string $email, string $firstname, string $lastname, string $password, string $avatar, string $money): void
    {
        $sql = "INSERT INTO users (email, firstname, lastname, password, avatar, created_at) VALUES (:email, :firstname, :lastname, :password, :avatar, NOW())";
        $req = $this->getBdd()->prepare($sql);
        $password = password_hash($password, PASSWORD_DEFAULT);
        $req->bindParam(':email', $email, PDO::PARAM_STR);
        $req->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $req->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $req->bindParam(':password', $password, PDO::PARAM_STR);
        $req->bindParam(':avatar', $avatar, PDO::PARAM_STR);
        $req->execute();

        $id_users = $this->getBdd()->lastInsertId();
        // Créé un compte pour l'utilisateur
        $sql2 = "INSERT INTO account (total, created_at, users_id) VALUES (:money, NOW(), :users_id)";
        $req = $this->getBdd()->prepare($sql2);
        $req->bindParam(':users_id', $id_users, PDO::PARAM_INT);
        if ($money !== '0') {
            $req->bindParam(':money', $money, PDO::PARAM_STR);
        } else {
            $req->bindValue(':money', '0.00', PDO::PARAM_INT);
        }
        $req->execute();
    }
    public function login(string $email, string $password): array|bool
    {
        $req = $this->getBdd()->prepare('SELECT id_users, email, firstname, lastname, password, avatar FROM users WHERE email = :email');
        $req->bindParam(':email', $email, PDO::PARAM_STR);
        $req->execute();
        $user = $req->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($user[0])) {
            if (password_verify($password, $user[0]['password'])) {
                return $user[0];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    public function getProfil(int $id): array
    {
        $req = $this->getBdd()->prepare('SELECT * FROM users WHERE id_users = :id');
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
        return $req->fetch(PDO::FETCH_ASSOC);
    }
    public function editFirstname(string $firstname, int $id): void
    {
        $req = $this->getBdd()->prepare('UPDATE users SET firstname = :firstname, updated_at = NOW() WHERE id_users = :id');
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $req->execute();
    }
    public function editLastname(string $lastname, int $id): void
    {
        $req = $this->getBdd()->prepare('UPDATE users SET lastname = :lastname, updated_at = NOW() WHERE id_users = :id');
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $req->execute();
    }
    public function editEmail(string $email, int $id): void
    {
        $req = $this->getBdd()->prepare('UPDATE users SET email = :email, updated_at = NOW() WHERE id_users = :id');
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->bindParam(':email', $email, PDO::PARAM_STR);
        $req->execute();
    }
    public function editPassword(string $password, int $id): void
    {
        $req = $this->getBdd()->prepare('UPDATE users SET password = :password, updated_at = NOW() WHERE id_users = :id');
        $password = password_hash($password, PASSWORD_DEFAULT);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->bindParam(':password', $password, PDO::PARAM_STR);
        $req->execute();
    }
}