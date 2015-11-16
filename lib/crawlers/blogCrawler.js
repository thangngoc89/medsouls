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
        let content = $(this).find(".post-body");
            ["style","class","border","itemprop","imageanchor"].forEach(function(attr){
              content.find("[" + attr + "]").removeAttr(attr);
            });
            content = content.html()

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
					content: content,
          markdown: markdown,
					tags: tags,
					date: date
				};

				createNewBlogDocument(data);

				return data;
			}).get();
		})
		.then(function(data) {
			if(data.length > 0 && i == 0) {
        let lastDate = data[data.length-1].date;
        let nextUrl = 'http://medsouls.blogspot.com/search?max-results=10&updated-max='+lastDate;
				i++;
				scraper(nextUrl);
			} else {
				console.log('Done');
			}
		});
};

var createNewBlogDocument = (data) => {
  let newBlog = new Blog(data);
  newBlog.save(function(err) {
    if (err) throw err;

    console.log('Created new blog: ' + newBlog.title);
  });
};

scraper('http://medsouls.blogspot.com/');