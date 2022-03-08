import { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import SWRProvider from '../hooks/swr'

export default function App({ Component, pageProps}: AppProps) {
	return (
		<SWRProvider>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'light',
				}}
			>
				<Component {...pageProps} />
			</MantineProvider>
		</SWRProvider>
	)
}
