import fs from 'fs';

// Fonction pour rafraîchir le token
async function refreshToken() {
    const sessionFilePath = './sessionData.json';
    
    // Charger les données de session (accessToken et refreshToken)
    const sessionData = JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
    const refreshToken = sessionData.refreshToken;
    const accessToken = sessionData.accessToken;

    // URL pour rafraîchir le token
    const refreshUrl = 'https://gw.api.animationdigitalnetwork.fr/player/refresh/token';

    await fetch("https://gw.api.animationdigitalnetwork.fr/authentication/refresh", {
        "headers": {
          "accept": "*/*",
          "accept-language": "fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,de-DE;q=0.5,de;q=0.4",
          "priority": "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "Referer": "https://animationdigitalnetwork.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "OPTIONS"
      });

      const response = await fetch("https://gw.api.animationdigitalnetwork.fr/authentication/refresh", {
        "headers": {
          "accept": "application/json",
          "accept-language": "fr",
          "authorization": `Bearer ${accessToken}`,
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Microsoft Edge\";v=\"128\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-access-token": accessToken,
          "x-i18n-platform": "1",
          "x-profile-id": "2",
          "x-target-distribution": "fr",
          "Referer": "https://animationdigitalnetwork.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{\"refreshToken\":\"${refreshToken}\"}`,
        "method": "POST"
      });


     // Extraire les nouveaux tokens de la réponse
     if (response.ok) {
        const data = await response.json();
        console.log('Nouveaux tokens:', data);

        // Vous pouvez ensuite enregistrer les nouveaux tokens dans un fichier si nécessaire
        fs.writeFileSync('./sessionData.json', JSON.stringify({ 
            accessToken: data.accessToken, 
            refreshToken: data.refreshToken 
        }));
    } else {
        console.error('Erreur lors du rafraîchissement du token:', response.status, response.statusText);
    }
}

// Exemple d'utilisation
refreshToken();
