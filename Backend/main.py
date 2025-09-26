from src.app import app
from pathlib import Path
import os

if __name__ == '__main__' :#{
    PROJECT_ROOT_PATH = Path(__file__).parent.resolve()
    os.environ['PROJECT_ROOT_PATH'] = str(PROJECT_ROOT_PATH)
    app.run(port = 5000, debug = True);
#}
