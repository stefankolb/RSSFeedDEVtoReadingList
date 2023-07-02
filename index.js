/**
 * A script to create an RSS feed for the articles you saved to your DEV.to Reading List.
 */

/** ============================================================================
    IMPORTS
    ========================================================================= */

import fs from 'fs';
import { Feed } from 'feed';


/** ============================================================================
    CONFIGURATION
    ========================================================================= */

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

// DO NOT EDIT THESE VALUES!

const API_URL_READING_LIST = 'https://dev.to/api/readinglist';

const FEED_FAVICON = 'https://dev-to.s3.us-east-2.amazonaws.com/favicon.ico';
const FEED_OUTPUT_PATH = 'build';


/** ============================================================================
    HELPER
    ========================================================================= */

/**
 * Fetches the articles the user saved to their DEV.to Reading List
 *
 * @return {Promise<Array>} A list of articles saved to the Reading List
 * @throws Error Will throw if list of articles cannot be fetched
 */
const fetchReadingList = () => fetch(
  API_URL_READING_LIST, {
    headers: {
      accept: 'application/vnd.forem.api-v1+json',
      'api-key': API_KEY,
      'content-type': 'application/json',
    }
  }
).then(
  response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Not able to download reading list articles: ${response.statusText} [${response.status}]`);
  }
);

/**
 * Creates an RSS feed for the articles provided
 *
 * @param {Array} data List of articles
 * @return {Feed} The created RSS feed
 */
const createRSSFeed = data => {
  const feed = new Feed({
    title: FEED_TITLE,
    description: FEED_DESCRIPTION,
    id: FEED_ID,
    link: FEED_ID,
    favicon: FEED_FAVICON,
    author: FEED_AUTHOR
  });

  data.forEach(item => {
    const feedItem = {
      title: item.article.title,
      id: item.article.url,
      link: item.article.url,
      description: item.article.description,
      date: new Date(item.article.published_at)
    };

    if (item.article.cover_image) {
      feedItem.image = item.article.cover_image;
    } else if (item.article.social_image) {
      feedItem.image = item.article.social_image;
    }

    feed.addItem(feedItem);
  });

  return feed[FEED_TYPE]();
};


/**
 * Writes the RSS feed to the filesystem using the format specified
 * in FEED_TYPE (see configuration above).
 *
 * @param {Feed} feed An RSS feed
 * @throws {Error} Will throw if feed cannot be written to filesystem
 */
const writeRSSFeed = feed => {
  const outputPath = `${FEED_OUTPUT_PATH}/${FEED_OUTPUT_FILE[FEED_TYPE]}`;
  try {
    if (fs.existsSync(FEED_OUTPUT_PATH) === false) {
      fs.mkdirSync(FEED_OUTPUT_PATH);
    }
    fs.writeFileSync(outputPath, feed);
  } catch (e) {
    throw new Error(`Was not able to write feed to "${outputPath}":\r\n${e}`);
  };
}


/** ============================================================================
    MAIN
    ========================================================================= */

fetchReadingList().then(
  data => {
    if (!data || data.length === 0) {
      console.warn('No articles available -> Exiting');
      process.exit(0);
    }

    const rssFeed = createRSSFeed(data);
    writeRSSFeed(rssFeed);
  }
).catch(
  e => {
    console.error(e);
    process.exit(1);
  }
);
