import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Log In button', () => {
  const { container } = render(<App />);
  console.log(container.innerHTML);
  const loginButton = screen.getByText('Log In', { exact: false, ignoreCase: true });
  expect(loginButton).toBeInTheDocument();
});
