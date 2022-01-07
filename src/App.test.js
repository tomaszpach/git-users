import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from './App';

import exampleData from './exampleData.json';

test('render and check basic App parts', () => {
  render(<App />);
  const h1Element = screen.getByText(/Git search/i);
  const h4Element = screen.getByText(/Search input/i);
  const searchInput = screen.getByPlaceholderText("Search for git users...")

  userEvent.type(searchInput, 'tomaszpach')


  expect(h1Element).toBeInTheDocument();
  expect(h4Element).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue('tomaszpach');
});

const server = setupServer(
    rest.get('https://api.github.com/search/users?q=tomasz&per_page=50', (req, res, ctx) => {
      return res(ctx.json(exampleData))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('load example data and check if rendered', async () => {
  render(<App />)

  const searchInput = screen.getByPlaceholderText("Search for git users...");

  userEvent.type(searchInput, 'tomaszpach');

  await screen.findByText('Users found:');
  screen.getByText('Users found:');

  expect(screen.queryAllByTestId('tileHref')).toHaveLength(2);
})
