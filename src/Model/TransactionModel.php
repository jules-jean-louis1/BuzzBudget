<?php

namespace App\Model;
use PDO;
use App\Model\AccountModel;
class TransactionModel extends AbstractDatabase
{

    public function addTransaction(string $name, mixed $amount, string $date, string $type, string $paymentMethod, ?string $description, ?string $recurrent, ?string $categories, ?string $tags, int $id)
    {

        if ($type === 'depense') {
            $amount = -$amount;
        }
        $req = $this->getBdd()->prepare('INSERT INTO transaction (name_transaction, amount, date_transaction, type_transaction, payment_method, description, recurrent, users_id, created_at) VALUES (:name, :amount, :date, :type, :paymentMethod, :description, :recurrent, :id, NOW())');
        $req->bindParam(':name', $name, \PDO::PARAM_STR);
        $req->bindParam(':amount', $amount, \PDO::PARAM_STR);
        $req->bindParam(':date', $date, \PDO::PARAM_STR);
        $req->bindParam(':type', $type, \PDO::PARAM_STR);
        $req->bindParam(':paymentMethod', $paymentMethod, \PDO::PARAM_STR);
        $req->bindParam(':description', $description, \PDO::PARAM_STR);
        $req->bindParam(':recurrent', $recurrent, \PDO::PARAM_STR);
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        $id_transaction = $this->getBdd()->lastInsertId();
        if ($categories != null) {
            $req = $this->getBdd()->prepare('INSERT INTO categories_transaction (categories_id, transaction_id) VALUES (:id_categories, :id_transaction)');
            $req->bindParam(':id_categories', $categories, \PDO::PARAM_INT);
            $req->bindParam(':id_transaction', $id_transaction, \PDO::PARAM_INT);
            $req->execute();
        }
        if ($tags != null) {
            $req = $this->getBdd()->prepare('INSERT INTO tags_transaction (tags_id, transaction_id) VALUES (:id_tags, :id_transaction)');
            $req->bindParam(':id_tags', $tags, \PDO::PARAM_INT);
            $req->bindParam(':id_transaction', $id_transaction, \PDO::PARAM_INT);
            $req->execute();
        }
        // Update account
        $accountM = new AccountModel();
        $account = $accountM->getAccount($id);
        $total = $account['total'] + $amount;
        $accountM->updateAccount($id, $total);
    }
}