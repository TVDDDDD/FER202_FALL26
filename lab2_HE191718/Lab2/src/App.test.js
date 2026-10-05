import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the movie manager app', () => {
  render(<App />);
  expect(screen.getByText(/mini movie manager/i)).toBeInTheDocument();
  expect(screen.getByRole('searchbox', { name: /tìm kiếm phim/i })).toBeInTheDocument();
});
