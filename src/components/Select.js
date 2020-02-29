import React from 'react'
import ReactSelect from 'react-select'

class Select extends React.Component {
	render() {
		return (
			<ReactSelect

				{...this.props}
				style={{
					option: (provided, state) => ({
						...provided,
						borderBottom: '1px dotted pink',
						color: state.isSelected ? 'red' : 'blue',
						padding: 20,
					}),
					control: () => ({
						// none of react-select's styles are passed to <Control />
						width: 200,
					}),
					singleValue: (provided, state) => {
						const opacity = state.isDisabled ? 0.5 : 1;
						const transition = 'opacity 300ms';

						return { ...provided, opacity, transition };
					}
				}}
			/>
		)
	}
}

export default Select;