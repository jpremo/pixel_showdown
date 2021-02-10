import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { changeRuleset } from '../../store/canvas'



const ComptitionSelector = ({setRuleset}) => {
    const dispatch = useDispatch()
    const [options, setOptions] = useState([
        { value: undefined, label: 'Please create a ruleset before making a competition' },
    ])
    // setRuleset(options[0])
    const [loaded, setLoaded] = useState(false)
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        if (user.rulesets.length > 0) {
            let options = []
            for (let i = 0; i < user.rulesets.length; i++) {
                options.push({ value: user.rulesets[i].id, label: user.rulesets[i].title })
            }
            setOptions(options)
            setLoaded(true)
            setRuleset(options[0].value)
        }
    }, [])

    const onChange = selectedOption => {
        setRuleset(selectedOption.value)
    };

    return (
        <>
            { loaded &&
                <div className='modal-form-div'>
                    <h2 id='competition-body-label'>Ruleset</h2>
                    <Select defaultValue={options[0]} placeholder='Ruleset' className='competition-select' options={options} onChange={onChange} />
                </div>}
        </>

    )
}

export default ComptitionSelector
