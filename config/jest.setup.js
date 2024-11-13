import '@testing-library/jest-dom';
import React from 'react';
import * as structuredClone from '@ungap/structured-clone'; 

global.React = React;

global.structuredClone = structuredClone.default

global.matchMedia = jest.fn().mockImplementation(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));