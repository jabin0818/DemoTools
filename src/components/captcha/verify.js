import React from 'react';
// import styles from './index.modules.css';
import { useState, useEffect } from 'react';
// import { connect } from 'dva';
import VerifyPoints from './VerifyPoints';
import VerifySlide from './VerifySlide';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { changeShowCaptchaStatus } from '@/store/actions/slider';

import { 
  VerifyWrapper
} from './style'

export default function Verify(props) {

  // redux
  const dispatch = useDispatch()
  const { imgSize, isShow } = useSelector(
    (state) => ({
      imgSize: state.sliderState.get('imgSize'),
      isShow: state.sliderState.get('isShow'),
    }),
    shallowEqual
  )


  const closeBox = () => {
    // const { dispatch } = props;
    // dispatch({
    //   type: 'slider/change',
    // });
    console.log('close')
    dispatch(changeShowCaptchaStatus(false))
  };

  // const{imgSize,isShow} = props;

  
  return (
    // 蒙层
    <VerifyWrapper style={{ display: isShow ? 'block' : 'none' }}>
      <div className='verifybox' style={{ maxWidth: parseInt(imgSize.width) + 30 + 'px' }}>
        <div className='verifybox-top'>
          请完成安全验证
          <span className='verifybox-close' onClick={() => closeBox()}>
            <i className='iconfont icon-close'></i>
          </span>
        </div>
        <div className='verifybox-bottom' style={{padding:'15px'}}>
          {/* 验证容器 */}
          <VerifySlide />
        </div>
      </div>
    </VerifyWrapper>
  );
};

// export default connect(({ slider }) => ({ ...slider}))(Verify);
