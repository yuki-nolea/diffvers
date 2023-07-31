import scrapy


class ScrapyZb6Spider(scrapy.Spider):
    name = "scrapy_zb6"
    allowed_domains = ["www.zabbix.com"]
    start_urls = ["https://www.zabbix.com/documentation/6.0/en/manual/appendix/config/zabbix_server"]

    def parse(self, response):
        
        #レスポンスに対するパース処理
        for post in response.css('.post-listing .post-time'):
            yield Post(
                url=post.css('div.post-header a::attr(href)').extract_first().strip(),
                title=post.css('div.post-header a::text').extract_first().strip(),
                date=post.css('div.post-header span.date a::text').extract_first().strip(),
            )
