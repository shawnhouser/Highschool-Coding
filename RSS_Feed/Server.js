var http = require('http');
var request = require('request');
var server = require("nodejs-websocket").createServer(function (connection) {
    console.log("New connection")
    downloadURLs(urls, function(urlResponses){
        var feedString = JSON.stringify(simplifyFeeds(urlResponses));
        connection.sendText(
            feedString
        );
    });

    connection.on("close", (code, reason) => console.log("Connection closed"));
});
server.listen(8080);





var urls = [
    "http://www.smbc-comics.com/rss.php",
    "https://xkcd.com/atom.xml",
    "https://www.youtube.com/feeds/videos.xml?channel_id=UCmu9PVIZBk-ZCi-Sk2F2utA"
];
function simplifyFeeds(feeds){
    function parseFeed(feed){
        var isRSS = Object.keys(currentFeed)[0] == 'rss';
        var returnFeedInfo = {};
        var feedInfo = isRSS ? feed.rss.channel[0] : feed.feed;

        returnFeedInfo.title = feedInfo.title[0];
        returnFeedInfo.link = isRSS ? feedInfo.link[0] : feedInfo.link[0]['$'].href;
        var entryInfos = feedInfo[isRSS ? 'item' : 'entry'];
        returnFeedInfo.entries = [];
        for(var i in entryInfos){
            var currentEntryInfo = entryInfos[i];
            var currentEntry = {};
            currentEntry.title = currentEntryInfo.title[0];
            currentEntry.date = "";
            if(isRSS){
                currentEntry.date = currentEntryInfo['pubDate'];
            } else {
                if(currentEntryInfo['published']){
                    currentEntry.date = currentEntryInfo['published'][0];
                } else {
                    currentEntry.date = currentEntryInfo['updated'][0];
                }
            }
            currentEntry.time = Date.parse(currentEntry.date);
            currentEntry.updated = new Date(currentEntry.time)
            currentEntry.link = isRSS ? currentEntryInfo.link[0] : currentEntryInfo.link[0]['$'].href;
            
            currentEntry.parentLink = returnFeedInfo.link;
            currentEntry.parentTitle = returnFeedInfo.title;
            returnFeedInfo.entries.push(currentEntry);
        }
        return returnFeedInfo;
    }

    var usefulFeeds = [];
    for(var i in feeds){
        var currentFeed = feeds[i];
        usefulFeeds.push(parseFeed(currentFeed));
    }
    return usefulFeeds;
}
function downloadURLs(urls, callback){
    var parseString = require('xml2js').parseString;
    var parsedURLs = 0;
    var responses = [];
    for(let i in urls){
        let currentURL = urls[i];
        request(currentURL, function(requestError, response, xmlBody){
            parseString(xmlBody, function(parseError, paresedJSON){
                responses.push(paresedJSON);
                if(++parsedURLs == urls.length){
                    callback(responses);
                }
            })
        });
    }
}


