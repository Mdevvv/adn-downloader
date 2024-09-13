const puppeteer = require('puppeteer');
const os = require('os');

(async () => {
  const URL = `https://animationdigitalnetwork.com/video/1188-my-deer-friend-nokotan/26192-episode-1`
  
  let launchOptions = { headless: true }; // Paramètre par défaut (headless)

  if (os.platform() === 'linux') {
    launchOptions.executablePath = '/usr/bin/chromium'; 
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  
  // Activer l'interception des requêtes
  await page.setRequestInterception(true);

  const m3u8Urls = new Set();

  page.on('request', request => {
    // Capturer les requêtes pour les fichiers contenant '.m3u8'
    if (request.url().endsWith('playlist.m3u8?ext=.mp4')) {
      m3u8Urls.add(request.url());
    }
    // Continuer à envoyer la requête au réseau
    request.continue();
  });
  
  // Naviguer vers l'URL souhaitée
  await page.goto(URL, { timeout: 60000, waitUntil: 'networkidle2' });

  // Afficher les URL des fichiers .m3u8
  console.log('Fichiers .m3u8 trouvés :');
  m3u8Urls.forEach((url, index) => {
    console.log(`${url}`);
  });

  await browser.close();
})();
