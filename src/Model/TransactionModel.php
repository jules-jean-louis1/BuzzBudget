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
    public function getHistory(string $search, string $categories, string $tags, string $date, string $paymentMethod, string $order, int $id): array
    {
        $sql = 'SELECT * FROM transaction WHERE users_id = :id';
        $bdd = $this->getBdd();

        var_dump($search, $categories, $tags, $date, $paymentMethod, $order);
        if ($search !== '') {
            $sql .= ' AND name_transaction LIKE :search';
        }
        if ($categories !== 'all') {
            $sql .= ' AND id_transaction IN (SELECT transaction_id FROM categories_transaction WHERE id_categories_transaction = :categories)';
        }
        if ($tags !== 'all') {
            $sql .= ' AND id_transaction IN (SELECT transaction_id FROM tags_transaction WHERE id_tags_transaction = :tags)';
        }
        if ($date !== '') {
            $sql .= ' AND date_of_transaction = :date';
        }
        if ($paymentMethod !== 'n/a') {
            $sql .= ' AND payment_method = :paymentMethod';
        }
        if ($order === 'DESC') {
            $sql .= ' ORDER BY date_of_transaction ' . 'DESC';
        }elseif ($order === 'ASC') {
            $sql .= ' ORDER BY date_of_transaction ' . 'ASC';
        }
        var_dump($sql);
        $req = $bdd->prepare($sql);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        if ($search !== '') {
            $search = '%' . $search . '%';
            $req->bindParam(':search', $search, PDO::PARAM_STR);
        }
        if ($categories !== 'all') {
            $req->bindParam(':categories', $categories, PDO::PARAM_INT);
        }
        if ($tags !== 'all') {
            $req->bindParam(':tags', $tags, PDO::PARAM_INT);
        }
        if ($date !== '') {
            $req->bindParam(':date', $date, PDO::PARAM_STR);
        }
        if ($paymentMethod !== 'n/a') {
            $req->bindParam(':paymentMethod', $paymentMethod, PDO::PARAM_STR);
        }
        $req->execute();
        return $req->fetchAll(PDO::FETCH_ASSOC);
    }

}