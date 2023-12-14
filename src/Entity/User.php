<?php

namespace App\Entity;
class User {
    private $id;
    private $email;
    private $firstname;
    private $lastname;
    private $avatar;

    public function __construct() {
        
    }

    public function setId(int $id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setEmail(string $email) {
        $this->email = $email;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setFirstname(string $firstname) {
        $this->firstname = $firstname;
    }

    public function getFirstname() {
        return $this->firstname;
    }

    public function setLastname(string $lastname) {
        $this->lastname = $lastname;
    }

    public function getLastname() {
        return $this->lastname;
    }

    public function setAvatar(string $avatar) {
        $this->avatar = $avatar;
    }

    public function getAvatar() {
        return $this->avatar;
    }
    public function toArray() {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'avatar' => $this->avatar,
        ];
    }
    // Ajoutez d'autres méthodes ou fonctionnalités au besoin
}
