const puppeteer = require('puppeteer');
const os = require('os');
const { exec } = require('child_process');

/**
 * Exécuter une commande FFmpeg
 * @param {string} link - Les arguments de la commande FFmpeg sous forme de tableau
 * @returns {Promise} - Résout avec la sortie de FFmpeg ou rejette en cas d'erreur
 */
function runFFmpeg(link) {
  return new Promise((resolve, reject) => {
    exec(`ffmpeg -i "${link}" -c copy output.mkv -y`, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Erreur d'exécution de FFmpeg: ${error.message}`));
        return;
      }
      if (stderr) {
        console.error(`FFmpeg stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

const fs = require('fs');

function readFileSync(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data; // Retourne le contenu du fichier
  } catch (err) {
    console.error('Erreur de lecture du fichier:', err);
  }
}

(async () => {
  const URL = `https://animationdigitalnetwork.com/video/1188-my-deer-friend-nokotan/26192-episode-1`;

  let launchOptions = { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }; // Paramètre par défaut (headless)

  if (os.platform() === 'linux') {
    launchOptions.executablePath = '/usr/bin/chromium'; 
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  // Activer l'interception des requêtes
  await page.setRequestInterception(true);

  let m3u8Urls = null;

  page.on('request', request => {
    const url = request.url();
    if (url.includes('adn-vjs') && url.includes('.js')) {
      // Modifier la requête pour adn-vjs.js
      request.respond({
        status: 200,
        contentType: 'application/javascript',
        body: `${readFileSync("adn-vjs-mod.txt")}`
      });
    } else if (url.endsWith('playlist.m3u8?ext=.mp4')) {
      m3u8Urls = url;
    } else {
      // Continuer à envoyer les autres requêtes
      request.continue();
    }
  });

  // Naviguer vers l'URL souhaitée
  await page.goto(URL, { timeout: 600000, waitUntil: 'networkidle2' });

  // Récupérer la valeur exposée de `r`
  const rValue = await page.evaluate(() => {
    return window.exposedValue || 'Valeur non trouvée';
  });

  console.log('Valeur de r:', rValue);

  // Afficher les URL des fichiers .m3u8
  console.log('m3u8 URL:', m3u8Urls);

  await browser.close();

  try {
    if (m3u8Urls) {
      //await runFFmpeg(m3u8Urls);
    }
  } catch (err) {
    console.error('Erreur lors de la conversion:', err.message);
  }  
})();
