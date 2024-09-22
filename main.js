import puppeteer from 'puppeteer';
import os from 'os';
import { spawn  } from 'child_process';
import fs from 'fs';
import readline from 'readline';
import { execSync }  from 'child_process';

let Nm3u8RE = "./N_m3u8DL-RE.exe";
let ffmpeg = "ffmpeg";
let ffprobe = "ffprobe";
const vfFilename = 'output.vf.aac'
const voFilename = 'output.mp4'
const assFile = 'output.ass'
const assFileForced = 'output.forced.ass'

const sessionFilePath = './sessionData.json';
const profileFilePath = './profileData.json';

if (!fs.existsSync(sessionFilePath) || !fs.existsSync(profileFilePath)) {
  execSync('node login2.js', { stdio: 'inherit' });

  const sessionData = fs.readFileSync(sessionFilePath, 'utf8');
  if (sessionData === "{}") {
      console.error("Error: Bad login.");
      process.exit(1);
  }
} else {
  try {
      execSync('node refresh.js', { stdio: 'inherit' });
  } catch (error) {
      console.log("");
      console.log("");
      console.error("Error during refresh:", error.message);
      execSync('node login2.js', { stdio: 'inherit' });

      const sessionData = fs.readFileSync(sessionFilePath, 'utf8');
      if (sessionData === "{}") {
          console.error("Error: Bad login.");
          fs.unlink(sessionFilePath, (err) => {
            if (err) {
                console.error(sessionFilePath,'Error deleting file:', err);
            }});

            fs.unlink(profileFilePath, (err) => {
              if (err) {
                  console.error(profileFilePath,'Error deleting file:', err);
              }});

          process.exit(1);
      }
  }
}

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

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args);

    proc.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    proc.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}


