const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: !!process.env.ANALYZE
});

module.exports = withBundleAnalyzer({
	webpack(
		config,
		{
			isDev = process.env.NODE_ENV === 'development',
			isServer = typeof window === 'undefined'
		}
	) {
		if (isServer) {
			require('./scripts/generate-sitemap');
		}
		/**
		 * !isDev ? preact/compat : react, react-dom on build
		 * reduce page "weight" in production
		 */
		if (!isDev && !isServer) {
			Object.assign(
				(config.resolve.alias['@/'] = path.resolve('./')),
				{
					react: 'preact/compat',
					'react-dom': 'preact/compat'
				}
			);
		}
		config.module.rules.push({
			test: /\.ya?ml$/,
			type: 'json',
			use: 'yaml-loader'
		});

		return config;
	},
	sourceMaps: {
		productionBrowserSourceMaps: true
	},
	// max allowed domains 50 -- 🤦  -- no wildcards, even for subdomains
	images: {
		domains: [
			'a.thumbs.redditmedia.com',
			'b.thumbs.redditmedia.com',
			'cdn.embedly.com',
			'earthsky.org',
			'external-preview.redd.it',
			'flickr.com',
			'i.imgur.com',
			'i.redd.it',
			'i.reddit.com',
			'imgur.com',
			'live.staticflickr.com',
			'media.giphy.com',
			'media0.giphy.com',
			'media1.giphy.com',
			'media2.giphy.com',
			'media3.giphy.com',
			'media4.giphy.com',
			'media5.giphy.com',
			// 'not-an-aardvark.github.io',
			'preview.redd.it',
			'raw.githubusercontent.com',
			'reddit.com',
			'redditmedia.com',
			'styles.redditmedia.com',
			'v.redd.it',
			'www.a.thumbs.redditmedia.com',
			'www.b.thumbs.redditmedia.com',
			'www.cdn.embedly.com',
			'www.external-preview.redd.it',
			'www.i.imgur.com',
			'www.i.redd.it',
			'www.i.reddit.com',
			'www.imgur.com',
			'www.live.staticflickr.com',
			'www.media.giphy.com',
			'www.media0.giphy.com',
			'www.media1.giphy.com',
			'www.media2.giphy.com',
			'www.media3.giphy.com',
			'www.media4.giphy.com',
			'www.media5.giphy.com',
			// 'www.not-an-aardvark.github.io',
			'www.preview.redd.it',
			'www.raw.githubusercontent.com',
			'www.reddit.com',
			'www.redditmedia.com',
			'www.styles.redditmedia.com',
			'www.v.redd.it',
			'youtu.be',
			'www.youtube.com',
			'youtube.com'
		]
	}
});
