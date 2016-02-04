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
    expect(reinput.state.value).to.equal('____ ____ ____ ____');
  });
  it('Simulate focus and checks whether class has changed correctly', () => {
    TestUtils.Simulate.focus(reinputNode);
    const hasClass = TestUtils.scryRenderedDOMComponentsWithClass(reinput, 'react-reinput');
    expect(hasClass.length).to.equal(1);
  });
  it('Simulate blur and checks whether class has changed correctly', () => {
    TestUtils.Simulate.blur(reinputNode);
    const hasClass = TestUtils.scryRenderedDOMComponentsWithClass(reinput,
                                                                  'react-reinput__placeholder');
    expect(hasClass.length).to.equal(1);
  });
  it('Simulates incorrect input', () => {
    TestUtils.Simulate.focus(reinputNode);
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
  it('Simulates deleting a couple of characters', () => {
    const firstValue = '0123 4567 8';
    const secondValue = '0123 4567 ';
    reinput.handleValueChange.call(reinput, {
      target: {
        value: firstValue,
      },
    });
    reinput.handleValueChange.call(reinput, {
      target: {
        value: secondValue,
      },
    });
    expect(reinput.state.value).to.equal('0123 4567');
  });
  it('Simulates deleting a separator', () => {
    const value = '01234567';
    reinput.handleValueChange.call(reinput, {
      target: {
        value,
      },
    });
    expect(reinput.state.value).to.equal('0123 4567');
  });
  it('Simulates inserting one more symbol', () => {
    const value = '01239 4567';
    reinput.handleValueChange.call(reinput, {
      target: {
        value,
      },
    });
    expect(reinput.state.value).to.equal('0123 9456 7');
  });
  const reinput2 = TestUtils.renderIntoDocument(
    <Reinput
      pattern={/^(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,4})?$/}
      separator=" "
      mask="1111 1111 1111 1111"
      placeholder="_"
      initValue="1234 "
      trimInitValue
    />
  );
  it('Renders another Reinput element with init value & trim', () => {
    expect(reinput2.state.value).to.equal('1234');
  });
  it('Simulates adding a symbol', () => {
    const value = '12345';
    reinput2.handleValueChange.call(reinput2, {
      target: {
        value,
      },
    });
    expect(reinput2.state.value).to.equal('1234 5');
  });
  const reinput3 = TestUtils.renderIntoDocument(
    <Reinput
      pattern={/^(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,4})?$/}
      separator=" "
      mask="1111 1111 1111 1111"
      placeholder="_"
      initValue="1234567"
    />
  );
  it('Renders another Reinput element with init value', () => {
    expect(reinput3.state.value).to.equal('1234 567');
  });
  it('Simulates adding a symbol', () => {
    const value = '1234 5678';
    reinput3.input.selectionStart = 9;
    reinput3.handleValueChange.call(reinput3, {
      target: {
        value,
      },
    });
    expect(reinput3.state.value).to.equal('1234 5678');
  });
});
