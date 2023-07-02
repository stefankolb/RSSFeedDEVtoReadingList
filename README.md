# DEV.to ReadingList RSS Feed

Create an RSS feed for the articles you saved to your DEV.to Reading List.
A blog post with a thorough explanation can be found at [DEV.to](https://dev.to/stefankolb/create-an-rss-feed-for-your-devto-reading-list-2poc) and my [personal blog](https://blog.stefankolb.de/posts/dev-3-rss-feed-of-dev-to-reading-list).


## Prerequisites

You need to have [Node.js](https://nodejs.org) installed. All code in this repo was last tested with version 19.8.1.


## Setup

* Clone (or fork and then clone) this repository. Either use the git URL to this repository or your fork, e.g:

```shell
[/] $> git clone git@github.com:stefankolb/RSSFeedDEVtoReadingList.git
```

* Install dependencies

If you use NPM:

```shell
[/] $> cd RSSFeedDEVtoReadingList
[/RSSFeedDEVtoReadingList] $> npm install
```

If you use Yarn:

```shell
[/] $> cd RSSFeedDEVtoReadingList
[/RSSFeedDEVtoReadingList] $> yarn
```


## Configuration

Open `index.js` and adjust the configuration values at the top of the file. Do **NOT** change other configuration values.

```js
// Your DEV.to API key
const API_KEY = '';

// The title of the RSS feed, e.g. 'My DEV.to Reading List'
const FEED_TITLE = 'My DEV.to Reading List';

// The description of the RSS feed, e.g. 'A feed for all articles that I saved to my DEV.to Reading List'
const FEED_DESCRIPTION = 'A feed for all articles that I saved to my DEV.to Reading List';

// The RSS feed's ID, e.g. 'https://dev.to/<YOUR_DEV_TO_USERNAME>/
const FEED_ID = ''

// The RSS feed's author information, i.e. your name, email and website
const FEED_AUTHOR = {
  name: '',
  email: '',
  link: ''
};

// The RSS feed's format. Possible values: 'rss2', 'atom1' or 'json1'
const FEED_TYPE = 'rss2';

// The file to which the RSS feed should be written to, e.g. 'feed.xml' or 'feed.json'
const FEED_OUTPUT_FILE = {
  rss2: 'feed.xml',
  atom1: 'atom.xml',
  json1: 'feed.json'
};
```


## Build

Run the build script to create the RSS feed file. Depending on the feed type you configured, this will create a file in `/RSSFeedDEVtoReadingList/build/<YOUR_FEED_FILE>`.

If you use NPM:

```shell
[/RSSFeedDEVtoReadingList] $> npm run build:rss-feed
```
If you use Yarn:

```shell
[/RSSFeedDEVtoReadingList] $> yarn run build:rss-feed
```

Or you can call the script directly:

```shell
[/RSSFeedDEVtoReadingList] $> node index.js
```


## Deploy

Copy the generated file to a location that is accessible via the web. You can then add the URL to this file to your favorite RSS feed reader.

You can automate running the Node.js script and copying the output to a folder by using the `run.sh` Bash script. Open `run.sh` and set the `<PATH_TO_WEB_SERVER_FOLDER>`. Save the file and make it executable:

```shell
[/RSSFeedDEVtoReadingList] $> chmod +x run.sh
```

You can also add an entry into the configuration for Cron, Anacron, Cronie - or whatever you are using for scheduling tasks - and execute the `run.sh` Bash script, for example, every 60 minutes:

```shell
# Example for Cron; script runs every 60 minutes
0 * * * * /PATH/TO/run.sh
```
