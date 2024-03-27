import React from 'react'

import PropTypes from 'prop-types'

// 减号
export default function Minus() {
    return (
        <svg className="svg-node">
            <g transform="translate(0.5,0.5)" style={{ visibility: "visible" }}>
                <polygon
                    points="0,9 27,9 27,18 0,18"
                    fill="#ffffff"
                    stroke="#000000"
                    strokeWidth="1.3"
                    pointerEvents="all"
                ></polygon>
            </g>
        </svg>
    )
}

Minus.propTypes = {
    size: PropTypes.string,
}

Minus.defaultProps = {
    size: '24'
}