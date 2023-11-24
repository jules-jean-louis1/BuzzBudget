<?php

namespace App\Controller;
use App\Model\AccountModel;
class AccountController 
{
    public function display(int $id)
    {
        $account = new AccountModel();
        $account = $account->getAccount($id);
        echo json_encode($account);
    }
}