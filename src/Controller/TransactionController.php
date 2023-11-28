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
        $tags = $this->verifyField('tags');
    }
}