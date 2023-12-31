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
    public function getHistory(string $id): void
    {

        $search = isset($_POST['search']) ? $_POST['search'] : '';
        $categories = isset($_POST['categories']) ? $_POST['categories'] : '';
        $tags = isset($_POST['tags']) ? $_POST['tags'] : '';
        $date = isset($_POST['date']) ? $_POST['date'] : '';
        $paymentMethod = isset($_POST['paymentMethod']) ? $_POST['paymentMethod'] : '';
        $order = isset($_POST['order']) ? $_POST['order'] : '';

        $transaction = new TransactionModel();
        $user = $_SESSION['user'];
        $id_users = $user->getId();

        if ($id_users === intval($id)) {
            $transactions = $transaction->getHistory($search, $categories, $tags, $date, $paymentMethod, $order, $id_users);
            echo json_encode($transactions);
        } else {
            echo json_encode(['error' => 'Vous n\'avez pas accès à ces transactions']);
        }

    }
    public function delete(int $id) {
        $transaction = new TransactionModel();
        $user = $_SESSION['user'];
        $id_users = $user->getId();
        if ($transaction->deleteTransaction($id, $id_users)) {
            $errors['success'] = 'La transaction a bien été supprimée';
        } else {
            $errors['error'] = 'La transaction n\'a pas pu être supprimée';
        }
        echo json_encode($errors);
    }
    public function getOne(int $id_transaction): void
    {
        $transaction = new TransactionModel();
        $user = $_SESSION['user'];
        $id_users = $user->getId();
        $errors = [];
        $getTransaction = $transaction->getOneTransaction($id_transaction, $id_users);

        if (empty($getTransaction)) {
            $errors['error'] = 'La transaction n\'existe pas';
            echo json_encode($errors);
        } else {
            $tags = $transaction->getTagsOfTransaction($id_transaction);
            $categories = $transaction->getCategoriesOfTransaction($id_transaction);
            $errors['success'] = ['transaction' => $getTransaction,
                                'tags' => $tags,
                                'categories' => $categories];
            echo json_encode($errors);
        }
    }
    public function update(int $id_transaction) {
        $transaction = new TransactionModel();
        $user = $_SESSION['user'];
        $id_users = $user->getId();
        $errors = [];

        $getTransaction = $transaction->getOneTransaction($id_transaction, $id_users);

        /* Dealing with the transaction */
        $bddName = $getTransaction['name_transaction'];
        $bddDescription = $getTransaction['description'];
        $bddAmount = $getTransaction['amount_transaction'];
        $bddType = $getTransaction['type_of_transaction'];
        $bddPaymentMethod = $getTransaction['payment_method'];
        $bddDate = $getTransaction['date_of_transaction'];
        
        /* verifyField() is a method from AbstractController */
        $name = $this->verifyField('name');
        $description = $this->verifyField('description');
        $amount = $this->verifyField('amount');
        $type = $this->verifyField('type');
        $paymentMethod = $this->verifyField('paymentMethod');
        $date = $this->verifyField('date');
        $tags = $this->verifyField('tags');
        $tagsArray = json_decode($tags, true);
        $categories = $this->verifyField('categories');
        $categoriesArray = json_decode($categories, true);


        if (empty($getTransaction)) {
            $errors['error'] = 'La transaction n\'existe pas';
            echo json_encode($errors);
        } else {
            if (!$name) {
                $name = $bddName;
            } elseif (strlen($name) < 2 || strlen($name) > 50) {
                $errors['name'] = 'Le nom de la transaction doit contenir entre 2 et 50 caractères';
            }
            if (!$description) {
                $description = $bddDescription;
            } elseif (strlen($description) < 2 || strlen($description) > 255) {
                $errors['description'] = 'La description doit contenir entre 2 et 255 caractères';
            }
            if (!$amount) {
                $amount = $bddAmount;
            } elseif (!is_numeric($amount)) {
                $errors['amount'] = 'Le montant doit être un nombre';
            }
            if (!$type) {
                $type = $bddType;
            } elseif ($type !== 'depense' && $type !== 'revenu') {
                $errors['type'] = 'Le type de transaction doit être soit une dépense soit un revenu';
            } elseif ($type === 'depense') {
                if($paymentMethod !== 'espece' && $paymentMethod !== 'carte' && $paymentMethod !== 'cheque' && $paymentMethod !== 'virement' && $paymentMethod !== 'n/a') {
                    $errors['paymentMethod'] = 'Le mode de paiement doit être soit espèce, carte, chèque ou virement';
                }
            } else {
                $paymentMethod = null;
            }
            if (!$date) {
                $date = $bddDate;
            } elseif (!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/', $date)) {
                $errors['date'] = 'La date doit être au format YYYY-MM-DD';
            }
            if (empty($tagsArray)) {
                $tags = null;
            } else {
                $tags = $tagsArray;
            }
            if (empty($categoriesArray)) {
                $categories = null;
            } else {
                $categories = $categoriesArray;
            }
        }

        if (empty($errors)) {
            if ($bddName !== $name) {
                $transaction->updateName($id_transaction, $name);
            }
            if ($bddDescription !== $description) {
                $transaction->updateDescription($id_transaction, $description);
            }
            if ($bddAmount !== $amount) {
                $transaction->updateAmount($id_transaction, $amount);
            }
            if ($bddType !== $type) {
                $transaction->updateType($id_transaction, $type);
            }
            if ($bddPaymentMethod !== $paymentMethod) {
                $transaction->updatePaymentMethod($id_transaction, $paymentMethod);
            }
            if ($bddDate !== $date) {
                $transaction->updateDate($id_transaction, $date);
            }
            if ($tags !== null) {
                $transaction->deleteTagsOfTransaction($id_transaction);
                foreach ($tags as $tag) {
                    $transaction->addTagToTransaction($id_transaction, $tag['id_tags']);
                }
            } else {
                $transaction->deleteTagsOfTransaction($id_transaction);
            }
            if ($categories !== null) {
                $transaction->deleteCategoriesOfTransaction($id_transaction);
                foreach ($categories as $category) {
                    $transaction->addCategoriesToTransaction($id_transaction, $category['id_categories']);
                }
            } else {
                $transaction->deleteCategoriesOfTransaction($id_transaction);
            }
            $errors['success'] = 'La transaction a bien été modifiée';
            echo json_encode($errors);
        } else {
            echo json_encode($errors);
        }

    }
}