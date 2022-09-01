const htmlmin = require('html-minifier')

const now = String(Date.now())

const svgContents = require("eleventy-plugin-svg-contents");

require('dotenv').config();

// Custom plugins

function jsonEmbed(obj) {
  return JSON.stringify(obj);
}

function envEmbed(varName) {
  const value =  process.env[varName];
  return value || `Unable to find env var ${varName}`;
}


function youtubeEmbed(id, options) {
  // Build the string, using config data as we go
  // unique ID based on youtube video id

  options.allowFullscreen = true;
  options.noCookie = true;
  options.lazy = true;
  options.enableSuggestedVideos = false;

  let out =
    '<div id="' + id + '" ';
  // global class name for all embeds, use this for styling
  out += 'class="' + options.embedClass + '"';
  // intrinsic aspect ratio; currently hard-coded to 16:9
  // TODO: make configurable somehow
  out += 'style="position:relative;width:100%;padding-top: 56.25%;">';
  out +=
    '<iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" ';
  out += 'width="100%" height="100%" frameborder="0" title="Embedded YouTube video" ';
  out += 'src="https://www.';
  // default to nocookie domain
  out += options.noCookie ? "youtube-nocookie" : "youtube";
  out += '.com/embed/';
  out += id;
  // autoplay is _technically_ possible, but be cool, don't do this
  out += options.allowAutoplay ? '?autoplay=1' : '';
  out += '" ';
  // configurable allow attributes
  out += 'allow="' + options.allowAttrs + '"';
  // configurable fullscreen capability
  out += options.allowFullscreen ? ' allowfullscreen' : '';
  //configurable iframe lazy-loading
  out += options.lazy ? ' loading="lazy"' : '';
  out += options.enableSuggestedVideos ? '' : 'rel=0';
  out += '></iframe></div>';
  return out;
}



module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./styles/tailwind.css')
  
  eleventyConfig.addNunjucksShortcode("youtube",youtubeEmbed);
  eleventyConfig.addNunjucksShortcode("jsonEmbed",jsonEmbed);
  eleventyConfig.addNunjucksShortcode("env", envEmbed);

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
  })
  

  eleventyConfig.addShortcode('version', function () {
    return now
  })
  
  eleventyConfig.addPlugin(svgContents);

  eleventyConfig.addPassthroughCopy("images");

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
}
