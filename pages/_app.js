import '../styles/globals.scss';
import 'antd/dist/antd.css';
import Layout from '../components/layouts';
import { PullstateProvider } from 'pullstate';
import { useHydrate } from '../stores';

function MyApp({ Component, pageProps }) {
	const instance = useHydrate(pageProps.snapshot);

	return (
		<PullstateProvider instance={instance}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</PullstateProvider>
	);
}

export default MyApp;
