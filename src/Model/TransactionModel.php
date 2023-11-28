<?php

namespace App\Model;
use PDO;
class TransactionModel extends AbstractDatabase
{

    public function addTransaction(string $name, mixed $amount, string $date, string $type, string $paymentMethod, string $description, string $recurrent, string $categories, string $tags, int $id)
    {
    }
}