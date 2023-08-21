const merge = require('lodash.merge');
const get = require('lodash.get');
const { clone, randomNumberBetween } = require('razorux-js-utils');

const {jsonEmbed, envEmbed, youtubeEmbed, imageEmbed, getEleventyImage, fathomTrackClick, link} = require('razorux-eleventy-tools');


const DFFAULT_SETTINGS = {
	height: 'auto', // 'full', 'custom'
	width: 'auto', // 'full', 'custom'
	
	padding: {
		x: 0,
		y: 0,
	},
	
	content: {
		css: ""
	},
	
	anchorId: "",
	
	background: {
		css: "",
		color: "",
		gradient: "",
		image: {
			enabled: false,
			url: "",
			css: "",
			opacity: 1,
			croppingPriority: {
				x: 0,
				y: 0
			},
			parallax: {
				enabled: false,
				speed: 1,
				fixed: false,
			}
		},
		video: {
			enabled: false,
			url: "",
			css: "",
			opacity: 1,
		},
		svgTile: {
			enabled: false,
			url: "",
			css: "",
			opacity: 1,
		},
		overlay: {
			color: "",
			gradient: "",
			opacity: "",
			css: ""
		},
	},
	
	section: {
		colorThemeName: "",
		sectionClipping: {
			shapeName: "",
			params: {}
		},
		css: ""
	},
}

const siteSettings = {
	sectionMaxWidth: 1800,
}

async function renderSection(content, settings) {
	const mergedSettings = merge(clone({}), settings);
	
	const s = keyPath => get(mergedSettings, keyPath);
	
	const id = settings.id || randomNumberBetween(0, Number.MAX_SAFE_INTEGER);
	
	
	const imageBackgroundHtml = await generateImageBackgroundHtml(mergedSettings);
	
	const imageOverlayHtml = generateBackgroundOverlayHtml(mergedSettings);
	
	const html = `
		<section id='${ id }' class='w-full relative z-0 overflow-hidden ${ s("background.css") }'>
			<article class='relative z-20 max-w-6xl mx-auto px-6 py-12 sm:py-24 ${ s('content.css') }'>		
				${ content }
			</article>
			
			${imageOverlayHtml}
			
			${imageBackgroundHtml }
		</section>
	`;
	
	
	return html;
	
	
	return "";
}

const IMAGE_WIDTHS = {
	FULL_DISPLAY_WIDTHS: [320, 640, 1280, 1536, 3072] 
}

const CSS_SIZES = {
	FULL_DISPLAY_WIDTH: ['100vw']
}

async function generateImageBackgroundHtml(mergedSettings) {
	const imageBackgroundIsEnabled = get(mergedSettings, 'background.image.enabled');
	if(!imageBackgroundIsEnabled) return "";
	
	// src, alt, widths, cssSizes, cssClass = "", style = "", hasTransparency = false, attributes = {}, remote = false
	
	
	const attributes = get(mergedSettings, 'background.image.attributes');
	const cssClasses = get(mergedSettings, 'background.image.css');
	
	const opacityValue = get(mergedSettings, 'background.image.opacity') || 1;
	const opacityClass = "opacity-" + (opacityValue * 100); // translate from percentages to Tailwind values (i.e. 0.2 -> 20, 1 -> 100)
	
	const imageTagArgs = {
		src: get(mergedSettings, 'background.image.url'),
		alt: get(mergedSettings, 'background.image.alt') || 'A background image',
		widths: IMAGE_WIDTHS.FULL_DISPLAY_WIDTHS,
		cssSizes: CSS_SIZES.FULL_DISPLAY_WIDTH,
		hasTransparency: false,
		cssClass: `${cssClasses}`
	}
	
	
	const pictureTag = await imageEmbed(imageTagArgs);
	
	return `
		<div class='absolute inset-0 z-0 ${opacityClass}' ${attributes}>
			${pictureTag}
		</div>
	`
}

function generateBackgroundOverlayHtml(mergedSettings) {
	const isEnabled = get(mergedSettings, 'background.overlay.enabled');
	if(!isEnabled) return "";
	
	const opacityValue = get(mergedSettings, 'background.overlay.opacity') || 1;
	const opacityClass = "opacity-" + (opacityValue * 100);
	
	const cssClass = get(mergedSettings, 'background.overlay.css');
		
	return `
		<div class='absolute inset-0 z-10 ${opacityClass} ${cssClass}'>
		</div>
	`
}

/*
Width (default, full, custom)
Height (auto, full height, hardcoded)
Horiz padding override
Vertical padding override

Background (color, gradient, SVG tiles, image, video, code inject, opacity)
Background area-of-interest cropping (ie, if you need to crop, prioritize showing this specific area.) 
Background overlay (color, gradient, image, opacity)
Background parallax (with auto-calculated zooming)
Placed ornaments

Section color theme
Section edge clipping (straight, slanted, SVG)
Section scroll animation 
Content scroll animation

With override settings for each breakpoint. 
With CSS and Style injects for every element. 

*/

exports.renderSection = renderSection; 