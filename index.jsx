import React, { Component, PropTypes } from 'react';

export default class Reinput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.initialValue,
			groups: [],
		};
	}

	/* correctCursorPosition(curPos) {
		let correctedPos = curPos;
		if (this.state.groups.length > 0) {
			let cumulative = 0;
			for(let i = 0; i < this.state.groups.length; i++) {
				cumulative += this.state.groups[i].length;
				if(correctedPos < cumulative) {
					correctedPos += i;
					break;
				}
			}
		}
		return correctedPos;
	}

	getModifiedGroupIndex(cursor) {
		let cumulative = 0;
		const modCursor = this.correctCursorPosition(cursor);
		for (let i = 0; i < this.state.groups.length; i++) {
			cumulative += this.state.groups[i].length;
			if (modCursor < cumulative) {
				return i;
			}
		}
		return 0;
	} */

	wasSeparatorRemoved(val) {
		let sepRemoved = false;
		if (this.state.groups.length > 0) {
			let chValue = val.replace(new RegExp('\\' + this.props.separator, 'g'), '');
			if (chValue.length === this.state.groups.join('').length) {
				sepRemoved = true;
			}
		}
		return sepRemoved;
	}

	wasSymbolRemoved(value) {
		let symbolRemoved = false;
		if (this.state.groups.length > 0) {
			let chValue = value.replace(new RegExp('\\' + this.props.separator, 'g'), '');
			if (chValue.length < this.state.groups.join('').length) {
				symbolRemoved = true;
			}
		}
		return symbolRemoved;
	}

	handleNormalInput(value, cursor) {
		if(this.state.groups && this.state.groups.length > 0) {
			value = value.replace(new RegExp('\\' + this.props.separator, 'g'), '');
		}
		let matched = value.match(this.props.pattern);
		if (matched) {
			matched = matched.slice(1).filter((item) => item);
			this.setState({ 
				value: matched.length > 1 ? matched.join(this.props.separator) : value,
				groups: matched
			}, () => {
				if(cursor !== undefined) {
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
		let value = event.target.value;
		let curPos = this.input.selectionStart;
		if (this.state.groups.length > 0) { // something was already matched
			if (this.wasSeparatorRemoved(value)) { // user tried to remove separator
				this.setState({ 
				value: this.state.groups.join(this.props.separator)
			}, () => {
				this.input.selectionStart = curPos; //we don't let him do so
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

	render() {
		return (
			<input type="text" 
					ref={(ref) => {this.input = ref;}}
					onChange={this.handleValueChange.bind(this)}
					value={this.state.value} />
		);
	}
}

Reinput.propTypes = {
	initialValue: PropTypes.string,
	pattern: PropTypes.any,
	separator: PropTypes.string, // actually a char - and don't forget to escape it somehow in input or prohibit
	mask: PropTypes.string, // mask can be e.g. 1111 sdfh 2222
	placeholder: PropTypes.string
};

Reinput.defaultProps = {
	initialValue: '',
	pattern: '^.*$',
	separator: ' ',
	mask: '', // test mask with a pattern if the former is specified
	placeholder: '_'
};
