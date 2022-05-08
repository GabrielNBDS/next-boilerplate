import { Switch, useMantineColorScheme } from '@mantine/core'

export default function ToggleThemeButton() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	return (
		<Switch
			checked={dark}
			onClick={() => toggleColorScheme()}
			label="Dark theme"
		/>
	)
}
