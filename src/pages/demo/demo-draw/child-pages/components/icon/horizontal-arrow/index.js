import React from 'react'

export default function HorizontalArrow() {
    return (
        <svg className="svg-node">
            <g transform="translate(0.5,0.5)" style={{ visibility: "visible" }}>
                <polygon
                    points="0,13.6 9,2.2 9,11.2 18,11.2 18,2.2 27,13.6 18,27.2 18,18.2 9,18.2 9,27.2"
                    fill="#ffffff"
                    stroke="#000000"
                    strokeWidth="1.3"
                    pointerEvents="all"
                ></polygon>
            </g>
        </svg>
    )
}
