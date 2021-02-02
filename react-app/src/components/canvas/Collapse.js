import React, { useState } from 'react'

const Collapse = props => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className='collapse-wrapper'>
            <div className={'collapse-header'} onClick={() => setCollapsed(!collapsed)}>
                {collapsed &&
                    // <h3 className={'collapse-button'} >+</h3>
                    <i className="fas fa-plus collapse-button"></i>
                }
                {!collapsed &&
                    // <h3 >-</h3>
                    <i className="fas fa-minus collapse-button"></i>

                }
                <h3>{props.title}</h3>
            </div>

            {!collapsed &&
                <>
                    {props.children}
                </>
            }
        </div>
    )
}

export default Collapse
