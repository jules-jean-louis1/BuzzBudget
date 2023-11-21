<?php

namespace App\Controller;

use App\Model\AuthModel;

class AuthController extends AbstractClasses\AbstractContoller
{
    public function checkEmail()
    {
        $email = $this->verifyField('email');
        $errors = [];

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Email is not valid';
        }

        if (empty($errors)) {
            $user = new AuthModel();
            $user->checkEmail($email);
            if ($user) {
                $errors['email'] = 'Email already exists';
            }
        }
        echo json_encode($errors);
    }
    private function generateAvatarImage($text, $backgroundColor, string $username)
    {
        $canvasWidth = 200;
        $canvasHeight = 200;

        $canvas = imagecreatetruecolor($canvasWidth, $canvasHeight);

        // Convertir la couleur d'arrière-plan en composantes RGB
        $backgroundR = hexdec(substr($backgroundColor, 1, 2));
        $backgroundG = hexdec(substr($backgroundColor, 3, 2));
        $backgroundB = hexdec(substr($backgroundColor, 5, 2));

        // Remplir le canvas avec la couleur d'arrière-plan
        $backgroundColor = imagecolorallocate($canvas, $backgroundR, $backgroundG, $backgroundB);
        imagefill($canvas, 0, 0, $backgroundColor);

        // Définir la couleur du texte
        $foregroundColor = imagecolorallocate($canvas, 255, 255, 255); // Blanc

        // Centrer le texte dans le canvas
        $fontSize = floor(100.00);
        $fontPath = __DIR__ . '/../../public/font/Rajdhani-SemiBold.ttf';
        $textBoundingBox = imageftbbox($fontSize, 0, $fontPath, $text);
        $textWidth = $textBoundingBox[2] - $textBoundingBox[0];
        $textHeight = $textBoundingBox[1] - $textBoundingBox[7];
        $textX = ($canvasWidth - $textWidth) / 2;
        $textY = ($canvasHeight - $textHeight) / 2 + $textHeight;

        imagefttext($canvas, $fontSize, 0, $textX, $textY, $foregroundColor, $fontPath, $text);

        $randomString = bin2hex(random_bytes(3));
        $avatarName = $randomString . '-' . $username.'.png';
        $filename = __DIR__ . '/../../public/buzzbudget/public/images/avatars/' . $avatarName;
        imagepng($canvas, $filename);
        imagedestroy($canvas);

        return $avatarName;
    }
    private function validate_money($money): bool
    {
        if (preg_match(pattern: "/^[0-9]+(\.[0-9]{1,2})?$/", subject: $money)) {
            return true;
        } else {
            return false;
        }
    }
    public function register(): void
    {
        $email = $this->verifyField('email');
        $firstname = $this->verifyField('firstname');
        $lastname = $this->verifyField('lastname');
        $password = $this->verifyField('password');
        $passwordConfirm = $this->verifyField('passwordConfirm');
        $money = null;

        $errors = [];

        $authModel = new AuthModel();

        if (!$email) {
            $errors['email'] = 'Veuillez indiquer votre adresse e-mail.';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Veuillez indiquer votre adresse e-mail valide.';
        } elseif ($authModel->checkEmail($email)) {
            $errors['email'] = 'Cette email est déjà utilisé.';
            $errors['useEmail'] = 'Cette email est déjà utilisé.';
        }
        if (!$firstname) {
            $errors['firstname'] = 'Veuillez indiquer votre prénom.';
        } elseif (strlen($firstname) <= 2 || strlen($firstname) >= 50) {
            $errors['firstname'] = 'Votre prénom doit contenir entre 2 et 50 caractères.';
        }
        if (!$lastname) {
            $errors['lastname'] = 'Veuillez indiquer votre nom.';
        } elseif (strlen($lastname) <= 2 || strlen($lastname) >= 50) {
            $errors['lastname'] = 'Votre nom doit contenir entre 2 et 50 caractères.';
        }
        if (!$password) {
            $errors['password'] = 'Veuillez indiquer votre mot de passe.';
        } elseif (strlen($password) <= 8 || strlen($password) >= 50) {
            $errors['password'] = 'Votre mot de passe doit contenir entre 8 et 50 caractères.';
        } elseif (!$this->VerifyPassword($password)) {
            $errors['password'] = 'Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.';
        }
        if (!$passwordConfirm) {
            $errors['passwordConfirm'] = 'Veuillez confirmer votre mot de passe.';
        } elseif ($password !== $passwordConfirm) {
            $errors['passwordConfirm'] = 'Vos mots de passe ne correspondent pas.';
        }
        if (isset($_POST['money']) && !empty($_POST['money'])) {
            if (!$this->validate_money($_POST['money'])) {
                $errors['money'] = 'Veuillez indiquer un montant valide';
            } else {
                $money = $_POST['money'];
            }
        } else {
            $money = '0';
        }

        if ($_POST['terms'] === '0') {
            $errors['terms'] = 'Veuillez accepter les conditions générales d\'utilisation.';
        }
        if (empty($errors)) {
            if ($authModel->checkEmail($email)) {
                $errors['email'] = 'Cette E-mail est déja utilisé';
            } else {
                $email = $this->CleanUpInput($email);
                $firstname = $this->CleanUpInput($firstname);
                $lastname = $this->CleanUpInput($lastname);
                $password = $this->CleanUpInput($password);
                $firstLetter = strtoupper(substr($firstname, 0, 1));
                $backgroundColor = sprintf('#%06X', mt_rand(0, 0xFFFFFF));
                $avatar = $this->generateAvatarImage($firstLetter, $backgroundColor, $email);

                $authModel->register($email, $firstname, $lastname, $password, $avatar, $money);
                $errors['success'] = 'Votre compte a était créé avec success';
            }
            echo json_encode($errors);
        } else {
            echo json_encode($errors);
        }
    }
}