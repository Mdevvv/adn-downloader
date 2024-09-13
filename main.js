import puppeteer from 'puppeteer';
import os from 'os';
import { exec } from 'child_process';
import fs from 'fs';

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


function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data; // Retourne le contenu du fichier
  } catch (err) {
    console.error('Erreur de lecture du fichier:', err);
  }
}


function convertToAss(subs) {
  const assFile = 'output.ass';
  
  const header = `[Script Info]
; Script generated by Aegisub 9215, Daydream Cafe Edition [Shinon]
; http://www.aegisub.org/ 
; https://github.com/Mdevvv
Title: Français (France)
Original Script: Auteur
Original Translation: 
Original Editing: 
Original Timing: 
Synch Point: 
Script Updated By: 
Update Details: 
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
Timer: 0.0000
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.709

[Aegisub Project Garbage]
Video AR Mode: 4
Video AR Value: 1.777778
Video Zoom Percent: 0.500000

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Trebuchet MS,66,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,3,3,2,75,75,75,1
Style: Leftbot,Trebuchet MS,66,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,3,3,1,75,75,75,1
Style: Rightbot,Trebuchet MS,66,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,3,3,3,75,75,75,1
Style: Leftmid,Trebuchet MS,66,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,3,3,4,75,75,75,1
Style: Midmid,Trebuchet MS,66,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,3,3,5,75,75,75,1
Style: Rightmid,Trebuchet MS,66,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,3,3,6,75,75,75,1
Style: Lefttop,Trebuchet MS,66,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,3,3,7,75,75,75,1
Style: Midtop,Trebuchet MS,66,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,3,3,8,75,75,75,1
Style: Righttop,Trebuchet MS,66,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,3,3,9,75,75,75,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`


  function convertTime(seconds_float) {
    const hours = Math.floor(seconds_float / 3600);
    const minutes = Math.floor((seconds_float % 3600) / 60);
    const seconds = Math.floor(seconds_float % 60);
    const milliseconds = Math.floor((seconds_float - Math.floor(seconds_float)) * 100);

    // Formater le temps dans le format '0:0:00:01.41'
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  }

  function getIndexAlign(curr) {
      const weights = ["start", "middle", "end"];
      const width = weights.indexOf(curr.positionAlign);
      const height = weights.indexOf(curr.lineAlign) * 3;

      return style[width + height];
  }

  function replaceUnicodeSequences(text) {
      // Utiliser une expression régulière pour trouver les séquences Unicode
      const unicodePattern = /\\u([0-9a-fA-F]{4})/g;

      function decodeUnicode(match, p1) {
          // Convertir la séquence Unicode en caractère UTF-8
          return String.fromCharCode(parseInt(p1, 16));
      }

      // Remplacer toutes les séquences Unicode par leurs caractères UTF-8
      return text.replace(unicodePattern, decodeUnicode);
  }

  function textRefractor(curr) {
    if (curr && typeof curr.text === 'string') {
      return replaceUnicodeSequences(curr.text)
          .replace(/\n/g, "\\N")           // Remplacer les sauts de ligne par \N
          .replace(/<i>/g, "{\\i1}")      // Remplacer <i> par {\\i1}
          .replace(/<\/i>/g, "{\\i0}")    // Remplacer </i> par {\\i0}
          .replace(/<b>/g, "{\\b1}")      // Remplacer <b> par {\\b1}
          .replace(/<\/b>/g, "{\\b0}")    // Remplacer </b> par {\\b0}
          .replace(/<u>/g, "{\\u1}")      // Remplacer <u> par {\\u1}
          .replace(/<\/u>/g, "{\\u0}");   // Remplacer </u> par {\\u0}
    } else {
        return ''; // Retourne une chaîne vide si curr ou curr.text n'est pas valide
    }
  }


  const style = [
    "Leftbot", "Default", "Rightbot",
    "Leftmid", "Midmid", "Rightmid",
    "Lefttop", "Midtop", "Righttop"
  ];


  fs.writeFileSync(assFile, header + '\n')

  const data = subs[Object.keys(subs)[0]];
  for (let i = 0; i < data.length; ++i) {
    const curr = data[i];
    fs.appendFileSync(assFile, "Dialogue: 0," + convertTime(curr["startTime"]) + "," + convertTime(curr["endTime"]) + ","+ getIndexAlign(curr) +",,0,0,0,," + textRefractor(curr) + '\n');
  }
}

(async () => {
  
  const URL = `https://animationdigitalnetwork.com/video/1188-my-deer-friend-nokotan/26192-episode-1`;

  let launchOptions = { headless: "shell", args: ['--no-sandbox', '--disable-setuid-sandbox'] }; // Paramètre par défaut (headless)

  if (os.platform() === 'linux') {
    launchOptions.executablePath = '/usr/bin/chromium'; 
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.119 Safari/537.36');
  // Activer l'interception des requêtes
  await page.setRequestInterception(true);

  let m3u8Urls = null;

  page.on('request', async request => {
    const url = request.url();
    if (url.includes('adn-vjs') && url.includes('.js')) {

      const response = await fetch(url);
      let resp = await response.text();
      resp = resp.replace("P[this.trackIndex]=JSON.parse(r)||{}", "P[this.trackIndex]=JSON.parse(r)||{}; window.exposedValue = P[this.trackIndex];");
        

      request.respond({
        status: 200,
        contentType: 'application/javascript',
        body: `${resp}`
      });
    } else if (url.endsWith('playlist.m3u8?ext=.mp4')) {
      m3u8Urls = url;
      request.continue();
    } else {
      request.continue();
    }
  });

  // Naviguer vers l'URL souhaitée
  await page.goto(URL, {waitUntil: 'networkidle2' });

  // Récupérer la valeur exposée de `P`
  const PValue = await page.evaluate(() => {
    return window.exposedValue;
  });


  // Afficher les URL des fichiers .m3u8
  console.log('m3u8 URL:', m3u8Urls);

  await browser.close();
  
  try {
    
    const tasks = [];

    if (m3u8Urls) {
      tasks.push(new Promise((resolve) => {
        runFFmpeg(m3u8Urls);
        resolve();
      }));


    }
    if(m3u8Urls && PValue) {
      tasks.push(new Promise((resolve) => {
        convertToAss(PValue);
        resolve();
      }));
      await Promise.all(tasks);
    }
  } catch (err) {
    console.error('Rip error:', err.message);
  }  
})();
