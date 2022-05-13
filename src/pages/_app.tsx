import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { AppProps } from 'next/app'
import { getCookie, setCookies } from 'cookies-next'
import {
	MantineProvider,
	ColorScheme,
	ColorSchemeProvider
} from '@mantine/core'
import SWRProvider from '../hooks/swr'

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props
	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		props.colorScheme
	)

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme =
			value || (colorScheme === 'dark' ? 'light' : 'dark')

		setColorScheme(nextColorScheme)

		// when color scheme is updated save it to cookie
		setCookies(
			'mantine-color-scheme',
			nextColorScheme, { maxAge: 60 * 60 * 24 * 30 } // 30 days
		)
	}

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<SWRProvider>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme,
					}}
				>
					<Component {...pageProps} />
				</MantineProvider>
			</SWRProvider>
		</ColorSchemeProvider>
	)
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	// get color scheme from cookie
	colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
})
