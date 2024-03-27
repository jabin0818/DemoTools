import React, { useState, useEffect } from 'react'

import { PickColorWrapper } from "./style"

import { SketchPicker } from 'react-color'

import {
    CloseOutlined,
} from '@ant-design/icons';

export default function PickColor(props) {

    const { pickColorState, handleChange } = props;

    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    function handleClick() {
        setDisplayColorPicker(!displayColorPicker);
    }

    function handleClose() {
        setDisplayColorPicker(false);
    }

    function handleSwatchHover(color, event) {
    }

    return (
        <PickColorWrapper>
            <div className='pickColor-wrapper' onClick={() => handleClick()}>
                {props?.children ? props.children :
                    <div className='pickColor-swatch'>
                        <div className='pickColor' style={{ background: `rgba(${pickColorState.r}, ${pickColorState.g}, ${pickColorState.b}, ${pickColorState.a})` }}></div>
                    </div>
                }
            </div>
            {displayColorPicker ? <div className={'pickColor-popover' + ' ' + (props?.children ? '' : 'pickColor-popover-proPanel')}>
                <div className='pickColor-close' onClick={handleClose}>
                    <CloseOutlined />
                </div>
                <SketchPicker color={pickColorState} onChange={handleChange} onSwatchHover={handleSwatchHover} />
            </div> : null}
        </PickColorWrapper>
    )
}
