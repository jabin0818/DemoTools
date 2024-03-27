import React, { useState } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
// import styles from './index.modules.css';
import { 
  VerifyPointWrapper
} from './style'
class VerifyPoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretKey: '', //后端返回的ase加密秘钥
      checkNum: 3, //默认需要点击的字数
      fontPos: [], //选中的坐标信息
      checkPosArr: [], //用户点击的坐标
      num: 1, //点击的记数
      pointBackImgBase: '', //后端获取到的背景图片
      poinTextList: [], //后端返回的点击字体顺序
      backToken: '', //后端返回的token值
      setSize: {
        imgHeight: 0,
        imgWidth: 0,
        barHeight: 0,
        barWidth: 0,
      },
      tempPoints: [],
      text: '',
      barAreaColor: undefined,
      barAreaBorderColor: undefined,
      showRefresh: true,
      bindingClick: true,
    };
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    console.log(this.props.secretKey);
    // console.log(this.props.setSize.imgWidth);
    let tempPoints = ['a', 'b', 'd', 'e', 'f'];
    const { mode, captchaType, vSpace, imgSize, barSize, setSize, pointBackImgBase } = this.props;
    return (
      <VerifyPointWrapper style={{ position: 'relative' }}>
        <div className='verify-img-out'>
          <div
            className='verify-img-panel'
            style={{
              width: setSize.imgWidth + 'px',
              height: setSize.imgHeight + 'px',
              backgroundSize: setSize.imgWidth + 'px' + ' ' + setSize.imgHeight + 'px',
              marginBottom: vSpace + 'px',
            }}
          >
            <div className='verify-refresh' style={{ zIndex: 3 }} v-show="showRefresh">
              <i className='iconfont icon-refresh'></i>
            </div>

            {tempPoints.map((tempPoint, index) => {
              return (
                <div
                  key={index}
                  className="point-area"
                  style={{
                    backgroundColor: '#1abd6c',
                    color: '#fff',
                    zIndex: 9999,
                    width: '20px',
                    height: '20px',
                    textAlign: 'center',
                    lineHeight: '20px',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: parseInt(tempPoint.y - 10) + 'px',
                    left: parseInt(tempPoint.x - 10) + 'px',
                  }}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className='verify-bar-area'
          style={{
            width: setSize.imgWidth,
            color: this.state.barAreaColor,
            borderColor: this.state.barAreaBorderColor,
            lineHeight: barSize.height,
          }}
        >
          <span className='verify-msg'>{this.state.text}</span>
        </div>
      </VerifyPointWrapper>
    );
  }
}

VerifyPoints.propTypes = {
  mode: PropTypes.string,
  captchaType: PropTypes.string,
  vSpace: PropTypes.number,
  imgSize: PropTypes.object,
  barSize: PropTypes.object,
  setSize: PropTypes.object,
  pointBackImgBase: PropTypes.string,
  tempPoints: PropTypes.array,
};

VerifyPoints.defaultProps = {
  mode: 'fixed',
  vSpace: 5,
  imgSize: {
    width: '310px',
    height: '155px',
  },
  barSize: {
    width: '310px',
    height: '40px',
  },
  setSize: {
    imgHeight: 310,
    imgWidth: 155,
    barHeight: 0,
    barWidth: 0,
  },
};

export default connect(({ point }) => ({ ...point }))(VerifyPoints);
