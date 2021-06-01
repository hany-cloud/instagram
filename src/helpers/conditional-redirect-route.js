import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function ConditionaldRedirectRoute({ redirectOnCondition, redirectPath, component: Component, ...props }) {
    return (
        <Route
            {...props}
            render={props => (
                redirectOnCondition ?
                    <Redirect to={redirectPath} /> :
                    <Component {...props} />
                    
            )}
        />
    );
}

ConditionaldRedirectRoute.propTypes = {
    redirectOnCondition: PropTypes.bool.isRequired,
    redirectPath: PropTypes.string.isRequired,
    component: PropTypes.object.isRequired
};
