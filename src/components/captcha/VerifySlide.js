import React, { useEffect, useState } from 'react';
// import { connect } from 'dva';
import { CSSTransition } from 'react-transition-group';
// import styles from './index.modules.css';
import { aesEncrypt } from '../../utils/ase';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getPictures, checkPicture, changeShowCaptchaStatus } from '@/store/actions/slider';
import { 
  VerifySlideWrapper, LoadingWrapper
} from './style'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function VerifySlide(props){

  const dispatch = useDispatch()
  // redux
  const {
    checkSuccess,
    // captchaType,
    backToken,
    secretKey,
    // dispatch,
    blockBackImgBase,
    //iconColor,
    //iconClass,
    //tipWords,
    //passFlag,
    backImgBase,
    setSize,
    vSpace,
    barSize,
    //text,
    //leftBarWidth,
    //leftBarBorderColor,
    //transitionWidth,
    //finishText,
    //moveBlockBackgroundColor,
    //moveBlockLeft,
    // transitionLeft,
    // isEnd,
    isLoading,
  } = useSelector(
    (state) => ({
      checkSuccess: state.sliderState.get('checkSuccess'),
      backToken: state.sliderState.get('backToken'),
      secretKey: state.sliderState.get('secretKey'),
      // dispatch: state.sliderState.get('dispatch'),
      blockBackImgBase: state.sliderState.get('blockBackImgBase'),
      backImgBase: state.sliderState.get('backImgBase'),
      setSize: state.sliderState.get('setSize'),
      vSpace: state.sliderState.get('vSpace'),
      barSize: state.sliderState.get('barSize'),
      isLoading: state.sliderState.get('isLoading')
    }),
    shallowEqual
  )

  // console.log(checkSuccess)

  const [barArea, setBarArea] = useState(null);
  const [isEnd, setIsEnd] = useState(false);
  const [startLeft, setStartLeft] = useState(undefined);
  const [startMoveTime, setStartMoveTime] = useState(undefined);
  const [text, setText] = useState('');
  // 设置颜色
  const [moveBlockBackgroundColor, setMoveBlockBackgroundColor] = useState(undefined);
  const [leftBarBorderColor, setLeftBarBorderColor] = useState(undefined);
  const [iconColor, setIconColor] = useState(undefined);
  const [status, setStatus] = useState(false);
  const [moveBlockLeft, setMoveBlockLeft] = useState(undefined);
  const [leftBarWidth, setLeftBarWidth] = useState(undefined);
  const [endMovetime, setEndMovetime] = useState(undefined);
  const [blockSize, setBlockSize] = useState({ width: 50, height: 50 });
  const [iconClass, setIconClass] = useState('icon-right');
  const [showRefresh, setShowRefresh] = useState(true);
  const [passFlag, setPassFlag] = useState(false);
  const [tipWords, setTipWords] = useState('');
  const [finishText, setFinishText] = useState('');
  const [transitionLeft, setTransitionLeft] = useState('');
  const [explain, setExplain] = useState('向右滑动完成验证');
  const [transitionWidth, setTransitionWidth] = useState('');

  // const [isLoading, setIsLoading] = useState(true);
    

  // 验证成功或失败
  useEffect(() => {
    // 验证成功
    // console.log(checkSuccess)
    if (checkSuccess === 'success') {
      setMoveBlockBackgroundColor('#5cb85c');
      setLeftBarBorderColor('#5cb85c');
      setIconColor('#fff');
      setIconClass('icon-check');
      setShowRefresh(false);
      setIsEnd(true);
      setPassFlag(true);
      setTipWords(`${((endMovetime - startMoveTime) / 1000).toFixed(2)}s验证成功`);
      setTimeout(() => {
        setTipWords('');
        // 成功后关闭
        // dispatch({
        //   type: 'slider/change',
        // });
        // console.log('成功后关闭')
        dispatch(changeShowCaptchaStatus(false))

      }, 1000);
    }
    // 验证失败
    if (checkSuccess === 'failure') {
      setMoveBlockBackgroundColor('#d9534f');
      setLeftBarBorderColor('#d9534f');
      setIconColor('#fff');
      setIconClass('icon-close');
      setPassFlag(false);
      setTipWords('验证失败');
      setTimeout(() => {
        refresh();
      }, 1000);
      setTimeout(() => {
        setTipWords('');
      }, 1000);
    }
  }, [checkSuccess]);

  // 初始化验证图片
  useEffect(() => {
    // setIsLoading(true)
    console.log('updataLoadingBefore')
    // dispatch({
    //   type: 'slider/fetch',
    //   payload: { captchaType: 'blockPuzzle' },
    // });
    dispatch(getPictures({ captchaType: 'blockPuzzle' }))

    // setIsLoading(false)
    console.log('updataLoadingAfter')

    setPassFlag(false);
    setTipWords('');
    setShowRefresh(true);
    setFinishText('');
    setMoveBlockLeft(0);
    setLeftBarWidth(undefined);
    setLeftBarBorderColor('#ddd');
    setMoveBlockBackgroundColor('#fff');
    setIconColor('#000');
    setIconClass('icon-right');
    setIsEnd(false);
    setTransitionWidth('');
    setTransitionLeft('');
    setText(explain);
  }, []);

  const refresh = () => {
    // 设置滑块
    // setIsLoading(true)

    setShowRefresh(true);
    setFinishText('');
    setTransitionLeft('left .3s');
    setMoveBlockLeft(0);
    setLeftBarWidth(undefined);
    setTransitionWidth('width .3s');
    setLeftBarBorderColor('#ddd');
    setMoveBlockBackgroundColor('#fff');
    setIconColor('#000');
    setIconClass('icon-right');
    setIsEnd(false);
    // dispatch({
    //   type: 'slider/fetch',
    //   payload: { captchaType: 'blockPuzzle' },
    // });
    dispatch(getPictures({ captchaType: 'blockPuzzle' }))
    // setIsLoading(false)
    setTimeout(() => {
      setTransitionWidth('');
      setTransitionLeft('');
      setText(explain);
    }, 300);
  };

  const move = (e) => {
    e = e || window.event;
    if (status && isEnd == false) {
      if (!e.touches) {
        //兼容PC端
        var x = e.clientX;
      } else {
        //兼容移动端
        var x = e.touches[0].pageX;
      }
      var bar_area_left = barArea.getBoundingClientRect().left;
      var move_block_left = x - bar_area_left; //小方块相对于父元素的left值
      if (move_block_left >= barArea.offsetWidth - parseInt(blockSize.width / 2) - 2) {
        move_block_left = barArea.offsetWidth - parseInt(blockSize.width / 2) - 2;
      }
      if (move_block_left <= 0) {
        move_block_left = parseInt(blockSize.width / 2);
      }
      //拖动后小方块的left值
      setMoveBlockLeft(move_block_left - startLeft);
      setLeftBarWidth(move_block_left - startLeft);
    }
  };
  const end = async () => {
    const endMovetime = +new Date();
    setEndMovetime(endMovetime);
    //判断是否重合
    if (status && isEnd == false) {
      var moveLeftDistance = parseInt(moveBlockLeft || '');
      moveLeftDistance = (moveLeftDistance * 310) / parseInt(setSize.imgWidth);
      var captchaVerification = secretKey
        ? aesEncrypt(backToken + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey)
        : backToken + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 });
      // 组装payload
      const payload = {
        captchaType: 'blockPuzzle',
        pointJson: secretKey
          ? aesEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey)
          : JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
        token: backToken,
        captchaVerification,
      };
      // 这个是异步操作
      dispatch(checkPicture(payload))
      setStatus(false);
    }
  };

  useEffect(() => {
    window.addEventListener('touchmove', move);
    return () => {
      window.removeEventListener('touchmove', move);
    };
  });

  useEffect(() => {
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
    };
  });

  useEffect(() => {
    window.addEventListener('touchend', end);
    return () => {
      window.removeEventListener('touchend', end);
    };
  });

  useEffect(() => {
    window.addEventListener('mouseup', end);
    return () => {
      window.removeEventListener('mouseup', end);
    };
  });

  const start = (e) => {
    e = e || window.event;
    if (!e.touches) {
      //兼容PC端
      var x = e.clientX;
    } else {
      //兼容移动端
      var x = e.touches[0].pageX;
    }
    const startLeft = Math.floor(x - barArea.getBoundingClientRect().left);
    setStartLeft(startLeft);
    const startMoveTime = +new Date(); //开始滑动的时间
    setStartMoveTime(startMoveTime);
    if (isEnd == false) {
      setText('');
      setMoveBlockBackgroundColor('#337ab7');
      setLeftBarBorderColor('#337AB7');
      setIconColor('#fff');
      e.stopPropagation();
      setStatus(true);
    }
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  return (
    <>
    
      <LoadingWrapper style={{
        display: isLoading === true ? 'block' : 'none'
      }}>
        <Spin indicator={antIcon} />
      </LoadingWrapper>
      <VerifySlideWrapper style={{ position: 'relative', display: isLoading === false ? 'block' : 'none' }}>
        <div
          className='verify-img-out'
          style={{ height: parseInt(setSize.imgHeight) + vSpace }}
        >
          <div
            className='verify-img-panel'
            style={{ width: setSize.imgWidth, height: setSize.imgHeight }}
          >
            <img
              src={'data:image/png;base64,' + backImgBase}
              alt=""
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
            <div
              className='verify-refresh'
              onClick={() => refresh()}
              style={{ display: showRefresh ? 'block' : 'none' }}
            >
              <i className='iconfont icon-refresh'></i>
            </div>
            <CSSTransition in={tipWords.length > 0} timeout={150} classNames="tips" unmountOnExit>
              <span
                className={
                  passFlag
                    ? `${'verify-tips'} ${'suc-bg'}`
                    : `${'verify-tips'} ${'err-bg'}`
                }
              >
                {tipWords}
              </span>
            </CSSTransition>
          </div>
        </div>

        <div
          className='verify-bar-area'
          style={{ width: setSize.imgWidth, height: barSize.height, lineHeight: barSize.height }}
          ref={(bararea) => setBarArea(bararea)}
        >
          <span className='verify-msg'>{text}</span>
          <div
            className='verify-left-bar'
            style={{
              width: leftBarWidth !== undefined ? leftBarWidth : barSize.height,
              height: barSize.height,
              borderColor: leftBarBorderColor,
              transaction: transitionWidth,
            }}
          >
            <span className='verify-msg'>{finishText}</span>
            <div
              className='verify-move-block'
              onTouchStart={(e) => start(e)}
              onMouseDown={(e) => start(e)}
              style={{
                width: barSize.height,
                height: barSize.height,
                backgroundColor: moveBlockBackgroundColor,
                left: moveBlockLeft,
                transition: transitionLeft,
              }}
            >
              <i
                className={`verify-icon iconfont ${iconClass}`}
                style={{ color: iconColor }}
              ></i>
              <div
                className='verify-sub-block'
                style={{
                  width: Math.floor((parseInt(setSize.imgWidth) * 47) / 310) + 'px',
                  height: setSize.imgHeight,
                  top: '-' + (parseInt(setSize.imgHeight) + vSpace) + 'px',
                  backgroundSize: setSize.imgWidth + ' ' + setSize.imgHeight,
                }}
              >
                <img
                  src={'data:image/png;base64,' + blockBackImgBase}
                  alt=""
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </VerifySlideWrapper>
    </>
  );
};

// export default connect(({ slider }) => ({ ...slider }))(VerifySlide);
