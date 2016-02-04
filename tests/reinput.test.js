import React from 'react';
import ReactDOM from 'react-dom/dist/react-dom';
import TestUtils from 'react-addons-test-utils';
import Reinput from '../index';
// import should from 'should';
import chai from 'chai';
/* eslint-disable no-undef */
describe('Reinput', () => {
  it('Renders Reinput element with placeholders', () => {
    const reinput = TestUtils.renderIntoDocument(
      <Reinput
        pattern={/^(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,4})?$/}
        separator="*"
        mask="1111 1111 1111 1111"
        placeholder="_"
      />
    );
    const expect = chai.expect;
/* eslint-enable no-undef */
    const reinputNode = ReactDOM.findDOMNode(reinput);

    // check initial render to be correct
    expect(reinputNode.value).to.equal('____*____*____*____');

    // simulate focus and check whether classes changed correctly
    TestUtils.Simulate.focus(reinputNode);
  });
});
