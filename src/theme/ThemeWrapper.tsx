import { FC } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './index';

/**
 *
 * @param Component A component you'd like to wrap in the new theme
 * @param theme defaults to theme, but can supply another
 */
export function ThemeWrapper<T>(Component: FC<T>, themeSwitch = () => theme) {
  return (props: T) => (
    <ThemeProvider theme={themeSwitch()}>
      <CssBaseline>{<Component {...props} />}</CssBaseline>
    </ThemeProvider>
  );
}
