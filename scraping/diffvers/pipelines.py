# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class DiffversPipeline:
    def process_item(self, item, spider):
        return item

class ZabbixServerPipeline:
    def process_item(self, item, spider):
        if spider.name not in ['scrapy_zbserver']:
            return item
        yield item

class ZabbixAgentPipeline:
    def process_item(self, item, spider):
        if spider.name not in ['scrapy_zbagent']:
            return item

        yield item
