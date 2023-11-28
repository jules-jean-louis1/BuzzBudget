<?php

namespace App\Controller;
use App\Model\AccountModel;
class AccountController 
{
    public function display(int $id): void
    {
        $account = new AccountModel();
        $account = $account->getAccount($id);
        echo json_encode($account);
    }
    public function update(int $id, string $total): void
    {
        $account = new AccountModel();
        $account->updateAccount($id, $total);
    }
}