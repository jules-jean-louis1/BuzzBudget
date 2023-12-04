<?php

namespace App\Controller;
use App\Model\TransactionModel;
class TransactionController extends AbstractClasses\AbstractContoller
{
    public function add(): void
    {
        $name = $this->verifyField('name');
        $amount = $this->verifyField('amount');
        $date = $this->verifyField('date');
        $type = $this->verifyField('type');
        $paymentMethod = $this->verifyField('paymentMethod');
        $description = $this->verifyField('description');
        $recurrent = $this->verifyField('recurrent');
        $categories = $this->verifyField('categories');


        $errors = [];

        if (!$name) {
            $errors['name'] = 'Entrer le nom';
        } elseif (strlen($name) < 2 || strlen($name) > 50) {
            $errors['name'] = 'Le nom de la transaction doit contenir entre 2 et 50 caractères';
        }
        if (!$amount) {
            $errors['amount'] = 'Entrer le montant';
        } elseif (!is_numeric($amount)) {
            $errors['amount'] = 'Le montant doit être un nombre';
        }
        if (!$date) {
            $errors['date'] = 'Entrer la date';
        } elseif (!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/', $date)) {
            $errors['date'] = 'La date doit être au format YYYY-MM-DD';
        }
        if ($type !== 'depense' && $type !== 'revenu') {
            $errors['type'] = 'Le type de transaction doit être soit une dépense soit un revenu';
        } elseif ($type === 'depense') {
            if($paymentMethod !== 'espece' && $paymentMethod !== 'carte' && $paymentMethod !== 'cheque' && $paymentMethod !== 'virement' && $paymentMethod !== 'n/a') {
                $errors['paymentMethod'] = 'Le mode de paiement doit être soit espèce, carte, chèque ou virement';
            }
        } else {
            $paymentMethod = null;
        }
        if (isset($_POST['description'])) {
            if (!$description) {
                $errors['description'] = 'Entrer la description';
            } elseif (strlen($description) < 2 || strlen($description) > 255) {
                $errors['description'] = 'La description doit contenir entre 2 et 255 caractères';
            }
        } else {
            $description = null;
        }
        if(isset($_POST['recurrent'])) {
            if ($recurrent !== 'day' && $recurrent !== 'week' && $recurrent !== 'month' && $recurrent !== 'year') {
                $errors['recurrent'] = 'La transaction doit être soit récurrente soit non récurrente';
            }
        } else {
            $recurrent = null;
        }
        if (!isset($_POST['categories'])) {
            $categories = null;
        }
        $tags = !isset($_POST['tags']) ? null : $_POST['tags'];

        if (empty($errors)) {
            $transaction = new TransactionModel();
            $user = $_SESSION['user'];
            $id = $user->getId();
            $transaction->addTransaction($name, $amount, $date, $type, $paymentMethod, $description, $recurrent, $categories, $tags, $id);
            $errors['success'] = 'La transaction a bien été ajoutée';
            echo json_encode($errors);
        } else {
            echo json_encode($errors);
        }
    }
    public function getHistory(int $id): void
    {
        $search = $_POST['search'];
        $categories = $_POST['categories'];
        $tags = $_POST['tags'];
        $date = $_POST['date'];
        $paymentMethod = $_POST['paymentMethod'];
        $order = $_POST['order'];

        $transaction = new TransactionModel();
        $user = $_SESSION['user'];
        $id_users = $user->getId();

        if ($id_users === $id) {
            $transactions = $transaction->getHistory($search, $categories, $tags, $date, $paymentMethod, $order, $id);
            //echo json_encode($transactions);
        } else {
            echo json_encode('Vous n\'avez pas accès à ces transactions');
        }

    }
}