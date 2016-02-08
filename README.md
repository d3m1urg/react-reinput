#Reinput
###React input component backed by regex of all sorts.

[![Build Status](https://travis-ci.org/d3m1urg/react-reinput.svg?branch=dev)](https://travis-ci.org/d3m1urg/react-reinput)
[![Coverage Status](https://coveralls.io/repos/github/d3m1urg/react-reinput/badge.svg?branch=dev)](https://coveralls.io/github/d3m1urg/react-reinput?branch=dev)

Reinput utilizes the power of regular expressions to provide robust input validation and grouping.

###Quick start

**Install via npm**

```
npm install react-reinput --save
```

and use it in your React components:

```jsx
<Reinput pattern={/^(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,4})?$/} separator=" " />
```

###Documentation

####Available props

| Prop name | Prop type | Default value | Description |
|  :---:    | :---:     | :---:         | :---       |
| `pattern` | React.PropTypes.any | `^(.*)$` | A string or a RexExp containing regular expression with **_capturing groups_**. User input is split into groups and groups are displayed with a provided `separator` between them. If `pattern` doesn't contain capturing groups then input will not work properly. |
| `separator` | React.PropTypes.string | `' '` | A character intended to separate groups from one another. It is expected to be just *one* character wide. |
| `initValue` | React.PropTypes.string | `''` | Sets the initial value of the input. Note, that `initValue` is processed with a regular expression provided in `pattern` and must match it. Otherwise it is not set and not displayed to the user.|
| `mask` | React.PropTypes.string | `''` | Mask describes a placeholder string: each letter in all groups, separated by spaces, is converted into a `placeholder` character and displayed in the input field. When component receives focus placeholder string is hidden. If component lost focus and nothing was typed then placeholder is displayed again. |
| `placeholder` | React.PropTypes.string | `_` | A character from which the placeholder string is created. |
| `trimInitValue` | React.PropTypes.bool | `false` | Indicates whether `initValue` should be trimmed before processing. |
| `className` | React.PropTypes.string | `''` | Pass your class names here to apply them to input element. |

