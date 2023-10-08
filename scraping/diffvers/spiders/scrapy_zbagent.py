import scrapy
import csv
import mysql.connector
from mysql.connector import Error
import pandas as pd

from diffvers.items import DiffversItem

class ScrapyzbAgentSpider(scrapy.Spider):
    db_4 = []
    db_5 = []
    db_6 = []
    name = "scrapy_zbagent"
    allowed_domains = ["zabbix.com"]
    with open("/home/bitnami/mysql_password", "r", encoding="utf-8") as f:
        lines = f.readlines()
    pw = lines[0].strip()
    #print("pw= " + pw)
    
    def start_requests(self):
        yield scrapy.Request("https://www.zabbix.com/documentation/6.0/en/manual/appendix/config/zabbix_agentd", self.parse6)
        yield scrapy.Request("https://www.zabbix.com/documentation/5.0/en/manual/appendix/config/zabbix_agentd", self.parse5)
        yield scrapy.Request("https://www.zabbix.com/documentation/4.0/en/manual/appendix/config/zabbix_agentd", self.parse4)


    def parse4(self, response):

        za4_div_tables = response.css('div.table-container')

        #表全てをlist化
        za4_table = za4_div_tables.css('td').getall()
        #listを成型
        za4_rtable = []
        for s in za4_table:
            if '<td colspan="2">' in s:
                text = (s.replace('<td colspan="2">', '').replace('</td>', ''))
                za4_rtable.append(text)
                za4_rtable.append('')
            elif '<td colspan="3">' in s:
                text = (s.replace('<td colspan="3">', '').replace('</td>', ''))
                za4_rtable.append(text)
                za4_rtable.append('')
                za4_rtable.append('')
            elif '<td>' in s:
                text = (s.replace('<td>', '').replace('</td>', ''))
                za4_rtable.append(text)
            else:
                za4_rtable.append(s)

        #listを分割
        def split_list(za4_rtable, n):
            for idx in range(0, len(za4_rtable), n):
                yield za4_rtable[idx:idx + n]
        
        za4_ntable = list(split_list(za4_rtable, 5))
        
        #DB投入用に成型
        db_4 = []
        for i in range(len(za4_ntable)):
        #for i in range(2):
            db4h = [0, "zabbix agent", "4.0"]
            for j in range(5):
                db4h.insert(len(db4h), za4_ntable[i][j])

            db_4.append(db4h)

        yield db_4

        #print(za4_ntable)
        #print(len(za4_ntable))
        #print(za4_ntable[0])

        #with open('za4.csv', 'w') as f:
        #    writer = csv.writer(f)
        #    writer.writerows(db_4)
    
    def parse5(self, response):

        za5_div_tables = response.css('div.table-container')

        #表全てをlist化
        za5_rtable = []
        za5_table = za5_div_tables.css('td').getall()
        #listを成型
        for s in za5_table:
            if '<td colspan="2">' in s:
                text = (s.replace('<td colspan="2">', '').replace('</td>', ''))
                za5_rtable.append(text)
                za5_rtable.append('')
            elif '<td colspan="3">' in s:
                text = (s.replace('<td colspan="3">', '').replace('</td>', ''))
                za5_rtable.append(text)
                za5_rtable.append('')
                za5_rtable.append('')
            elif '<td>' in s:
                text = (s.replace('<td>', '').replace('</td>', ''))
                za5_rtable.append(text)
            else:
                za5_rtable.append(s)

        #listを分割
        def split_list(za5_rtable, n):
            for idx in range(0, len(za5_rtable), n):
                yield za5_rtable[idx:idx + n]
        
        za5_ntable = list(split_list(za5_rtable, 5))

        #DB投入用に成型
        db_5 = []
        for i in range(len(za5_ntable)):
        #for i in range(2):
            db5h = [0, "zabbix agent", "5.0"]
            for j in range(5):
                db5h.insert(len(db5h), za5_ntable[i][j])

            db_5.append(db5h)
        
        yield db_5

        #print(za5_ntable)
        #print(len(za5_ntable))
        #print(za5_ntable[0])

        #with open('za5.csv', 'w') as f:
        #    writer = csv.writer(f)
        #    writer.writerows(db_5)


    def parse6(self, response):

        za6_div_tables = response.css('div.table-container')

        #表全てをlist化
        za6_table = za6_div_tables.css('td').getall()
        #listを成型
        za6_rtable = []
        for s in za6_table:
            if '<td colspan="2">' in s:
                text = (s.replace('<td colspan="2">', '').replace('</td>', ''))
                za6_rtable.append(text)
                za6_rtable.append('')
            elif '<td colspan="3">' in s:
                text = (s.replace('<td colspan="3">', '').replace('</td>', ''))
                za6_rtable.append(text)
                za6_rtable.append('')
                za6_rtable.append('')
            elif '<td>' in s:
                text = (s.replace('<td>', '').replace('</td>', ''))
                za6_rtable.append(text)
            else:
                za6_rtable.append(s)

        #listを分割
        def split_list(za6_rtable, n):
            for idx in range(0, len(za6_rtable), n):
                yield za6_rtable[idx:idx + n]
        
        za6_ntable = list(split_list(za6_rtable, 5))
        
        #DB投入用に成型
        db_6 = []
        for i in range(len(za6_ntable)):
        #for i in range(2):
            dbh = [0, "zabbix agent", "6.0"]
            for j in range(5):
                dbh.insert(len(dbh), za6_ntable[i][j])

            db_6.append(dbh)

        yield db_6
        
        #print(za6_ntable)
        #print(len(za6_ntable))
        #print(za6_ntable[0])
        #print(db_6)
        with open('za6.csv', 'w') as f:
            writer = csv.writer(f)
            writer.writerows(db_6)
        
        #connection = create_db_connection("localhost", "diffvers", pw,"diffvers")
        

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
    

    #connection = create_db_connection("localhost", "diffvers", pw,"diffvers")

    #for i in scrapy.Request():
    #    print("d6= "+db6)
