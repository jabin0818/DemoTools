import React from 'react'

export default function RectRadius() {
    return (
        <svg className="svg-node">
            <g transform="translate(0.5,0.5)" style={{ visibility: "visible" }}>
                <rect
                    x="2.38"
                    y="1.36"
                    width="27.2"
                    height="27.2"
                    rx="3.16"
                    ry="3.16"
                    fill="#ffffff"
                    stroke="#000000"
                    strokeWidth="1.3"
                    pointerEvents="all"
                ></rect>
            </g>
        </svg>
    )
}
