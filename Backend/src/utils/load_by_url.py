# from requests import 
import http.client





image_url = "https://icon-library.com/images/singer-icon/singer-icon-1.jpg"
# image_url = "https://cdn-icons-png.flaticon.com/512/195/195128.png"
# image_url = "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
# image_url = "https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp"


def load_by_url(url : str, name_file : str = "loaded_file") :#{
    split_url = url.split('/')
    host = split_url[2]
    path = '/'+'/'.join(split_url[3:])

    conn = http.client.HTTPSConnection(host, 443)

    conn.request('GET', path)

    response = conn.getresponse()
    status = response.status
    print(status)
    if(200 < status > 299) : #{
        print("Error at response")
        return 
    #}
    headers = dict(response.getheaders())
    content_type = headers.get('Content-Type')
    format_file = content_type.split('/')[1]

    data = response.read()


    with (open(f'{name_file}.{format_file}', 'wb') as file) :#{
        file.write(data)
        print("file saved successfully")
    #}
#}

load_by_url(image_url)
