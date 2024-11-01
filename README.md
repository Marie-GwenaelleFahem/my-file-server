# My File Server
App qui permet d'uploader un fichier en ligne puis de le partager via un lien de téléchargement comme WeTransfer

## Techno

## Backend

- Node.Js
- Express.js
- JWT (JSON Web Token)
- Multer

## Frontend

- React
- Vite


## Installation et lancement du projet

Il est important d'avoir docker sur sa machine avant de poursuivre

1. Cloner le repo 
```bash
git clone https://github.com/Marie-GwenaelleFahem/my-file-server.git
cd my-file-server
```

2. Construire les images
```bash
docker compose up --build
```

3. Lancer les containers en arrière plan
```bash
docker compose up -d
```

4. Arrêter les containers
```bash
docker compose down
```

## Le projet

**Fonctionnalités**
- Upload de fichiers : Permet aux utilisateurs d’uploader des fichiers tout  en respectant un quota maximum de 2 Go.
- Vérification de quota : Le middleware quotaMiddleware.js s'assure que chaque utilisateur respecte son quota.
CRUD des fichiers : Affichage, téléchargement et suppression de fichiers.

## Contributeurs

- **Marie René**
- **Sabrina Attos**
- **Marie-Gwenaëlle Fahem**