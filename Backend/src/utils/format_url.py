import re

def format_url(url : str)-> str :#{
    if not url : return None
    if not is_valid_yt_url(url) : return None
    
    # it search id of video (11 characters alphanumerics, "-" and  "_")
    patron = r'(?:v=|\/)([0-9A-Za-z_-]{11})'
    match = re.search(patron, url)
    
    if match :#{
        video_id = match.group(1)
        return f"https://www.youtube.com/watch?v={video_id}"
    #}
    
    return None
#}


def is_valid_yt_url(url)-> bool :#{
    # Patrones de URL de YouTube válidas
    patrones_validos = [
        r'^https?://(www\.)?youtube\.com/watch\?v=[\w-]{11}',
        r'^https?://(www\.)?youtube\.com/embed/[\w-]{11}',
        r'^https?://(www\.)?youtube\.com/shorts/[\w-]{11}',
        r'^https?://youtu\.be/[\w-]{11}',
    ]
    
    for patron in patrones_validos:
        if re.match(patron, url):
            return True
    
    return False
#}

# test cases
if __name__ == "__main__":#{
    urls = [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "https://youtu.be/dQw4w9WgXcQ",
        "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "https://www.youtube.com/v/dQw4w9WgXcQ",
        "https://www.youtube.com/watch?v=invalid_id",
        "https://www.youtube.com/watch?v=JOUELP4mnCQ&list=RDNdWrR1y-38M&index=1",
        "this is not a url",
        "this is not a url?v=dQw4w9WgXcQ",
    ]
    
    for url in urls :#{
        if is_valid_yt_url(url) :#{
            formatted_url = format_url(url)
            print(f"Original URL: {url} -> Formatted URL: {formatted_url}")
        #}
        else :#{
            print(f"Original URL: {url} -> Invalid YouTube URL")
        #}
    #}
#}