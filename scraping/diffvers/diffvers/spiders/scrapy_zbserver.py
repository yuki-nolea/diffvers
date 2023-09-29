import scrapy
import csv
import mysql.connector
from mysql.connector import Error
import pandas as pd

from diffvers.items import DiffversItem

class ScrapyzbServerSpider(scrapy.Spider):
    name = "scrapy_zbserver"
    allowed_domains = ["zabbix.com"]
    with open("/home/bitnami/mysql_password", "r", encoding="utf-8") as f:
        lines = f.readlines()
    pw = lines[0].strip()
    #print("user= " + user)
    #print("pw= " + pw)
    
    def start_requests(self):
        yield scrapy.Request("https://www.zabbix.com/documentation/6.0/en/manual/appendix/config/zabbix_server", self.parse6)
        #yield scrapy.Request("https://www.zabbix.com/documentation/6.0/en/manual/appendix/config/zabbix_agentd", self.parse6)
        yield scrapy.Request("https://www.zabbix.com/documentation/5.0/en/manual/appendix/config/zabbix_server", self.parse5)
        #yield scrapy.Request("https://www.zabbix.com/documentation/5.0/en/manual/appendix/config/zabbix_agentd", self.parse5)
        yield scrapy.Request("https://www.zabbix.com/documentation/4.0/en/manual/appendix/config/zabbix_server", self.parse4)
        #yield scrapy.Request("https://www.zabbix.com/documentation/4.0/en/manual/appendix/config/zabbix_agentd", self.parse4)

    def parse4(self, response):

        zs4_div_tables = response.css('div.table-container')

        #表全てをlist化
        zs4_table = zs4_div_tables.css('td').getall()
        #listを成型
        zs4_rtable = []
        for s in zs4_table:
            if '<td colspan="2">' in s:
                text = (s.replace('<td colspan="2">', '').replace('</td>', ''))
                zs4_rtable.append(text)
                zs4_rtable.append('')
            elif '<td colspan="3">' in s:
                text = (s.replace('<td colspan="3">', '').replace('</td>', ''))
                zs4_rtable.append(text)
                zs4_rtable.append('')
                zs4_rtable.append('')
            elif '<td>' in s:
                text = (s.replace('<td>', '').replace('</td>', ''))
                zs4_rtable.append(text)
            else:
                zs4_rtable.append(s)

        #listを分割
        def split_list(zs4_rtable, n):
            for idx in range(0, len(zs4_rtable), n):
                yield zs4_rtable[idx:idx + n]
        
        zs4_ntable = list(split_list(zs4_rtable, 5))
        
        #DB投入用に成型
        db_4 = []
        for i in range(len(zs4_ntable)):
        #for i in range(2):
            db4h = [0, "zabbix server", "4.0"]
            for j in range(5):
                db4h.insert(len(db4h), zs4_ntable[i][j])

            db_4.append(db4h)

        #print(zs4_ntable)
        #print(len(zs4_ntable))
        #print(zs4_ntable[0])

        #with open('zb4.csv', 'w') as f:
        #    writer = csv.writer(f)
        #    writer.writerows(db_4)
    
    def parse5(self, response):

        zs5_div_tables = response.css('div.table-container')

        #表全てをlist化
        zs5_rtable = []
        zs5_table = zs5_div_tables.css('td').getall()
        #listを成型
        for s in zs5_table:
            if '<td colspan="2">' in s:
                text = (s.replace('<td colspan="2">', '').replace('</td>', ''))
                zs5_rtable.append(text)
                zs5_rtable.append('')
            elif '<td colspan="3">' in s:
                text = (s.replace('<td colspan="3">', '').replace('</td>', ''))
                zs5_rtable.append(text)
                zs5_rtable.append('')
                zs5_rtable.append('')
            elif '<td>' in s:
                text = (s.replace('<td>', '').replace('</td>', ''))
                zs5_rtable.append(text)
            else:
                zs5_rtable.append(s)

        #listを分割
        def split_list(zs5_rtable, n):
            for idx in range(0, len(zs5_rtable), n):
                yield zs5_rtable[idx:idx + n]
        
        zs5_ntable = list(split_list(zs5_rtable, 5))

        #DB投入用に成型
        db_5 = []
        for i in range(len(zs5_ntable)):
        #for i in range(2):
            db5h = [0, "zabbix server", "5.0"]
            for j in range(5):
                db5h.insert(len(db5h), zs5_ntable[i][j])

            db_5.append(db5h)

        #print(zs5_ntable)
        #print(len(zs5_ntable))
        #print(zs5_ntable[0])

        #with open('zb5.csv', 'w') as f:
        #    writer = csv.writer(f)
        #    writer.writerows(db_5)


    def parse6(self, response):

        zs6_div_tables = response.css('div.table-container')

        #表全てをlist化
        zs6_table = zs6_div_tables.css('td').getall()
        #listを成型
        zs6_rtable = []
        for s in zs6_table:
            if '<td colspan="2">' in s:
                text = (s.replace('<td colspan="2">', '').replace('</td>', ''))
                zs6_rtable.append(text)
                zs6_rtable.append('')
            elif '<td colspan="3">' in s:
                text = (s.replace('<td colspan="3">', '').replace('</td>', ''))
                zs6_rtable.append(text)
                zs6_rtable.append('')
                zs6_rtable.append('')
            elif '<td>' in s:
                text = (s.replace('<td>', '').replace('</td>', ''))
                zs6_rtable.append(text)
            else:
                zs6_rtable.append(s)

        #listを分割
        def split_list(zs6_rtable, n):
            for idx in range(0, len(zs6_rtable), n):
                yield zs6_rtable[idx:idx + n]
        
        zs6_ntable = list(split_list(zs6_rtable, 5))
        
        #DB投入用に成型
        db_6 = []
        for i in range(len(zs6_ntable)):
        #for i in range(2):
            dbh = [0, "zabbix server", "6.0"]
            for j in range(5):
                dbh.insert(len(dbh), zs6_ntable[i][j])

            db_6.append(dbh)
        
        #print(zs6_ntable)
        #print(len(zs6_ntable))
        #print(zs6_ntable[0])
        #print(db_6)
        #with open('zb6.csv', 'w') as f:
        #    writer = csv.writer(f)
        #    writer.writerows(db_6)
        

    def create_db_connection(host_name, user_name, user_password, db_name):
        connection = None
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
    

    connection = create_db_connection("localhost", "diffvers", pw,"diffvers")

