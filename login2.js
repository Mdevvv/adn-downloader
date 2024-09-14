
import axios from 'axios';
import fs from 'fs';

async function seConnecterEtRecupererProfil() {
    const loginUrl = 'https://gw.api.animationdigitalnetwork.fr/authentication/login';
    const profileUrl = 'https://gw.api.animationdigitalnetwork.fr/profile?detailed=true&withPreference=true&withBlacklist=true';
    
    // Données de login
    const loginBody = {
        username: fs.readFileSync('test-username.txt', 'utf8'),
        password: fs.readFileSync('test-password.txt', 'utf8'),
        rememberMe: true,
        source: 'Web'
    };

    const loginHeaders = {
        'Content-Type': 'application/json',
        'X-Target-Distribution': 'fr',
        'X-I18n-Platform': '1',
        'Origin': 'https://animationdigitalnetwork.com',
        'Referer': 'https://animationdigitalnetwork.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.112 Safari/537.36',
        'Accept': 'application/json'
    };

    try {
        // Se connecter pour obtenir les tokens
        const loginResponse = await axios.post(loginUrl, loginBody, { headers: loginHeaders });
        const { accessToken, refreshToken } = loginResponse.data;

        // Sauvegarder les tokens
        fs.writeFileSync('./sessionData.json', JSON.stringify({ accessToken, refreshToken }));
        console.log('Connexion réussie et tokens sauvegardés.');

        // Récupérer le profil avec le token d'accès
        const profileResponse = await axios.get(profileUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Target-Distribution': 'fr',
                'X-I18n-Platform': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.112 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        // Sauvegarder les informations du profil
        fs.writeFileSync('./profileData.json', JSON.stringify(profileResponse.data));
        console.log('Profil récupéré et sauvegardé.');

    } catch (error) {
        console.error('Erreur lors de la connexion ou de la récupération du profil :', error.response ? error.response.data : error.message);
    }
}

// Exécuter la fonction
seConnecterEtRecupererProfil();
