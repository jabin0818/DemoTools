import React from 'react'

import PropTypes from 'prop-types'

export default function Line(props) {
    return (
        <svg className="icon" viewBox="0 0 1024 1024" width={props.size} height={props.size}>
            <path d="M127.389 851.634l724.21-724.21 45.198 45.196-724.211 724.212z" p-id="11226">
            </path>
        </svg>
    )
}

Line.propTypes = {
    size: PropTypes.string,
}

Line.defaultProps = {
    size: '24'
}