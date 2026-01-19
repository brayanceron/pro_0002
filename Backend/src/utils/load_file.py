import os
from pathlib import Path
from uuid import uuid4
from werkzeug.datastructures.file_storage import FileStorage

def load_file(file : FileStorage, sub_folders : list = [], prefix : str = 'file') -> str | None :#{
    if not isinstance(file, FileStorage) : return None

    # BUG Review special characters of subfolders
    # BUG validate file is image, theirs mimetype must be : png, jpeg, jpg, webp...
    
    try :#{
        file_id = uuid4().hex
        name_file = f"{str(prefix)}_{file_id}.{file.mimetype.split('/')[1]}"

        STORE_ROUTE = Path(os.environ.get('PROJECT_ROOT_PATH')) / "store"
        RELATIVE_ROUTE = Path(*sub_folders) / name_file
        FULL_ROUTE = STORE_ROUTE / RELATIVE_ROUTE

        RELATIVE_FOLDER_ROUTE = FULL_ROUTE.parent.resolve()
        if (not RELATIVE_FOLDER_ROUTE.exists()): os.makedirs(RELATIVE_FOLDER_ROUTE)

        file.save(FULL_ROUTE)
        return str(RELATIVE_ROUTE.as_posix())
    #}
    except Exception as err :#{
        print(err)
        return None
    #}
#}


# def load_file2(file : FileStorage, prefix : str = 'file') -> str | None :#{
#     try :#{
#         bits_file = file.stream.read()
#         file_id = uuid4().hex
#         name_file = f"{str(prefix)}_{file_id}.{file.mimetype.split('/')[1]}"
    
#         new_file = open(f"{ROUTE}copy_{name_file}", 'wb')
#         new_file.write(bits_file)
#         new_file.close()
#     #}
#     except Exception as err :#{
#         print(err)
#         return None
#     #}
# #}
