import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Reinput extends Component {
  constructor(props) {
    super(props);
    const groups = this.initGroups(props);
    const value = groups.length > 0 ? this.initValue(groups, props.separator)
                                    : this.initPlaceholder(props);
    this.state = {
      value,
      groups,
      placeholderOn: groups.length === 0,
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  initGroups({ initValue: value, pattern, trimInitValue: trim }) {
    const val = trim ? value.trim() : value;
    const matched = val.match(pattern);
    return matched ? matched.slice(1).filter(item => item) : [];
  }

  initValue(groups, separator) {
    let val = '';
    if (groups.length === 1) {
      val = groups[0];
    } else if (groups.length > 1) {
      val = groups.join(separator);
    }
    return val;
  }

  initPlaceholder({ mask, pattern, placeholder, separator }) {
    let placeholderVal = '';
    const maskCh = mask.replace(new RegExp(' ', 'g'), '');
    let matched = maskCh.match(pattern);
    if (matched) {
      matched = matched.slice(1).filter(item => item);
      placeholderVal = matched.reduce((prev, next, ind, arr) => {
        const str = [...next].fill(placeholder).join('');
        return prev + (ind < (arr.length - 1) ? (str + separator) : str);
      }, '');
    }
    return placeholderVal;
  }

  wasSeparatorRemoved(val) {
    let sepRemoved = false;
    if (this.state.groups.length > 0) {
      const chValue = val.replace(new RegExp(`\\${this.props.separator}`, 'g'), '');
      if (chValue.length === this.state.groups.join('').length) {
        sepRemoved = true;
      }
    }
    return sepRemoved;
  }

  wasSymbolRemoved(value) {
    let symbolRemoved = false;
    if (this.state.groups.length > 0) {
      const chValue = value.replace(new RegExp(`\\${this.props.separator}`, 'g'), '');
      if (chValue.length < this.state.groups.join('').length) {
        symbolRemoved = true;
      }
    }
    return symbolRemoved;
  }

  handleNormalInput(val, cursor) {
    let value = val;
    if (this.state.groups && this.state.groups.length > 0) {
      value = value.replace(new RegExp(`\\${this.props.separator}`, 'g'), '');
    }
    let matched = value.match(this.props.pattern);
    if (matched) {
      matched = matched.slice(1).filter(item => item);
      this.setState({
        value: matched.length > 1 ? matched.join(this.props.separator) : value,
        groups: matched,
      }, () => {
        if (cursor !== undefined) {
          this.input.selectionStart = cursor;
          this.input.selectionEnd = cursor;
        }
      });
    }
  }

  isInputInside(value, cursor) {
    return cursor < value.length;
  }

  handleValueChange(event) {
    const value = event.target.value;
    const curPos = this.input.selectionStart;
    if (this.state.groups.length > 0) { // something was already matched
      if (this.wasSeparatorRemoved(value)) { // user tried to remove separator
        this.setState({
          value: this.state.groups.join(this.props.separator),
        }, () => {
          this.input.selectionStart = curPos; // we don't let him do so
          this.input.selectionEnd = curPos;
        });
      } else if (this.wasSymbolRemoved(value, curPos) || this.isInputInside(value, curPos)) {
        this.handleNormalInput(value, curPos);
      } else {
        this.handleNormalInput(value);
      }
    } else { // no match is present
      this.handleNormalInput(value, curPos);
    }
  }

  handleFocus() {
    if (this.state.placeholderOn) {
      this.setState({
        placeholderOn: false,
        value: '',
      });
    }
  }

  handleBlur() {
    if (this.state.value === '' && this.props.initValue === '' && this.props.mask) {
      this.setState({
        placeholderOn: true,
        value: this.initPlaceholder(this.props),
      });
    }
  }

  render() {
    const compositClasses = classnames({
      'react-reinput': !this.state.placeholderOn,
      'react-reinput__placeholder': this.state.placeholderOn,
    }, this.props.className);
    return (
      <input type="text"
        className={compositClasses}
        ref = {ref => this.input = ref}
        onChange = {this.handleValueChange}
        onFocus = {this.handleFocus}
        onBlur = {this.handleBlur}
        value = {this.state.value}
      />
    );
  }
}

Reinput.propTypes = {
  initValue: PropTypes.string,
  pattern: PropTypes.any,
  separator: PropTypes.string,
  mask: PropTypes.string, // mask can be e.g. 1111 sdfh 2222
  placeholder: PropTypes.string,
  trimInitValue: PropTypes.bool,
  className: PropTypes.string,
};

Reinput.defaultProps = {
  initValue: '',
  pattern: '^(.*)$',
  separator: ' ',
  mask: '', // test mask with a pattern if the former is specified
  placeholder: '_',
  trimInitValue: false,
};
