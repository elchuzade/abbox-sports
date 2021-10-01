import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import App from './App';

test('renders App', () => {
  render(<Provider store={store}><Router><App /></Router></Provider>);
  const linkElement = screen.getByTestId('App');
  expect(linkElement).toBeInTheDocument();
});
