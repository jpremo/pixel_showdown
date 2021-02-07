import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { changeRuleset } from '../../store/canvas'

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px solid black',
        color: state.isSelected ? 'white' : 'black',
        padding: 20,
        width: '200px',
        display: 'list-item'
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: '200px',
        border: '1 px solid black',
        display: 'inline-block'
    }),
    // singleValue: (provided, state) => {
    //   const opacity = state.isDisabled ? 0.5 : 1;
    //   const transition = 'opacity 300ms';

    //   return { ...provided, opacity, transition };
    // }
}

const RulesetSelector = ({ property, options, title }) => {
    const dispatch = useDispatch()
    const ruleset = useSelector(state => state.canvas.ruleset)
    const onChange = selectedOption => {
        dispatch(changeRuleset( selectedOption.value,property))
    };

    useEffect(() => {
        dispatch(changeRuleset( options[0].value,property))
    }, [])

    return (
        <div className='ruleset-select-wrapper'>
            <h2>{title}</h2>
            <Select defaultValue={options[0]} placeholder={title} className='ruleset-select' options={options} onChange={onChange} />
        </div>
    )
}

export default RulesetSelector
