<?php

namespace App\Model;

class AbstractDatabase
{
    protected $bdd;

    public function __construct()
    {
        try {
            $this->bdd = new \PDO('mysql:host=localhost;dbname=financeflow;charset=utf8', 'root', '');
            $this->bdd->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            echo $e->getMessage();
            exit;
        }
    }
    public function getBdd()
    {
        return $this->bdd;
    }
}