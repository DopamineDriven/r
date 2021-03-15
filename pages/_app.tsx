import '../styles/index.css';
import '../styles/chrome-bug.css';
import 'keen-slider/keen-slider.min.css';

import { AppProps, NextWebVitalsMetric } from 'next/app';
import { useEffect, FC } from 'react';
import { MediaContextProvider } from '../lib/artsy-fresnel';
import { Head } from '../components/Head';
// import { ManagedGlobalContext } from '../components/Context/index';
const Noop: FC = ({ children }) => <>{children}</>;

function NextApp({ Component, pageProps }: AppProps) {
	// Istanbul === jest ignore ? kept getting hung up on the appeneded Layout
	/* istanbul ignore next */
	const Layout = (Component as any).Layout || Noop;

	// remove css class preventing chrome "popping" on initial load
	useEffect(() => {
		document.body.classList?.remove('loading');
	}, []);

	return (
		<>
			<Head />
			<MediaContextProvider>
				<Layout pageProps={pageProps}>
					<Component {...pageProps} />
				</Layout>
			</MediaContextProvider>
		</>
	);
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
	console.debug(metric);
}

export default NextApp;
