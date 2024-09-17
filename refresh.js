import axios from 'axios';
import fs from 'fs';

// Fonction pour rafraîchir le token
async function refreshToken() {
    const sessionFilePath = './sessionData.json';
    
    // Charger les données de session (accessToken et refreshToken)
    const sessionData = JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
    const refreshToken = sessionData.refreshToken;

    // URL pour rafraîchir le token
    const refreshUrl = 'https://gw.api.animationdigitalnetwork.fr/player/refresh/token';

    // Requête pour rafraîchir le token
    try {
        const refreshResponse = await axios.post(refreshUrl, null, {
            headers: {
                'X-Player-Refresh-Token': refreshToken,
                'Origin': 'https://animationdigitalnetwork.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.120 Safari/537.36',
                'Accept': '*/*'
            }
        });

        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;

        // Sauvegarder les nouveaux tokens dans sessionData.json
        fs.writeFileSync(sessionFilePath, JSON.stringify({ accessToken, refreshToken: newRefreshToken }));
        console.log('Token refreshed and saved successfully.');
        
        return accessToken; // Retourne le nouvel access token si nécessaire

    } catch (error) {
        console.error('Error refreshing the token: ', error.response ? error.response.data : error.message);
    }
}

// Exemple d'utilisation
refreshToken();
