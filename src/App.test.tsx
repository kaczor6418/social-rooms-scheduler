import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

test('renders learn react link', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  expect(getByText(/learn/i)).toBeInTheDocument();
});
