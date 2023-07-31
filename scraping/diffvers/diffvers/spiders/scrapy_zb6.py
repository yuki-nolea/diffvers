import scrapy

from diffvers.items import DiffversItem

class ScrapyZb6Spider(scrapy.Spider):
    name = "scrapy_zb6"
    allowed_domains = ["zabbix.com"]
    #allowed_domains = ['quotes.toscrape.com']
    start_urls = ["https://www.zabbix.com/documentation/6.0/en/manual/appendix/config/zabbix_server"]
    #start_urls = ['http://quotes.toscrape.com/page/1/']

    def parse(self, response):

        #レスポンスに対するパース処理
        #post in response.css('.post-listing .post-time')
        #item = DiffversItem()
        #item['url']=post.css('div.post-header a::attrs(href)').extract_first()
        #item['title']=post.css('div.post-header a::text').extract_first()
        #item['date']=post.css('div.post-header span.date a::text').extract_first()
        print(response.text)
