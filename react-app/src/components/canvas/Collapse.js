import React, { useState } from 'react'

//This component wraps menus meant to be collapsable in order to provide this functionality
const Collapse = props => {
    const init = props.collapsedInit === undefined ? false : props.collapsedInit
    const largeClass = props.largerText === true ? '-large' : ""
    const [collapsed, setCollapsed] = useState(init)

    return (
        <div className={'collapse-wrapper'}>
            <div className={'collapse-header'+largeClass} onClick={() => setCollapsed(!collapsed)}>
                {collapsed &&
                    <i className="fas fa-plus collapse-button"></i>
                }
                {!collapsed &&
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
