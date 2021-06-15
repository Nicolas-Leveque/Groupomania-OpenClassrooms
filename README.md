# Groupomania-OpenClassrooms
Projet 7 formation OpenClassrooms développeur web junior

## Installation

Avant toute chose, cloner ce repo. Il contient le code de l'api dans le dossier 'backend' et le code React dans le dossier 'frontend' la base de données est hebergée par Microsoft Azure

### Backend

Dans le dossier 'backend' lancer la commande:

```
npm install
```
pour installer les dépendances.

Les données de connexion à la base de données sont contenus dans des fichiers d'environnement placés dans le  dossier /backend/app/config
Le script 'dev' lancé par la commande 
```
npm run dev
```
lance l'api avec la base de données en local, pour cela il faudra avoir un serveur mysql sur le localhost. 

Le script "azure"
```
npm run azure
```
quand à lui lance l'api avec la base de données hébergée sur Microsoft Azure, rien d'autres n'est nécessaire pour le bon fonctionnement de l'application.

### Frontend

Le frontend est une application Reactjs créée avec l'utilitaire create-react-app.
L'installation des dépendance se fait avec la commande
```
npm install
```
On lance ensuite l'application avec la commande pour
```
npm start
```

## Utilisation

L'application est une ébauche de réseau social interne pour l'entreprise fictive Groupomania.

Les utilisateurs peuvent créer un profil, ajouter une photo en avatar. Les seules données personnelles conservées sont les noms, prénoms et adresse mail à des fins d'authentification.

Les utilisateurs peuvent ensuite poster des messages ou des photos sur la page d'accueil et commenter ce que les autres ont posté. Ils peuvent aussi modifier le titre ou le contenu d'un post textuel ou d'un commentaire dont ils sont le propriétaire , les photos ne peuvent pas être modifiée pour l'instant.

Un compte administrateur pouvant modifier ou supprimer n'importe quel post, photo ou commentaire existe: il appartient a la personne controlant l'adresse mail "admin@groupomania.fr" Ceci est codé en dur dans l'api est entre en fonction au moment de la création d'un compte avec cet adresse. 

