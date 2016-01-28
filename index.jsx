import React, { Component, PropTypes } from 'react';

export default class Reinput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.initialValue,
			matched: false
		};
	}

	handleValueChange(event) {
		let value = event.target.value;
		if(this.state.matched) {
			value = value.replace(new RegExp('\\' + this.props.separator, 'g'), '');
		}
		let matched = value.match(this.props.pattern);
		if (matched) {
			matched = matched.slice(1).filter((item) => {
				return item;
			});
			this.setState({ 
				value: matched.length > 1 ? matched.join(this.props.separator) : value,
				matched: true
			});
		} else {
			this.setState({
				matched: false
			});
		}
	}

	render() {
		return (
			<input type="text" onChange={this.handleValueChange.bind(this)} value={this.state.value} />
		);
	}
}

Reinput.propTypes = {
	initialValue: PropTypes.string,
	pattern: PropTypes.any,
	separator: PropTypes.string,
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
