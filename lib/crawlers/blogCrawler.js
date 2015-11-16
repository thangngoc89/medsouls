"use strict";
var Blog = require('../../app/models/Blog');
var scraperjs = require('scraperjs');
var stringUtils = require('../../utils/stringUtils');
var toMarkdown = require('to-markdown');

var i = 0;
var scraper = (url) => {
  console.log('Scraping page ' + i);
	console.log('===============================');

	scraperjs.StaticScraper.create(url)
		.scrape(function($) {
			return $(".post-outer").map(function() {
        let title = $(this).find(".post-title > a");
        let image = $(this).find("meta[itemprop='image_url']").attr("content");

        let content = $(this).find(".post-body").html();

        // Remove all tags but keep content inside except <a> and <img> tags
        // To only remove attributes replace with <$2>
        // https://regex101.com/r/aS1dS2/5
        content = content.replace(/<(?!(a|img|br)\s)([a-z][a-z0-9]*)[^>]*?(.*?)>/gi, '')
                          .replace(/<\/(div|span|b|p)>/g, '')  // Remove all end tags
                          .replace(/\n/g,"<br />")  // Replace EOL with <br /> tag
                          .split("(Click the link")[0];

        let date = $(this).find(".published[itemprop='datePublished']").attr("title");
        let tags = $(this).find(".post-labels").text()
                  .replace(/\n/g,"") // Remove all EOL
                  .replace("Labels:","");
        tags = stringUtils.stringToArray(tags);

        let markdown = toMarkdown(content);

        let data =  {
					title: title.text(),
          link: title.attr('href'),
					image: image,
					//content: content,
          markdown: markdown,
					tags: tags,
					date: date
				};

				createNewBlogDocument(data);

				return data;
			}).get();
		})
		.then(function(data) {
			if(data.length > 0 && data != null) {
        let lastDate = data[data.length-1].date;
        let nextUrl = 'http://medsouls.blogspot.com/search?max-results=10&updated-max='+lastDate;
				i++;
				scraper(nextUrl);
			} else {
        data = null;
				console.log('Done');
			}
		});
};

var createNewBlogDocument = (data) => {

  let newBlog = new Blog(data);
  newBlog.save(function(err) {
    if (err) {
      console.error('There is a error ' + err);
    }

    console.log('Created new blog: ' + newBlog.title);
  });
};

scraper('http://medsouls.blogspot.com/');