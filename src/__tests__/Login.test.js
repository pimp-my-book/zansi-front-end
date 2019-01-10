import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import Login from '../containers/Login';

it('renders without crashing', () => {
  renderer.create(
      <Login/>
  )
});
