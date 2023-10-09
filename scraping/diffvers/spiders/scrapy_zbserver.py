import scrapy
import csv
import mysql.connector
from mysql.connector import Error
import pandas as pd
import re

from diffvers.items import DiffversItem

class ScrapyzbServerSpider(scrapy.Spider):
    connection = None 
    name = "scrapy_zbserver"
    allowed_domains = ["zabbix.com"]
    with open("/home/bitnami/mysql_password", "r", encoding="utf-8") as f:
        lines = f.readlines()
    pw = lines[0].strip()
    #print("pw= " + pw)
    
    def start_requests(self):
        with self.create_db_connection("localhost", "diffvers", self.pw, "diffvers") as connection:
            with connection.cursor() as cursor:
                cursor.execute("delete from parameters")

            connection.commit()

        zs = "Zabbix server"
        za = "Zabbix agent (UNIX)"
        list1=["4.0","5.0","6.0","4.0","5.0","6.0"]
        list2=[zs,zs,zs,za,za,za]
        list3=["zabbix_server","zabbix_server","zabbix_server","zabbix_agentd","zabbix_agentd","zabbix_agentd"]
        for i in range(len(list1)):
            request = scrapy.Request("https://www.zabbix.com/documentation/"+list1[i]+"/en/manual/appendix/config/"+list3[i], self.parse)
            request.meta["version"] = list1[i]
            request.meta["process"] = list2[i]

            yield request

    def parse(self, response):

        version = response.meta["version"]
        process = response.meta["process"]
        
        div_tables = response.css('div.table-container')

        #表全てをlist化
        table = div_tables.css('td').getall()
        #listを成型
        rtable = []
        for sb in table:
            s = (re.sub("<a.*?>", "",sb).replace('</a>', ''))
            if '<td colspan="2">' in s:
                text = (s.replace('<td colspan="2">', '').replace('</td>', ''))
                rtable.append(text)
                rtable.append('')
            elif '<td colspan="3">' in s:
                text = (s.replace('<td colspan="3">', '').replace('</td>', ''))
                rtable.append(text)
                rtable.append('')
                rtable.append('')
            elif '<td>' in s:
                text = (s.replace('<td>', '').replace('</td>', ''))
                rtable.append(text)
            else:
                rtable.append(s)
        
        #listを分割
        def split_list(rtable, n):
            for idx in range(0, len(rtable), n):
                yield rtable[idx:idx + n]
        
        ntable = list(split_list(rtable, 5))
        
        #DB投入用に成型
        db = []
        for i in range(len(ntable)):
        #for i in range(2):
            dbh = [0, process, version]
            for j in range(5):
                dbh.insert(len(dbh), ntable[i][j])

            db.append(tuple(dbh))

        #cursor = connection.cursor()
        with self.create_db_connection("localhost", "diffvers", self.pw, "diffvers") as connection:
            with connection.cursor() as cursor:

                sql = ('''
                        INSERT INTO parameters
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                        ''')
        
                cursor.executemany(sql, db)
            connection.commit()

        #yield db
        #result = re.sub("<a.*?>", "", html_string)
        
        #print(result)

        #print(zs4_ntable)
        #print(len(zs4_ntable))
        #print(zs4_ntable[0])
        
        #filename = 'zb' + version + '.csv'
        #with open(filename, 'w') as f:
        #    writer = csv.writer(f)
        #    writer.writerows(db)

        #connection = self.create_db_connection("localhost", "diffvers", self.pw,"diffvers")
        

    def create_db_connection(self, host_name, user_name, user_password, db_name):
        #connection = None
        try:
            connection = mysql.connector.connect(
                host=host_name,
                user=user_name,
                passwd=user_password,
                database=db_name
            )
            print("MySQL Database connection successful")
        except Error as err:
            print(f"Error: '{err}'")

        return connection
    
    #connection = create_db_connection("localhost", "diffvers", pw,"diffvers")

