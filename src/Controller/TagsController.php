<?php

namespace App\Controller;
use App\Model\TagsModel;
class TagsController extends AbstractClasses\AbstractContoller
{
    public function getTags(): void
    {
        $tags = new TagsModel();
        $user = $_SESSION['user'];
        $id = $user->getId();
        $tags = $tags->getTags($id);
        echo json_encode($tags);
    }
    public function add(): void
    {
        $input_tags = $this->verifyField('tags');
        $user = $_SESSION['user'];
        $id = $user->getId();
        $tags = new TagsModel();

        $errors = [];

        if (!$input_tags) {
            $errors['tags'] = 'Entrer le nom du tag';
        } elseif (strlen($input_tags) < 2 || strlen($input_tags) > 50) {
            $errors['tags'] = 'Le nom du tag doit contenir entre 2 et 50 caractères';
        }

        if (empty($errors)) {
            $tags->addTags($input_tags, $id);
            $errors['success'] = 'Le tag a bien été ajouté';
            echo json_encode($errors);
        } else {
            echo json_encode($errors);
        }
    }
    public function delete(int $id): void
    {
        $tags = new TagsModel();
        if ($tags->deleteTags($id)) {
            if ($tags->deleteTagsOfUser($id)) {
                $errors['success'] = 'Le tag a bien été supprimé';
            } else {
                $errors['error'] = 'Le tag a été supprimé, mais pas des transactions de l\'utilisateur';
            }
        } else {
            $errors['error'] = 'Le tag n\'a pas pu être supprimé';
        }
        echo json_encode($errors);
    }
    public function edit(int $id): void
    {
        $input_tags = $this->verifyField('tags');
        $user = $_SESSION['user'];
        $id_users = $user->getId();
        $tags = new TagsModel();

        $errors = [];

        if (!$input_tags) {
            $errors['tags'] = 'Entrer le nom du tag';
        } elseif (strlen($input_tags) < 2 || strlen($input_tags) > 50) {
            $errors['tags'] = 'Le nom du tag doit contenir entre 2 et 50 caractères';
        }

        if (empty($errors)) {
            $tags->editTags($id, $input_tags);
            $errors['success'] = 'Le tag a bien été modifié';
            echo json_encode($errors);
        } else {
            echo json_encode($errors);
        }
    }
    
}