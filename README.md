# ADN Video Downloader

A tool for downloading videos from Animation Digital Network (ADN) using a premium account. This software allows you to obtain videos in the best possible quality with multiple audio tracks and subtitles if available.

<img src="https://i.imgur.com/PVNS7QU.gif" title="" alt="exemple" width="750">

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
  - [Windows Users](#windows-users)
  - [Arch Linux Users](#arch-linux-users)
- [Usage](#usage)
- [License](#license)

## Features

- Download videos from ADN using your premium account.
- Supports multiple audio tracks (VO, VOSTFR, VF).
- Subtitle support for better accessibility.
- Outputs the best quality video available.
- Video links in the format: `https://animationdigitalnetwork.com/video/id-name/id-episode-nb`

## Requirements

- [ffmpeg](https://www.ffmpeg.org/)
- [N_m3u8DL-RE](https://github.com/rofl0r/n_m3u8DL-RE)
- [Node.js](https://nodejs.org/) (with npm)
- [Puppeteer](https://pptr.dev/)
- Google Chrome (Windows) or [Chromium](https://archlinux.org/packages/extra/x86_64/chromium/) (Arch Linux)

## Installation

### Windows Users

1. Ensure you have chrome installed.

2. Download the latest release for Windows from the [releases page](https://github.com/your-repo/releases).

3. After downloading, proceed to install Puppeteer using npm:
   
   ```bash
   npm install puppeteer
   ```

### Arch Linux Users

1. Download the appropriate release.

2. Execute the `requirements.sh` script:
   
   ```
   chmod +x requirements.sh
   
   ./requirements.sh
   ```

3. If everything goes well, you are all set!

## Usage

1. Authenticate with your ADN premium account.
2. Use the video link format: `https://animationdigitalnetwork.com/video/id-name/id-episode-nb`.
3. Run the script to download the desired video.
