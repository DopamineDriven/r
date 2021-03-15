import Head from 'next/head';

const MetaData = () => {
	return (
		<>
			<Head>
				<link
					rel='apple-touch-icon'
					type='img/png'
					sizes='180x180'
					href='/assets/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='96x96'
					href='/assets/favicon-96x96.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/assets/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/assets/favicon-16x16.png'
				/>
				<meta charSet='utf-8' />
				<link
					rel='stylesheet'
					href='https://use.typekit.net/cub6off.css'
				/>
				<link
					rel='stylesheet'
					href='https://rsms.me/inter/inter.css'
				/>
				<link rel='manifest' href='/assets/site.webmanifest' />
				<link
					rel='mask-icon'
					href='/assets/safari-pinned-tab.svg'
					color='#000000'
				/>
				<link rel='shortcut icon' href='/assets/favicon.ico' />
				<link rel='canonical' href={'https://r-weld.vercel.app'} />
				<meta name='robots' content='/robots.txt' />
				<meta
					name='viewport'
					content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5'
				/>
				<meta name='format-detection' content='telephone=no' />
				<title>{'/r/q?req.query.q -- Subreddit Search'}</title>
				<meta name='msapplication-TileColor' content='#2B5797' />
				<meta
					name='msapplication-config'
					content='/assets/browserconfig.xml'
				/>
				<meta name='theme-color' content='#000000' />
				{/* <link rel='alternate' type='application/rss+xml' href='/feed.xml' /> */}
				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta
					name='keywords'
					content='nextjs, typescript, react, incremental static site generation, /r/, reddit, subreddit, tailwindcss, vercel, snoowrap, not an aardvark, tsx, reddit app, subreddit app'
				/>
				<meta name='twitter:card' content='summary_large_image' />
				<meta
					name='twitter:title'
					content='Subreddit Search - /r/q?=req.query.q'
				/>
				<meta
					name='twitter:description'
					content={
						'/r/q?=req.query.q -- Subreddit Search powered by Nextjs, TypeScript, Tailwindcss, Reddit, Vercel, and Snoowrap via Not an Aardvark. /r/q?=req.query.q. Search Reddit in real-time with rapid data-fetching'
					}
				/>
				<meta
					name='twitter:image'
					content={
						'https://og-image.now.sh/%2Fr%2F%3Fq%3Dreq.query.q.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fremojansen%2Flogo.ts%40master%2Fts.svg&images=https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F9rqndpi9iisgalx7bp0z.png'
					}
				/>
				<meta property='og:type' content='website' />
				<meta
					property='og:url'
					content='https://r-weld.vercel.app'
				/>
				<meta property='og:title' content='Subreddit Search' />
				<meta
					property='og:description'
					content={
						'q?=req.query.q - Subreddit Search powered by Nextjs, TypeScript, Tailwindcss, Reddit, Vercel, and Snoowrap via Not an Aardvark. /r/q?=req.query.q. Search Reddit in real-time with rapid data-fetching'
					}
				/>
				<meta
					property='og:image'
					content={
						'https://og-image.now.sh/%2Fr%2F%3Fq%3Dreq.query.q.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fremojansen%2Flogo.ts%40master%2Fts.svg&images=https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F9rqndpi9iisgalx7bp0z.png'
					}
				/>
				<meta property='og:image:width' content='2048' />
				<meta property='og:image:height' content='1170' />
			</Head>
		</>
	);
};

export default MetaData;
