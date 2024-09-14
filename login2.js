
import axios from 'axios';
import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function input(question) {
    return new Promise((resolve) => {
      rl.question(question, (reponse) => {
        resolve(reponse);
      });
    });
  }

async function loggingAndProfile() {
    const loginUrl = 'https://gw.api.animationdigitalnetwork.fr/authentication/login';
    const profileUrl = 'https://gw.api.animationdigitalnetwork.fr/profile?detailed=true&withPreference=true&withBlacklist=true';
    const URL = 'https://animationdigitalnetwork.com';

    // Données de login
    const loginBody = {
        username: await input('email : '),
        password: await input('password : '),
        rememberMe: true,
        source: 'Web'
    };
    rl.close();
    const loginHeaders = {
        'Content-Type': 'application/json',
        'X-Target-Distribution': 'fr',
        'X-I18n-Platform': '1',
        'Origin': URL,
        'Referer': URL,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.112 Safari/537.36',
        'Accept': 'application/json'
    };

    try {
        const loginResponse = await axios.post(loginUrl, loginBody, { headers: loginHeaders });
        const { accessToken, refreshToken } = loginResponse.data;

        fs.writeFileSync('./sessionData.json', JSON.stringify({ accessToken, refreshToken }));
        console.log('Connection successful and tokens saved.');

        const profileResponse = await axios.get(profileUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Target-Distribution': 'fr',
                'X-I18n-Platform': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.112 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        fs.writeFileSync('./profileData.json', JSON.stringify(profileResponse.data));
        console.log('Profile retrieved and saved.');

    } catch (error) {
        console.error('Error during connection or profile retrieval: ', error.response ? error.response.data : error.message);
    }
}

loggingAndProfile();
