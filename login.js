import puppeteer from 'puppeteer';
import fs from 'fs';
import os from 'os';

(async () => {
// input : #login-username
// input : #login-password
// input : #login-remember
    let launchOptions = { headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] }; // Paramètre par défaut (headless)

    if (os.platform() === 'linux') {
        launchOptions.executablePath = '/usr/bin/chromium'; 
    }

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (request) => {
        if (request.url().includes('hotjar')) {
            request.abort(); // Bloque les requêtes vers Hotjar
        } else {
            request.continue(); // Continue avec les autres requêtes
        }
    });
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.119 Safari/537.36');
    
    await page.goto("https://animationdigitalnetwork.com/login", {waitUntil: 'networkidle2' });

    await page.waitForSelector('div.sd-cmp-1OY4L', { visible: true });
    await page.click('span[class="sd-cmp-2jmDj sd-cmp-TOv77"]')

    await page.type('#login-username', fs.readFileSync('test-username.txt', 'utf8'));
    await page.type('#login-password', fs.readFileSync('test-password.txt', 'utf8'));

    await page.click('#login-remember');

    await Promise.all([
        page.waitForNavigation(), // Attendre que la navigation se termine après l'envoi du formulaire
        page.click('button[type="submit"]') // Clique sur le premier bouton trouvé sur la page
    ]);

    let targetUrl = 'https://animationdigitalnetwork.com/profiles'; // Remplacez par l'URL cible
    await page.waitForFunction(
        url => location.href.startsWith(url),
        {},
        targetUrl
    );

    await page.waitForSelector('li');

    await page.evaluate(() => {
        const ul = document.querySelector('ul'); // Modifiez le sélecteur si nécessaire
        if (ul) {
            const firstLi = ul.querySelector('li'); // Trouver le premier <li>
            if (firstLi) {
                firstLi.click(); // Cliquer sur le premier <li>
            }
        }
    });

    await page.waitForFunction(
        url => !location.href.startsWith(url),
        {},
        targetUrl
    );

    await browser.close();
})();