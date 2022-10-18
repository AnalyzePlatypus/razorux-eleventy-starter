# Eleventy Starter

My personal starter for [Eleventy](https://www.11ty.dev) sites.

## [📱 Live demo ›](https://razorux-eleventy-starter.netlify.app/)

## Features

*Performance*
* 100% Lighthouse score
* Optimized Font Loading (self-hosted Google Fonts)
* Optimized Image loading (`<picture>` with `avif` & `webp`)
* Cache-busting with `?=version`
* Asset Retry
* Optimized Netlify build time with the Netlify Cache plugin

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

*Monitoring:*
* [Fathom Analytics](http://usefathom.com) privacy-respecting analytics
* [Honeybadger](http://honeybadger.io) error monitoring
* [Fullstory](https://www.fullstory.com) simulated video monitoring



## To-do
- [ ] Update `site.webmanifest` from `seo.json`
- [ ] Fix footer
- [ ] Fix JSON-LD for FAQs (iy's in the front matter of `index.njk`)

## Components
- [x] Hero
- [x] Navbar
- [x] Sticky navbar
- [x] Mega bullets
- [x] Article CTA
- [x] FAQ
- [x] Footer
- [x] Footer social links
- [x] Footer links
- [x] Footer link badges
- [x] Mailing list signup
- [x] Mobile Menu toggle
- [ ] Section background images
- [ ] Mobile Menu
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


### Other
- [ ] Auto-updating copyright year


## Getting Started

1. Copy `.env.example`. Rename to `.env`, then fill out all values.
2. Generate Favicons with https://realfavicongenerator.net. Place the files in `/public`
3. Run fonts through https://google-webfonts-helper.herokuapp.com and add them to `/fonts`
4. 


## Thank You

* Original theme by [Greg Wolanski](https://gregwolanski.com)


## License

MIT

See `LICENSE` for more information.
