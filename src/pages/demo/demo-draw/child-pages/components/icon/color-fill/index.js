import React from 'react'

import PropTypes from 'prop-types'

export default function ColorFill(props) {
    return (
        <svg className="icon" viewBox="0 0 1024 1024" width={props.size} height={props.size}>
            <path fill="currentColor" d="M810.666667 618.666667s-85.333333 93.866667-85.333334 149.333333c0 46.933333 38.4 85.333333 85.333334 85.333333s85.333333-38.4 85.333333-85.333333c0-55.466667-85.333333-149.333333-85.333333-149.333333M221.866667 554.666667L426.666667 349.866667l204.8 204.8m76.8-46.933334L324.266667 128 264.533333 187.733333l102.4 102.4-221.866666 217.6c-25.6 25.6-25.6 64 0 89.6l234.666666 234.666667c25.6 25.6 64 25.6 89.6 0l234.666667-234.666667c25.6-21.333333 29.866667-64 4.266667-89.6z" p-id="4284">
            </path>
        </svg>
    )
}

ColorFill.propTypes = {
    size: PropTypes.string,
}

ColorFill.defaultProps = {
    size: '24'
}