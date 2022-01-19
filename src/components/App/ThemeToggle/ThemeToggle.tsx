import React from "react";
import { DarkThemeIcon, LightThemeIcon } from "../../../images";
import Theme from "../../../interfaces/Theme";

interface Props {
  theme: Theme.BG_DARK | Theme.BG_LIGHT;
  setTheme: (theme: Theme.BG_DARK | Theme.BG_LIGHT) => void;
}

const ThemeToggle = ({theme, setTheme}: Props) => {

  const toggleTheme = () => {
    if (theme === Theme.BG_LIGHT) {
      setTheme(Theme.BG_DARK);
    }
    if (theme === Theme.BG_DARK) {
      setTheme(Theme.BG_LIGHT);
    }
  }

  return (
    <>
      { theme === Theme.BG_DARK ?
        <LightThemeIcon data-testid='light-theme-toggle' onClick={toggleTheme} />
        :
        <DarkThemeIcon data-testid='dark-theme-toggle' onClick={toggleTheme} />
      }
    </>
  );
}

export default ThemeToggle;
