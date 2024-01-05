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
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
        return $req->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getHistory(string $search, string $categories, string $tags, string $date, string $paymentMethod, string $order, int $id): array
    {
        $sql = 'SELECT * FROM transaction WHERE users_id = :id';
        $bdd = $this->getBdd();
        //var_dump($search, $categories, $tags, $date, $paymentMethod, $order);
        if ($search !== '') {
            $sql .= ' AND name_transaction LIKE :search';
        }
        if ($categories !== 'all' && $categories !== '') {
            $sql .= ' AND id_transaction IN (SELECT transaction_id FROM categories_transaction WHERE id_categories_transaction = :categories)';
        }
        if ($tags !== 'all' && $tags !== '') {
            $sql .= ' AND id_transaction IN (SELECT transaction_id FROM tags_transaction WHERE id_tags_transaction = :tags)';
        }
        if ($date !== '') {
            $sql .= ' AND date_of_transaction = :date';
        }
        if ($paymentMethod !== 'n/a' && $paymentMethod !== '') {
            $sql .= ' AND payment_method = :paymentMethod';
        }
        if ($order === 'DESC') {
            $sql .= ' ORDER BY date_of_transaction ' . 'DESC';
        }elseif ($order === 'ASC') {
            $sql .= ' ORDER BY date_of_transaction ' . 'ASC';
        }
        //var_dump($sql);
        $req = $bdd->prepare($sql);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        if ($search !== '') {
            $search = '%' . $search . '%';
            $req->bindParam(':search', $search, PDO::PARAM_STR);
        }
        if ($categories !== 'all' && $categories !== '') {
            $req->bindParam(':categories', $categories, PDO::PARAM_INT);
        }
        if ($tags !== 'all' && $tags !== '') {
            $req->bindParam(':tags', $tags, PDO::PARAM_INT);
        }
        if ($date !== '') {
            $req->bindParam(':date', $date, PDO::PARAM_STR);
        }
        if ($paymentMethod !== 'n/a' && $paymentMethod !== '') {
            $req->bindParam(':paymentMethod', $paymentMethod, PDO::PARAM_STR);
        }
        $req->execute();
        return $req->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteTransaction(int $id, int $id_users): bool
    {
        $sql_Tags = 'DELETE FROM tags_transaction WHERE transaction_id = :id';
        $sql_Categories = 'DELETE FROM categories_transaction WHERE transaction_id = :id';
        $sql_Transaction = 'DELETE FROM transaction WHERE id_transaction = :id AND users_id = :id_users';

        $bdd = $this->getBdd();
        $bdd->beginTransaction();
        $req = $bdd->prepare($sql_Tags);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
        $req = $bdd->prepare($sql_Categories);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
        $req = $bdd->prepare($sql_Transaction);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->bindParam(':id_users', $id_users, PDO::PARAM_INT);
        return $req->execute();
    }
    public function getOneTransaction(int $id_transaction, int $id_users): array
    {
        $sql = 'SELECT * FROM transaction WHERE id_transaction = :id_transaction AND users_id = :id_users';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->bindParam(':id_users', $id_users, PDO::PARAM_INT);
        $req->execute();
        return $req->fetch(PDO::FETCH_ASSOC);
    }
    public function getTagsOfTransaction(int $id_transaction): array
    {
        $sql = 'SELECT id_tags, name_tags FROM tags WHERE id_tags IN (SELECT id_tags_transaction FROM tags_transaction WHERE transaction_id = :id_transaction)';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
        return $req->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getCategoriesOfTransaction(int $id_transaction): array
    {
        $sql = 'SELECT id_categories, name_categories FROM categories WHERE id_categories IN (SELECT id_categories_transaction FROM categories_transaction WHERE transaction_id = :id_transaction)';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
        return $req->fetchAll(PDO::FETCH_ASSOC);
    }

    /* update transaction function */
    public function updateName(int $id_transaction, string $name): void
    {
        $sql = 'UPDATE transaction SET name_transaction = :name WHERE id_transaction = :id_transaction';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':name', $name, PDO::PARAM_STR);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
    }
    public function updateDescription(int $id_transaction, string $description): void
    {
        $sql = 'UPDATE transaction SET description = :description WHERE id_transaction = :id_transaction';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':description', $description, PDO::PARAM_STR);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
    }
    public function updateAmount(int $id_transaction, mixed $amount): void
    {
        $sql = 'UPDATE transaction SET amount_transaction = :amount WHERE id_transaction = :id_transaction';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':amount', $amount, PDO::PARAM_STR);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
    }
    public function updateDate(int $id_transaction, string $date): void
    {
        $sql = 'UPDATE transaction SET date_of_transaction = :date WHERE id_transaction = :id_transaction';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':date', $date, PDO::PARAM_STR);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
    }
    public function updateType(int $id_transaction, string $type): void
    {
        $sql = 'UPDATE transaction SET type_of_transaction = :type WHERE id_transaction = :id_transaction';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':type', $type, PDO::PARAM_STR);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
    }
    public function updatePaymentMethod(int $id_transaction, string $paymentMethod): void
    {
        $sql = 'UPDATE transaction SET payment_method = :paymentMethod WHERE id_transaction = :id_transaction';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':paymentMethod', $paymentMethod, PDO::PARAM_STR);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
    }
    public function deleteTagsOfTransaction(int $id_transaction): void
    {
        $sql = 'DELETE FROM tags_transaction WHERE transaction_id = :id_transaction';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
    }
    public function addTagToTransaction(int $id_transaction, int $id_tags): void
    {
        $sql = 'INSERT INTO tags_transaction (tags_id, transaction_id) VALUES (:id_tags, :id_transaction)';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':id_tags', $id_tags, PDO::PARAM_INT);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
    }
    public function deleteCategoriesOfTransaction(int $id_transaction): void
    {
        $sql = 'DELETE FROM categories_transaction WHERE transaction_id = :id_transaction';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
    }
    public function addCategoriesToTransaction(int $id_transaction, int $id_categories): void
    {
        $sql = 'INSERT INTO categories_transaction (categories_id, transaction_id) VALUES (:id_categories, :id_transaction)';
        $bdd = $this->getBdd();
        $req = $bdd->prepare($sql);
        $req->bindParam(':id_categories', $id_categories, PDO::PARAM_INT);
        $req->bindParam(':id_transaction', $id_transaction, PDO::PARAM_INT);
        $req->execute();
    }
}