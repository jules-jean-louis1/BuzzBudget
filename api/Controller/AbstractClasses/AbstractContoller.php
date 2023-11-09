<?php

namespace App\Controller\AbstractClasses;

class AbstractContoller
{
    protected function verifyField($field): mixed
    {
        if (isset($_POST[$field]) && !empty(trim($_POST[$field]))) {
            return $_POST[$field];
        } else {
            return false;
        }
    }
    protected function ValidFieldForm(string $field): string
    {
        $field = trim($field);
        $field = htmlspecialchars($field);

        return $field;
    }
    protected function VerifyPassword(string $password): bool
    {
        // 8 caractères minimum, 3 lettres minuscules minimum, 2 lettres majuscules minimum, 2 chiffres minimum, 1 caractère spécial minimum
        if (preg_match(pattern: "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/", subject: $password)) {
            return true;
        } else {
            return false;
        }
    }
}