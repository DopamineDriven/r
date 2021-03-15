import { FC } from 'react';
import { DefaultSeo } from 'next-seo';
import config from '../../config/seo.json';
import NextHead from 'next/head';

const Head = () => {
	return (
		<>
			<DefaultSeo {...config} />
			<NextHead>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<meta property={'og:type'} content='website' />
				<meta
					property='og:url'
					content='https://r-weld.vercel.app'
				/>
				<meta property='og:title' content='Subreddit Search' />
				<meta
					property='og:image'
					content='https://og-image.now.sh/%2Fr%2F%3Fq%3Dreq.query.q.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fremojansen%2Flogo.ts%40master%2Fts.svg&images=https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F9rqndpi9iisgalx7bp0z.png'
				/>
				{/* <link rel='manifest' href='' /> */}
			</NextHead>
		</>
	);
};

export default Head;
