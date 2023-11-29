<?php

namespace App\Model;
use PDO;
use App\Model\AccountModel;
class TransactionModel extends AbstractDatabase
{

    public function addTransaction(string $name, mixed $amount, string $date, string $type, string $paymentMethod, ?string $description, ?string $recurrent, ?string $categories, ?array $tags, int $id): void
    {
        $accountM = new AccountModel();
        $count = $accountM->getAccount($id);
        $account_id = $count['id_account'];

        $req = $this->getBdd()->prepare('INSERT INTO transaction (name_transaction, amount_transaction, date_of_transaction, type_of_transaction, payment_method, description, recurrent, users_id, created_at, account_id) VALUES (:name, :amount, :date, :type, :paymentMethod, :description, :recurrent, :id, NOW(), :account_id)');
        $req->bindParam(':name', $name, \PDO::PARAM_STR);
        $req->bindParam(':amount', $amount, \PDO::PARAM_STR);
        $req->bindParam(':date', $date, \PDO::PARAM_STR);
        $req->bindParam(':type', $type, \PDO::PARAM_STR);
        $req->bindParam(':paymentMethod', $paymentMethod, \PDO::PARAM_STR);
        $req->bindParam(':description', $description, \PDO::PARAM_STR);
        $req->bindParam(':recurrent', $recurrent, \PDO::PARAM_STR);
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->bindParam(':account_id', $account_id, \PDO::PARAM_INT);
        $req->execute();
        $id_transaction = $this->getBdd()->lastInsertId();
        if ($categories !== null) {
            $req = $this->getBdd()->prepare('INSERT INTO categories_transaction (categories_id, transaction_id) VALUES (:id_categories, :id_transaction)');
            $req->bindParam(':id_categories', $categories, \PDO::PARAM_INT);
            $req->bindParam(':id_transaction', $id_transaction, \PDO::PARAM_INT);
            $req->execute();
        }
        if ($tags !== null) {
            $tagsM = new TagsModel();
            foreach ($tags as $tag) {
                $tagsM->addTagsOfTransaction($tag, $id_transaction);
            }
        }

        if ($type === 'depense') {
            $amount = -$amount;
        }
        // Update account

        $total = $count['total'] + $amount;
        $accountM->updateAccount($id, $total);
    }
    public function getLast5Transaction(int $id): array
    {
        $req = $this->getBdd()->prepare('SELECT * FROM transaction WHERE users_id = :id ORDER BY created_at DESC LIMIT 5');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        return $req->fetchAll(PDO::FETCH_ASSOC);
    }
}