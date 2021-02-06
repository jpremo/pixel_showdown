import React from 'react';

//Component used to turn off settings/tools in the canvas based on the current ruleset
const RuleChecker = ({property, canvasSettings, children}) => {
    if (!canvasSettings.ruleset[property]) {
        return (
            <>
                {children}
            </>
        );
    }
    return null
}

export default RuleChecker;
