import { render } from "@testing-library/react";
import App from "./App";

test('renders logo', () => {
  const wrapper = render(<App />);
  const phishLogo = wrapper.getByTestId('logo');

  expect(phishLogo).toBeInTheDocument();
});

