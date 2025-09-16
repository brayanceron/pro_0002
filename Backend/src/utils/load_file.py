# from uuid import 
from uuid import uuid4
from werkzeug.datastructures.file_storage import FileStorage

ROUTE = 'D:\\DEV\\PROJECTS\\pro_0002\\Backend\\store\\'

def load_file(file : FileStorage, prefix : str = 'file') -> str | None :#{
    try :#{
        file_id = uuid4().hex
        name_file = f"{str(prefix)}_{file_id}.{file.mimetype.split('/')[1]}"

        file.save(f'{ROUTE}{name_file}')
        # file.save()

        # print("-------")
        # print(file)
        # print(type(file))
        # pf =open(f"copy_{name_file}", 'wb')
        # pf.write(file)
        # pf.close()
        # bytes

        return name_file
    #}
    except Exception as err :#{
        print(err)
        return None
    #}
#}

def load_file2(file : FileStorage, prefix : str = 'file') -> str | None :#{
    try :#{
        bits_file = file.stream.read()
        file_id = uuid4().hex
        name_file = f"{str(prefix)}_{file_id}.{file.mimetype.split('/')[1]}"
    
        new_file = open(f"{ROUTE}copy_{name_file}", 'wb')
        new_file.write(bits_file)
        new_file.close()
    #}
    except Exception as err :#{
        print(err)
        return None
    #}
#}
