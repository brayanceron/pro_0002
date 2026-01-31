from mysql.connector import pooling
import mysql.connector.errors
from flask import g

class DatabaseConnection :#{
    _instance = None
    _conection_pool = None

    def __new__(cls) :#{
        if cls._instance is None :#{
            cls._instance = super().__new__(cls)
        #}
        return cls._instance
    #}

    def __init__(self) :#{
        if self._conection_pool is None :#{
            self.connect()
        #}
        print(id(self))
    #}
    
    def connect(self) :#{
        # mysql.connector.errors.DatabaseError
        try :#{
            self._conection_pool = pooling.MySQLConnectionPool(**{
                'pool_name' : 'pool_connection',
                'pool_size' : 32,
                'host' : 'localhost',
                'port' : 3306,
                'database' : 'pro_0002',
                'user' : 'root',
                'password' : '',
                'pool_reset_session' : True,
                # 'reset_session' : False,

                'use_unicode' : True,
                'charset':'utf8mb4',
                'collation':'utf8mb4_unicode_ci',

                'connection_timeout':60,      # Timeout para establecer conexión
                'auth_plugin':'mysql_native_password'
            })
        #}
        except Exception as err:#{
            print(err)
            print(type(err))
            print("Could not connect to the database")
            self._conection_pool = None
        #}
    #}

    # def get_global_connection(self) :#{
    def get_connection(self) :#{
        if not self._conection_pool : raise mysql.connector.errors.DatabaseError("Connections pool is None, there was a problem with the conecction")
        conn = self._conection_pool.get_connection()
        return conn
        
    #}

    # def get_connection(self) :#{
    def get_global_connection(self) :#{ 
        if not self._conection_pool : raise mysql.connector.errors.DatabaseError("Connections pool is None, there was a problem with the conecction")
        if (not "conn" in g) : g.conn = self._conection_pool.get_connection()
        return g.conn
    #}

    def close_global_connection(self) :#{
        conn = g.pop("db", None)
        if conn is not None: conn.close()
    #}
    

#}

# def exec(self, query : str, params : list[str], fetchone = False) :#{
    #     # if not self._conection_pool : return None
    #     try :#{
    #         conn = self.get_connection()
    #         cur = conn.cursor()
    #         cur.execute(query, params)
            
    #         rows = None
    #         if fetchone : rows = cur.fetchone()
    #         else : rows = cur.fetchall()

    #         rowcount = cur.rowcount()

    #         conn.close()
    #         return rows
    #     #}
    #     except :#{
    #         pass
    #     #}
        
    # #}