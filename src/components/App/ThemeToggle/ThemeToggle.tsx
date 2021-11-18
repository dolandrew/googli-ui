import React from "react";
import { DarkThemeIcon, LightThemeIcon } from "../../../images";

interface Props {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeToggle = ({theme, setTheme}: Props) => {

  const toggleTheme = () => {
    if (theme === '#FFFFFF') {
      setTheme('#1E1E1E');
    }
    if (theme ==='#1E1E1E') {
      setTheme('#FFFFFF');
    }
  }

  return (
    <>
      { theme === '#1E1E1E' ?
        <LightThemeIcon data-testid='light-theme-toggle' onClick={toggleTheme} />
        :
        <DarkThemeIcon data-testid='dark-theme-toggle' onClick={toggleTheme} />
      }
    </>
  );
}

export default ThemeToggle;
