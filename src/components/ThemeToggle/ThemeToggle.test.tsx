import ThemeToggle from "./ThemeToggle";
import { fireEvent, render } from "@testing-library/react";
import Theme from "../../interfaces/Theme";

const setTheme = jest.fn()

test('clicking the dark theme toggle button fires an event', () => {
  const { getByTestId } = render(<ThemeToggle theme={Theme.BG_LIGHT} setTheme={setTheme} />);
  const darkThemeToggle = getByTestId('dark-theme-toggle');

  fireEvent.click(darkThemeToggle);

  expect(setTheme.mock.calls.length).toBe(1);
});

test('clicking the light theme toggle button fires an event', () => {
  const { getByTestId } = render(<ThemeToggle theme={Theme.BG_DARK} setTheme={setTheme} />);
  const lightThemeToggle = getByTestId('light-theme-toggle');

  fireEvent.click(lightThemeToggle);

  expect(setTheme.mock.calls.length).toBe(1);
});

