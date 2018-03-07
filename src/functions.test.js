// Import test functions from external file. 
const functions = require('./functions.js');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// Functions to be tested.
it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('Simple test to see if Jest config is working. Should return true', () => {
    expect(functions.returnTrue()).toBe(true);
});

test('Tests query to MovieDB API. Response should be an object with data.', () => {
    expect(functions.getRequest()).toBe("object");
});

test('Tests query to MovieDB API. Response should contain an array with data.', () => {
    expect(functions.getRequest()).not.toBe(0);
});

test('Tests genres.js file to see if data is imported correctly.', () => {
    expect(functions.getGenres()).not.toBe(0)
})

  

