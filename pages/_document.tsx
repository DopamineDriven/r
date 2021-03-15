import Document, {
	Head,
	Html,
	Main,
	NextScript,
	DocumentContext
} from 'next/document';
import { mediaStyles } from '@/lib/artsy-fresnel';
class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}
	render() {
		return (
			<Html lang='en-US'>
				<Head>
					<meta charSet='utf-8' />
					{/* <link
						rel='stylesheet'
						href='https://use.typekit.net/cub6off.css'
					/> */}
					<link
						rel='stylesheet'
						href='https://rsms.me/inter/inter.css'
					/>
					<link rel='shortcut icon' href='/assets/favicon.ico' />
					<style
						type='text/css'
						dangerouslySetInnerHTML={{ __html: mediaStyles }}
					/>
				</Head>
				<body className='loading'>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
