var Blog = rootRequire('app/models/blog');
var scraperjs = require('scraperjs');

var i = 0;
var scraper = (url) => {
	console.log('Scraping page ' + i);
	console.log('===============================');

	scraperjs.StaticScraper.create(url)
		.scrape(function($) {
			return $(".post-outer").map(function() {
				let title = $(this).find(".post-title > a").text();
				let image = $(this).find("meta[itemprop='image_url']").attr("content");
				let content = $(this).find(".post-body").html();
				let date = $(this).find(".published[itemprop='datePublished']").attr("title");
				let tags = $(this).find(".post-labels").text()
					.replace(/\n/g,"") // Remove all EOL
					.replace("Labels:","");

				let data =  {
					title: title,
					image: image,
					content: content,
					tags: tags,
					date: date
				};

				createNewBlogDocument(data);

				return data;
			}).get();
		})
		.then(function(data) {
			if(data.length > 0) {
				var lastDate = data[data.length-1].date;
				var nextUrl = 'http://medsouls.blogspot.com/search?max-results=10&updated-max='+lastDate;
				i++;
				scraper(nextUrl);
			} else {
				console.log('Done');
			}
		});
};

var createNewBlogDocument = (data) => {
	var blog = new Blog(data);

	blog.save(function(err) {
		if (err)
			res.send(err);

		console.log('Created new blog: ' + blog.title);
	});
};

scraper('http://medsouls.blogspot.com/');