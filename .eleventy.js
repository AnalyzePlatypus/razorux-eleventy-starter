const Image = require("@11ty/eleventy-img");
const htmlmin = require('html-minifier')

const now = String(Date.now())

const svgContents = require("eleventy-plugin-svg-contents");
const criticalCss = require("eleventy-critical-css");

require('dotenv').config();

async function asyncMap(array, callback) {
  const results = [];
  for (let index = 0; index < array.length; index++) {
    results.push(await callback(array[index], index, array));
  }
  return results;
}

const GAMES = require('./_data/games.json');

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
  options.title = options.title || "Embedded YouTube video";

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


async function imageShortcode({src, alt, widths, cssSizes, cssClass = "", style = "", hasTransparency = false, attributes = {}}) {
  if(src === undefined) return "";

  const formats = hasTransparency ? ['avif', 'webp', 'png' ] : ['avif', 'webp', 'jpg', ]
  let metadata = await Image('.' + src, {
    formats,
    widths,
    urlPath: "/img/generated/",
    outputDir: "./_site/img/generated/",
  });


  let imageAttributes = {
    alt,
    class: cssClass || "",
    style: style || "",
    sizes: cssSizes,
    loading: "lazy",
    decoding: "async",
    ...attributes,
  };

  const pictureElementHtml = Image.generateHTML(metadata, imageAttributes);

  return pictureElementHtml;
}

async function getEleventyImage({src, alt, widths, cssSizes, hasTransparency = false, attributes = {}}) {
  if(src === undefined) return "";

  const formats = hasTransparency ? ['avif', 'webp', 'png' ] : ['avif', 'webp', 'jpg', ]
  
  return await Image('.' + src, {
    formats,
    widths,
    urlPath: "/img/generated/",
    outputDir: "./_site/img/generated/",
  });
}


async function gameImagesListEmbed() {
  const gameIDsAndImageURls = await asyncMap(GAMES, async function(g) {
    return [
      g.id,
      await imageShortcode({
        src: '/images/games/' + g.imageUrl,
        alt: g.title,
        widths: [576, 440, 288, 220, 160, 140],
        cssSizes: '(max-width: 628px) 47w, 288px'
      })
    ]
  })
  
  const dataObject = Object.fromEntries(gameIDsAndImageURls);
  console.log(dataObject);
  
  return JSON.stringify(dataObject);
}

// Under 628px w it's 47w



module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./styles/tailwind.css')
  
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("gameImagesJsonEmbed", gameImagesListEmbed);
  
  eleventyConfig.addNunjucksShortcode("youtube",youtubeEmbed);
  eleventyConfig.addNunjucksShortcode("jsonEmbed",jsonEmbed);
  eleventyConfig.addNunjucksShortcode("env", envEmbed);
  
  eleventyConfig.addShortcode('version', function () { return now })
  
  
  eleventyConfig.addPassthroughCopy("images");
  
  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
    './node_modules/body-scroll-lock/lib/bodyScrollLock.min.js': './js/bodyScrollLock.js',
    './fonts': './fonts',
  })
  

  
  // if(process.env.ELEVENTY_PRODUCTION) eleventyConfig.addPlugin(criticalCss);
  
  eleventyConfig.addPlugin(svgContents);

  

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
