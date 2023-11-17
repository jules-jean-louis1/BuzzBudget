# BuzzBudget

## Descriptif du projet
BuzzBudget est un outil de gestion de finances complet qui vous permet de faire tout ce que permettent les applications bancaires sans les pop-up et les publicités. Il offre les fonctionnalités suivantes :

- Ajout de nouvelles transactions
- Qualification des transactions (date, lieu, titre, description, pointage, etc.)
- Catégorisation des transactions
- Affichage de la liste des transactions
- Affichage du solde restant
- Tri et filtrage des transactions (par catégorie, date, montant, etc.)

Le site est responsive sur tous les écrans et adopte un design mobile first.

## Fonctionnalités

### Inscription
Lors de l'inscription, l'utilisateur doit entrer les informations suivantes :
- Nom
- Prénom
- Email
- Password
- Montant de départ 

### Connexion
Pour se connecter, l'utilisateur doit entrer son email et son mot de passe.

### Homepage
La page d'accueil affiche les dépenses du mois de l'utilisateur, avec les 3 dernières dépenses, la date, le nom, le montant. Elle offre également 3 boutons d'actions :
- Nouvelle Transaction : pour ajouter une nouvelle dépense à son compte.
- Envoyer de l'argent : pour envoyer de l'argent aux personnes ajoutées.
- Programmer : pour voir toutes les transactions qui ont une récurrence/périodicité avec leur montant et date de début et de fin.

### Ajouter une transaction
Dans cette page, l'utilisateur peut ajouter une nouvelle dépense ou entrer de l'argent sur son compte. Il peut choisir entre plusieurs paramètres d'ajout.

### Historique des opérations
Cette page affiche les différentes opérations réalisées avec la possibilité de filtrer par catégories, tags, date, récurrences.

### Mon budget 
Cette page permet d'ajouter les transactions avec les catégories.

### Profil 
Cette page permet de modifier les informations personnelles de l'utilisateur, d'ajouter une image de profil, de modifier ses catégories et tags, et de supprimer son compte.

## Sécurité
Les données sensibles sont cryptées. Les mots de passe sont chiffrés avec `password_hash()` et vérifiés avec `password_verify()`. Les entrées sont validées et assainies avec `filter_var()` pour s'assurer qu'elles ne contiennent pas de données malveillantes.