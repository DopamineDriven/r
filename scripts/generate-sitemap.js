const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');

(async () => {
	const prettierConfig = await prettier.resolveConfig(
		'../.prettierrc'
	);
	const pages = await globby([
		'pages/*.js',
		'pages/*.jsx', // jsx: preserve -- keeps jsx as part of outpiut to be consumed by another step (babel)
		'pages/*.tsx',
		'!pages/_*.tsx',
		'!pages/_*.ts',
		'!pages/api'
	]);

	const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${pages
			.map(page => {
				const path = page
					.replace('pages', '')
					.replace('.tsx', '')
					.replace('.jsx', '')
					.replace('.ts', '')
					.replace('.js', '');
				const route = path === '/index' ? '' : path;

				return `
					<url>
						<loc>${`https://subreddit-search.vercel.app${route}`}</loc>
					</url>
				`;
			})
			.join('')}
	</urlset>
    `;

	const formatted = prettier.format(sitemap, {
		...prettierConfig,
		parser: 'html'
	});

	// eslint-disable-next-line no-sync
	fs.writeFileSync('public/sitemap.xml', formatted);
})();
