import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const View = document.createElement('View');
  ReactDOM.render(<App />, View);
  ReactDOM.unmountComponentAtNode(View);
});
