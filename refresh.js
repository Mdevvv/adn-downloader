import axios from "axios";
import fs from "fs";

async function rafraichirTokenEtSauvegarder() {
    const sessionFilePath = './sessionData.json';
    const refreshUrl = 'https://gw.api.animationdigitalnetwork.fr/authentication/refresh-token';

    // Vérifier si le fichier des tokens existe
    if (!fs.existsSync(sessionFilePath)) {
        console.error('Données de session non trouvées. Veuillez vous connecter d\'abord.');
        return;
    }

    // Lire les tokens sauvegardés
    const sessionData = JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
    const { refreshToken } = sessionData;

    try {
        // Envoyer la requête pour rafraîchir le token
        const refreshResponse = await axios.post(refreshUrl, { refreshToken }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        });

        // Sauvegarder le nouveau accessToken
        sessionData.accessToken = refreshResponse.data.accessToken;
        fs.writeFileSync(sessionFilePath, JSON.stringify(sessionData));
        console.log('Token rafraîchi et sauvegardé:', sessionData.accessToken);
    } catch (error) {
        console.error('Erreur lors du rafraîchissement du token :', error.response ? error.response.data : error.message);
    }
}
