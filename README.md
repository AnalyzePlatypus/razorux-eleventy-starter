# Eleventy Starter

My personal starter for [Eleventy](https://www.11ty.dev) sites.

## [📱 Live demo ›](https://razorux-eleventy-starter.netlify.app/)

## Features

*Performance*
* 100% Lighthouse score
* Optimized Font Loading (self-hosted Google Fonts)
* Optimized Image loading (`<picture>` with `avif` & `webp`)
* Cache-busting with `?=version`
* Optimized Netlify build time with the Netlify Cache plugin
* [Quicklink](https://github.com/GoogleChromeLabs/quicklink)

*Robustness*
* Asset Retry

*SEO ready*
* SEO ready with OpenGraph & Twitter meta tags
* Open Graph card image & Favicon ready
* SEO with JSON-LD

*Embedding:*
* JSON embedding
* YouTube embedding
* ENV VAR embedding
* SVG embedding

## Included libraries
* [Tailwind CSS](https://tailwindcss.com)
* [Alpine.js](https://alpinejs.dev) JS microframework
* [Phosphor](https://phosphoricons.com) icons

*Eleventy Plugins*
* [`nbsp`](https://github.com/jeremenichelli/eleventy-nbsp-filter#readme) filter
* [Emoji Read Time](https://github.com/5t3ph/eleventy-plugin-emoji-readtime)

*Monitoring:*
* [Fathom Analytics](http://usefathom.com) privacy-respecting analytics
* [Honeybadger](http://honeybadger.io) error monitoring
* [Fullstory](https://www.fullstory.com) simulated video monitoring


## Launch checklist

* Set up [Honeybadger deploy tracking](https://docs.honeybadger.io/lib/javascript/guides/tracking-deploys/)


## To-do
- [ ] Update `site.webmanifest` from `seo.json`
- [ ] Fix footer
- [ ] Fix JSON-LD for FAQs (diy's in the front matter of `index.njk`)



## Components
- [x] Hero
- [x] Navbar
- [x] Sticky navbar
- [x] Mega bullets
- [x] Article CTA
- [x] FAQ - [NEW] - collapsable on mobile!
- [x] Footer
- [x] Footer social links
- [x] Footer links
- [x] Footer link badges
- [x] Mailing list signup
- [x] Mobile Menu toggle
- [x] Mobile Menu
- [ ] Section background images
- [ ] Navbar dropdown
- [ ] Navbar mega dropdown
- [ ] Slider with lightbox
- [ ] Gallery
- [ ] Logo Cloud
- [ ] Testimonial cloud
- [ ] Contact Us
- [ ] Contact Form
- [ ] Blog snippets
- [ ] Blog page
- [ ] Search

## Someday

- [ ] [Service Worker?](https://www.npmjs.com/package/eleventy-plugin-pwa)


### Other
- [x] Auto-updating copyright year
- [x] Open Graph image
- [x] Favicons


## Getting Started

1. Copy `.env.example`. Rename to `.env`, then fill out all values.
2. Generate Favicons with https://realfavicongenerator.net. Place the files in `/public`
3. Run fonts through https://google-webfonts-helper.herokuapp.com and add them to `/fonts`.
Then update `styles/tailwind.config.js` to use the new font.

## Other features

### Canonical URLs

To add a [canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) to a blog post, add the `canonicalUrl` property to your front matter.


## Thank You

* Original theme by [Greg Wolanski](https://gregwolanski.com)


## License

MIT

See `LICENSE` for more information.
