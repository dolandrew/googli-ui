import Theme from "../interfaces/Theme";

const useThemeToggle = (theme: string) => {
  let textTheme= '';
  let linkStyles = '';

  theme === Theme.BG_DARK ? textTheme = Theme.TEXT_DARK : textTheme = Theme.TEXT_LIGHT;
  theme === Theme.BG_DARK ? linkStyles = Theme.LINK_DARK : '';

  return { textTheme, linkStyles };
}

export default useThemeToggle;
