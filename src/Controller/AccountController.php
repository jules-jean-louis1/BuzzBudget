<?php

namespace App\Controller;
use App\Model\AccountModel;
use App\Model\TransactionModel;

class AccountController
{
    public function display(int $id): void
    {
        $account = new AccountModel();
        $account = $account->getAccount($id);
        echo json_encode($account);
    }
    public function displayHome(int $id): void
    {
        $account = new AccountModel();
        $transaction = new TransactionModel();
        $account = $account->getAccount($id);
        $transaction = $transaction->getLast5Transaction($id);
        $data = [
            'account' => $account,
            'transaction' => $transaction
        ];
        echo json_encode($data);

    }
    public function update(int $id, string $total): void
    {
        $account = new AccountModel();
        $account->updateAccount($id, $total);
    }
}