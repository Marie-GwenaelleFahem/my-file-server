// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors()); // Activer CORS pour les requêtes cross-origin
app.use(express.json());

// Configurer multer pour les téléchargements de fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Spécifier le dossier de destination pour les fichiers téléchargés
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Utiliser le timestamp comme nom de fichier
    },
});

const upload = multer({ storage }); // Initialiser multer avec la configuration de stockage

// Endpoint pour télécharger des fichiers
app.post('/api/upload', upload.single('file'), (req, res) => {
    const fileId = req.file.filename; // Récupérer le nom du fichier téléchargé
    const token = jwt.sign({ fileId, exp: Math.floor(Date.now() / 1000) + (15 * 60) }, process.env.JWT_SECRET); // Générer un token JWT avec une durée de validité de 15 minutes
    console.log(`Token généré: ${token}`); // Afficher le token généré dans la console
    res.json({ link: `${req.protocol}://${req.get('host')}/api/get-file/${token}` }); // Renvoie le lien de téléchargement avec le token
});

// Endpoint pour récupérer des fichiers
app.get('/api/get-file/:token', (req, res) => {
    jwt.verify(req.params.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token invalide ou expiré'); // Gérer les erreurs de vérification du token
        }
        const filePath = path.join(__dirname, 'uploads', decoded.fileId); // Construire le chemin du fichier à partir de l'ID
        res.download(filePath); // Télécharger le fichier
    });
});

// Importer une fonction de vérification de token
const { verifyToken } = require('./tokenService');

app.get('/api/file/:fileId', (req, res) => {
    const token = req.query.token; // Récupérer le token à partir des paramètres de requête
    const fileId = req.params.fileId; // Récupérer l'ID du fichier à partir des paramètres
    console.log(`Token récupéré: ${token}`);
    // Vérifier le token
    try {
        const decoded = verifyToken(token); // Vérifier la validité du token
        if (decoded.fileId === fileId) { // Si le token est valide et correspond à l'ID du fichier
            res.download(`uploads/${fileId}`);
        } else {
            res.status(403).send('Accès refusé : Token invalide'); // Gérer les accès non autorisés
        }
    } catch (err) {
        res.status(401).send('Accès refusé : Token invalide'); // Gérer les erreurs de vérification du token
    }
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
