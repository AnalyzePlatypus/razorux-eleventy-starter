const fs = require('fs');
require('dotenv').config();

const Image = require("@11ty/eleventy-img");
const htmlmin = require('html-minifier')
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

const markdownIt = require("markdown-it");

const now = String(Date.now())

const svgContents = require("eleventy-plugin-svg-contents");
const schema = require("@quasibit/eleventy-plugin-schema");

const nbspFilter = require('eleventy-nbsp-filter')
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const pluginPWA = require("eleventy-plugin-pwa");

const asyncMap = require('./scripts/util.js')
 
const {jsonEmbed, envEmbed, youtubeEmbed, imageShortcode, getEleventyImage, fathomTrackClick, link} = require('razorux-eleventy-tools');

const { renderSection: sectionShortcode }  = require('./section.js');

const numberOfWordsToJoin = 5
const maxLength = 10

const FATHOM_IDS = require('./_data/fathomIds')

// Custom plugins


const md = new markdownIt({ html: true });

function markdownFilter(content) {
  return md.render(content);
};


module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./styles/tailwind.css')
  eleventyConfig.addWatchTarget('./404.njk')
  
  eleventyConfig.addFilter('nbsp', nbspFilter(numberOfWordsToJoin, maxLength));
  
  eleventyConfig.addPlugin(emojiReadTime);
  eleventyConfig.addPlugin(schema);
  eleventyConfig.addPlugin(svgContents);
  // eleventyConfig.addPlugin(pluginPWA);
  
  eleventyConfig.addShortcode('version', function () { return now })
  
  
  eleventyConfig.addNunjucksShortcode("jsonEmbed",jsonEmbed);
  eleventyConfig.addNunjucksShortcode("env", envEmbed);
  eleventyConfig.addNunjucksShortcode("youtube",youtubeEmbed);
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksShortcode("fathomTrackClick", fathomTrackClick);
  eleventyConfig.addPairedNunjucksShortcode("link", link({
    fathomIds: FATHOM_IDS
  }));
  
  eleventyConfig.addPairedAsyncShortcode("section", sectionShortcode);
  
  eleventyConfig.addNunjucksShortcode("markdownRender", markdownFilter);
  
  
  
  
  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
    "./node_modules/@alpinejs/collapse/dist/cdn.min.js": './js/alpinejs-collapse.js',
    './node_modules/@alpinejs/focus/dist/cdn.min.js': './js/alpinejs-focus.js',
    './node_modules/body-scroll-lock/lib/bodyScrollLock.min.js': './js/bodyScrollLock.js',
    // "./node_modules/@alpinejs/collapse/dist/cdn.min.js": './js/alpine-collapse.js',
    
    "./node_modules/rellax/rellax.min.js": './js/rellax.min.js',
    // 
    // './node_modules/aos/dist/aos.js': './js/aos.js',
    // './node_modules/aos/dist/aos.css': './aos.css',
    // 
    // './node_modules/@glidejs/glide/dist/glide.min.js': './js/glide.min.js',
    // './node_modules/@glidejs/glide/dist/css/glide.core.min.css': './glide.core.min.css',
    // './node_modules/@glidejs/glide/dist/css/glide.theme.min.css': './glide.theme.min.css',
    // './node_modules/@glidejs/glide/dist/css/glide.theme.min.css.map': './glide.theme.min.css.map',
    // 
    // 
    './node_modules/vanilla-cookieconsent/dist/cookieconsent.js': './cookieconsent.js',
    './node_modules/vanilla-cookieconsent/dist/cookieconsent.css': './cookieconsent.css',
    
    './fonts': './fonts',
    "./images": "./images",
    "./node_modules/quicklink/dist/quicklink.umd.js": "./js/quicklink.js",
    "public": '/'
  })
    

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })
  
  eleventyConfig.addPlugin(sitemap, {
    // Name of the property for the last modification date.
    // By default it is undefined and the plugin will fallback to `date`.
    // When set, the plugin will try to use this property and it will fallback
    // to the `date` property when needed.
    // lastModifiedProperty: "modified",
  
    sitemap: {
      // Options for SitemapStream. See https://github.com/ekalinin/sitemap.js/blob/master/api.md#sitemapstream
      // Hostname is needed when the URLs of the items don't include it.
      hostname: "https://gurumedia.com",
    },
  });
  
  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');
  
        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

}
