import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import Signup from '../containers/Signup';

it('renders without crashing', () => {
  renderer.create(
      <Signup/>
  )
});