function convertToAss(subs, lang, output = assFile) {
  
  const header = `[Script Info]
; Script generated by Aegisub 9215, Daydream Cafe Edition [Shinon]
; http://www.aegisub.org/ 
; Rip Script
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

    
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  }

  function getIndexAlign(curr) {
      const weights = ["start", "middle", "end"];
      const width = weights.indexOf(curr.positionAlign);
      const height = weights.indexOf(curr.lineAlign) * 3;

      return style[width + height];
  }

  function replaceUnicodeSequences(text) {
      
      const unicodePattern = /\\u([0-9a-fA-F]{4})/g;

      function decodeUnicode(match, p1) {
          
          return String.fromCharCode(parseInt(p1, 16));
      }

      
      return text.replace(unicodePattern, decodeUnicode);
  }

  function textRefractor(curr) {
    if (curr && typeof curr.text === 'string') {
      return replaceUnicodeSequences(curr.text)
          .replace(/\n/g, "\\N")
          .replace(/<i>/g, "{\\i1}")
          .replace(/<\/i>/g, "{\\i0}")
          .replace(/<b>/g, "{\\b1}")
          .replace(/<\/b>/g, "{\\b0}")
          .replace(/<u>/g, "{\\u1}")
          .replace(/<\/u>/g, "{\\u0}");
    } else {
        return '';
    }
  }


  const style = [
    "Leftbot", "Default", "Rightbot",
    "Leftmid", "Midmid", "Rightmid",
    "Lefttop", "Midtop", "Righttop"
  ];


  fs.writeFileSync(output, header + '\n')

  const data = subs[lang];
  for (let i = 0; i < data.length; ++i) {
    const curr = data[i];
    fs.appendFileSync(output, "Dialogue: 0," + convertTime(curr["startTime"]) + "," + convertTime(curr["endTime"]) + ","+ getIndexAlign(curr) +",,0,0,0,," + textRefractor(curr) + '\n');
  }
}

function getMediaInfo(filePath) {
  return new Promise((resolve, reject) => {
    const ffprobeResult = spawn(ffprobe, [
      '-v', 'error', // Masque les messages d'erreur
      '-select_streams', 'v:0', // Sélectionne le premier flux vidéo
      '-show_entries', 'stream=codec_name,bit_rate,width,height', // Récupère l'encodeur et le bitrate
      '-of', 'json', // Formate la sortie en JSON
      filePath
    ]);

    let output = '';
    let errorOutput = '';

    ffprobeResult.stdout.on('data', (data) => {
      output += data;
    });

    ffprobeResult.stderr.on('data', (data) => {
      errorOutput += data;
    });

    ffprobeResult.on('close', (code) => {
      if (code === 0) {
        try {
          const videoInfo = JSON.parse(output);
          resolve({
            videoInfo
          });
        } catch (error) {
          reject(new Error('Error when reading video information.'));
        }
      } else {
        reject(new Error(`ffprobe failed with code ${code}: ${errorOutput}`));
      }
    });
  });
}

function muxFiles(fileName, isVF, isVostFR, forced/*, title, episodeName, episode, season*/) {
  (async () => {

  console.log("mux...")
  /*const metadata = {
    title: episodeName,
    series: title,
    episode: episode,
    season: season,
  };*/
  const mainInfo = await getMediaInfo(voFilename);
  const mainVinfo = mainInfo.videoInfo.streams[0];
  let args = ["-i", voFilename];

  

  if (isVostFR) {
    if (isVF) {
      args.push("-i", vfFilename); 
    }
      args.push("-i", assFile); 
  }

  if (isVostFR && isVF) {
      if(forced) {
        args.push("-i", assFileForced);
        args.push("-map", "0", "-map", "1:a:?", "-map", "2:s:?", "-map", "3:s:?");
        args.push("-metadata:s:a:0", "language=ja", "-metadata:s:a:1", "language=fre", "-metadata:s:s:0", "language=fre", "-metadata:s:s:0", "title=FR Subs", "-metadata:s:s:1", "language=fre", "-metadata:s:s:1", 'title=FR Forced');
        args.push("-c", "copy");
      } else {
        args.push("-map", "0", "-map", "1:a:?", "-map", "2:s:?");
        args.push('-metadata:s:a:0', "language=ja", "-metadata:s:a:1", "language=fre", "-metadata:s:s:0", "language=fre", "-metadata:s:s:0", 'title=FR Subs', "-disposition:s:0", "default");
        args.push("-c", "copy");
      }
  } else if (isVostFR) {
      args.push("-map", "0", "-map", "1:s:?");
      args.push("-metadata:s:a:0", "language=ja", "-metadata:s:s:0", "language=fre", "-metadata:s:s:0", 'title=FR Subs', "-disposition:s:0", "default");
      args.push("-c", 'copy');
  } else {
      rgs.push("-metadata:s:a:0", "language=fre")
      args.push("-c", "copy");
  }
  // for (const [key, value] of Object.entries(metadata)) {
  //     args.push(`-metadata ${key}="${value}"`);
  // }

  args.push(`${fileName}.${mainVinfo.height}p.WEB.${mainVinfo.codec_name}.mkv`);
  args.push("-y")
  await runCommand(ffmpeg, args);
  cleanup();
  })();
}

function cleanup() {
  const files = [voFilename, vfFilename, assFile, assFileForced];
  files.forEach(element => {
    fs.access(element, fs.constants.F_OK, (err) => {
      if (!err) {
          fs.unlink(element, (err) => {
              if (err) {
                  console.error(element,'Error deleting file:', err);
              } else {
                  console.log(element, 'The file has been successfully deleted.');
              }
          });
      }
    });
  });
}

(async () => {
    

    const sessionData = JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
    const profileData = JSON.parse(fs.readFileSync(profileFilePath, 'utf8'));

    const { accessToken, refreshToken } = sessionData;
    const profile = {
        "id": 1,
        "main": true,
        "name": `${profileData['profiles'][0]["name"]}`,
        "avatar": `${profileData['profiles'][0]["avatar"]}`,
        "ageCategory": null
    };

  const infoURL = 'https://gw.api.animationdigitalnetwork.fr/video/'
  const URL = 'https://animationdigitalnetwork.com';
  const url = await input('url : ');
  rl.close();

  const regex = /\/video\/(\d+)-(?:[^\/]+)\/(\d+)-/;

  const match = url.match(regex);
  let workId = ''
  let episodeId = ''
  if (match && match[1] && match[2]) {
    workId = match[1];
    episodeId = match[2];
    console.log('Work ID:', workId);
    console.log('Episode ID:', episodeId);
  } else {
    console.log('No IDs found');
  }

  const loginHeaders = {
    'Content-Type': 'application/json',
    'X-Target-Distribution': 'fr',
    'X-I18n-Platform': '1',
    'Origin': URL,
    'Referer': URL,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.112 Safari/537.36',
    'Accept': 'application/json'
  };

  // const infoResponce = await axios.get(infoURL+episodeId,{ headers: loginHeaders })
  const infoResponse = await fetch(infoURL+episodeId, { "headers": loginHeaders, "method": "GET" })
  const infoJsonData = await infoResponse.json();

  
  const languages = infoJsonData["video"]["languages"].map(item => item.toLowerCase());
  
  const isVF = languages.includes("vf") || languages.includes("french");
  const isVostFR = languages.includes("vostfr") || languages.includes("vostf");
  let forced = false;
  
  console.log("vostfr :", isVostFR, "vf :", isVF);

  let season = 1
  if(infoJsonData["video"].hasOwnProperty("season") && infoJsonData["video"]["season"] != null) {
    season = infoJsonData["video"]["season"];
  }
  
  const title = infoJsonData["video"]["show"]["title"];
  const episode = infoJsonData["video"]["shortNumber"];
  const episodeName = infoJsonData["video"]["title"];

  const fileName = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/'/g, '.').replaceAll(" ", ".").replaceAll("..",".") + ".S"+ season.padStart(2, '0') + "E"+ episode.padStart(2, '0');
  console.log(fileName);

  let launchOptions = { headless: "shell", args: ['--no-sandbox', '--disable-setuid-sandbox'] }; // Paramètre par défaut (headless)

  if (os.platform() === 'linux') {
    launchOptions.executablePath = '/usr/bin/chromium';
    Nm3u8RE = "n-m3u8dl-re";
  }
  else if(os.platform() === 'win32') {
    ffmpeg = "./ffmpeg.exe";
    ffprobe = "./ffprobe.exe";
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.119 Safari/537.36');
  
  await page.setRequestInterception(true);

  let m3u8Urls = "";
  let logged = false;

  page.on('request', async request => {
    const url = request.url();

    if(logged && url === url) {
        logged = true;
        request.continue();
    }
    else if (isVostFR && url.includes('adn-vjs') && url.includes('.js')) {
      console.log('including load:', url);
      const response = await fetch(url);
      let resp = await response.text();
      resp = resp.replace("P[this.trackIndex]=JSON.parse(r)||{}", "P[this.trackIndex]=JSON.parse(r)||{}; window.exposedValue = P[this.trackIndex];");
        

      request.respond({
        status: 200,
        contentType: 'application/javascript',
        body: `${resp}`
      });
    } else if (url.includes('playlist.m3u8')) {
      m3u8Urls = url;
      request.continue();
    } else {
      request.continue();
    }
  });

  
  await page.goto(URL+"/login", { waitUntil: 'domcontentloaded' });

  await page.evaluateOnNewDocument(({ accessToken, refreshToken, profile }) => {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    logged = true;
  }, { accessToken, refreshToken, profile });
  

  await page.goto(url, {waitUntil: 'networkidle2'});
  
  let PValue = undefined;
  if(isVostFR) {
    PValue = await page.evaluate(() => {return window.exposedValue;});
    await page.waitForFunction(() => typeof window.exposedValue !== 'undefined');
  }

  console.log('m3u8 URL:', m3u8Urls);

  if(m3u8Urls.startsWith('https://free')) {
    isVF = false;
    isVostFR = true;
    forced = false;
  }

  await browser.close();

  try {
    
    const tasks = [];

    if (m3u8Urls) {
      if (isVF && isVostFR) {
        tasks.push(runCommand(Nm3u8RE, [m3u8Urls.replace("playlist.m3u8?", "playlist.m3u8?audioindex=0&"), '--auto-select', '--live-pipe-mux', '--save-name', voFilename.replace(".mp4", "")]));
        tasks.push(runCommand(ffmpeg, ['-i', m3u8Urls.replace("playlist.m3u8?", "playlist.m3u8?audioindex=1&"), '-c', 'copy', '-vn', vfFilename, '-y']));
      } else {
        tasks.push(runCommand(Nm3u8RE, [m3u8Urls, '--auto-select', '--live-pipe-mux', '--save-name', voFilename.replace(".mp4", "")]));
      }
    }
    if(PValue != undefined) {
      console.log('Converting to ASS...');
      tasks.push(new Promise((resolve) => {
        convertToAss(PValue, "vostf");
        resolve();
      }));

      if(PValue.hasOwnProperty("vf") && PValue["vf"].length > 0) {
        forced = true;
        tasks.push(new Promise((resolve) => {
          convertToAss(PValue, "vf", assFileForced);
          resolve();
        }));
      }

      
    }


    await Promise.all(tasks);

    await muxFiles(fileName, isVF, isVostFR, forced);
  } catch (err) {
    console.error('Rip error:', err.message);
  }
})();