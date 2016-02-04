import React from 'react';
import ReactDOM from 'react-dom/dist/react-dom';
import TestUtils from 'react-addons-test-utils';
import Reinput from '../index';
// import should from 'should';
import chai from 'chai';
/* eslint-disable no-undef */
describe('Reinput', () => {
  const reinput = TestUtils.renderIntoDocument(
    <Reinput
      pattern={/^(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,4})?$/}
      separator=" "
      mask="1111 1111 1111 1111"
      placeholder="_"
    />
  );
  const expect = chai.expect;
  const reinputNode = ReactDOM.findDOMNode(reinput);
  it('Renders Reinput element with placeholders', () => {
    /* eslint-enable no-undef */
    // check initial render to be correct
    expect(reinputNode.value).to.equal('____ ____ ____ ____');
  });
  it('Checks whether class is changed correctly', () => {
    // simulate focus and check whether classes changed correctly
    TestUtils.Simulate.focus(reinputNode);
    const hasClass = TestUtils.scryRenderedDOMComponentsWithClass(reinput, 'react-reinput');
    expect(hasClass.length).to.equal(1);
  });
  it('Simulates incorrect input', () => {
    reinput.handleValueChange.call(reinput, {
      target: {
        value: 'a',
      },
    });
    expect(reinput.state.value).to.equal('');
  });
  it('Simulates correct input', () => {
    let cumul = '';
    for (let x = 0; x <= 9; x++) {
      cumul += x;
      if (x === 3 || x === 7) {
        cumul += ' ';
      }
      reinput.handleValueChange.call(reinput, {
        target: {
          value: cumul,
        },
      });
    }
    expect(reinput.state.value).to.equal('0123 4567 89');
  });
});
