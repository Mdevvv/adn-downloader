import json, re



def parse_txt_to_ass(txt_file, ass_file):
    
    with open(txt_file, 'r', encoding='utf-8') as f:
        # Concaténer toutes les lignes en une seule chaîne
        json_string = ''.join(f.readlines())

    data = json.loads(json_string)
    
    subs = data[next(iter(data))]
    
    ssa = []
    
    def convert_time_format(time_str):
        # Convertir la chaîne en un nombre flottant
        seconds_float = float(time_str)
        
        # Extraire les heures, minutes, secondes et millisecondes
        hours = int(seconds_float // 3600)
        minutes = int((seconds_float % 3600) // 60)
        seconds = int(seconds_float % 60)
        milliseconds = int((seconds_float - int(seconds_float)) * 100)
        
        # Formater le temps dans le format '0,0:00:01.41'
        formatted_time = f"{hours:1}:{minutes:02}:{seconds:02}.{milliseconds:02}"
        
        return formatted_time

    style = [
            "Leftbot", "Default", "Rightbot",
             "Leftmid", "Midmid", "Rightmid",
             "Lefttop", "Midtop", "Righttop"
            ]
    
    def getIndexAlign(curr):
        weights = ["start", "middle", "end"]
        width = weights.index(curr["positionAlign"])
        height = weights.index(curr["lineAlign"]) * 3

        return style[width + height]
    
    def replace_unicode_sequences(text) -> str:
        # Utiliser une expression régulière pour trouver les séquences Unicode
        unicode_pattern = re.compile(r'\\u([0-9a-fA-F]{4})')
        
        def decode_unicode(match):
            # Convertir la séquence Unicode en caractère UTF-8
            return chr(int(match.group(1), 16))
    
        # Remplacer toutes les séquences Unicode par leurs caractères UTF-8
        return unicode_pattern.sub(decode_unicode, text)

    def textRefractor(curr):
        return replace_unicode_sequences(curr["text"]).replace("\n", "\\N").replace("<i>", "{\\i1}").replace("</i>", "{\\i0}").replace("<b>", "{\\b1}").replace("</b>", "{\\b0}").replace("<u>", "{\\u1}").replace("</u>", "{\\u0}")

    for curr in subs:
        ssa.append("Dialogue: 0," + convert_time_format(curr["startTime"]) + "," + convert_time_format(curr["endTime"]) + ","+ getIndexAlign(curr) +",,0,0,0,," + textRefractor(curr))

    with open(ass_file, 'w', encoding='utf-8') as f:
        f.write(
"""[Script Info]
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
""")

        for i in ssa:
            f.write(i)
            f.write("\n")
if __name__ == "__main__":
    parse_txt_to_ass('sub.txt', 'subtitles.ass')