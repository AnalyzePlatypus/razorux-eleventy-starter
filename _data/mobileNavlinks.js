module.exports = [
	{
		"label": "About",
		"url": "/#about",
		"cssClasses": ""
	},
	{
		"label": "Learn more",
		"url": "/#learn-more",
		"cssClasses": ""
	},
	{
		"label": "Contact",
		"url": "/#Contact",
		"cssClasses": "border-opacity-0"
	},
	{
		"label": "Start Free Trial",
		"openInNewTab": true,
		"url": "#",
		"cssClasses": "button primary large w-full text-center mb-3 mt-3"
	},
	{
		"label": "Log in",
		"url": "#",
		"cssClasses": "button tertiary large w-full text-center mb-2 border-b-2"
	}, 
].map(item => {
	return {
		...item,
		cssClasses: `text-black opacity-90 hover:opacity-100 bg-white bg-opacity-0 hover:bg-opacity-5 py-3 text-xl pl-3 border-b border-slate-500 border-opacity-20 font-semibold hover:underline ${item.cssClasses}`,
		attributes: ""
	}
})