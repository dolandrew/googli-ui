import ThemeToggle from "./ThemeToggle";
import { render, fireEvent, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { wait } from "@testing-library/user-event/dist/utils";

const setTheme = jest.fn()

test('clicking the dark theme toggle button fires an event', () => {
  const { getByTestId } = render(<ThemeToggle theme={'#FFFFFF'} setTheme={setTheme} />);
  const darkThemeToggle = getByTestId('dark-theme-toggle');

  fireEvent.click(darkThemeToggle);

  expect(setTheme.mock.calls.length).toBe(1);
});

test('clicking the light theme toggle button fires an event', () => {
  const { getByTestId } = render(<ThemeToggle theme={'#1E1E1E'} setTheme={setTheme} />);
  const lightThemeToggle = getByTestId('light-theme-toggle');

  fireEvent.click(lightThemeToggle);

  expect(setTheme.mock.calls.length).toBe(1);
});


test('clicking the light theme toggle button switches the button', async () => {
  const { getByTestId, queryByTestId } = render(<ThemeToggle theme={'#1E1E1E'} setTheme={setTheme} />);
  const lightThemeToggle = getByTestId('light-theme-toggle');
  const darkThemeToggle = queryByTestId('dark-theme-toggle');


  userEvent.click(lightThemeToggle);


});
