import React, { useEffect } from 'react'

import { Modal } from 'antd'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { changeHelpIsVisible, changeHelpComponentsName } from '@/store/actions/global';

import { useRoutes, useNavigate, useLocation } from 'react-router-dom';

import {
  DemoToolsHelpWrapper,
  ChinaMapHelpWrapper
} from './style'


export default function HelpModal() {
  // 监听路径
  const { pathname } = useLocation()

  useEffect(() => {
    // 路由切换了
    if (pathname === '/index/tool') {
      dispatch(changeHelpComponentsName('demoTools'))
    } else if (pathname === '/demo/chainMap') {
      dispatch(changeHelpComponentsName('chinaMap'))
    } else if (pathname === "/demo/piano") {
      dispatch(changeHelpComponentsName('piano'))
    } else if (pathname === "/demo/dictCard") {
      dispatch(changeHelpComponentsName('dictCard'))
    }
  }, [pathname])

  // redux
  const dispatch = useDispatch()
  const { isVisible, componentsName } = useSelector(
    (state) => ({
      isVisible: state.globalState.get('isVisible'),
      componentsName: state.globalState.get('componentsName')
    }),
    shallowEqual
  )

  const closeModal = () => {
    console.log(isVisible)
    dispatch(changeHelpIsVisible(false))
  }

  const demoToolsHelpModal = () => {
    return (
      <DemoToolsHelpWrapper>
        <div className=''>demoToolsHelp</div>
      </DemoToolsHelpWrapper>
    )
  }

  const chinaMapHelpModal = () => {
    return (
      <ChinaMapHelpWrapper>
        <p className='chinaMap-rule-intro'>
          这是一个中国省份地理位置小测试游戏，你可以设置选择不同的模式、难度和测试时长，根据左上角的提示在地图中选择正确的省份或市区的位置，测试结束后可查看测试结果，不同测试模式和难度的具体说明如下：
        </p>
        <p className='chinaMap-rule-modal'>
          <i>模式：</i><br />
          <strong>1、中国省份：</strong>这个模式下你需要在地图中选择中国的34个省级行政区，其中澳门特别行政区在地图中的面积太小，故本模式不设置澳门作为题目测试；另外，因地图南海诸岛显示问题，本模式下南海诸岛作为一个测试题。<br />
          <strong>2、中国地级市：</strong>这个模式下你需要选择34个省级行政区其中的1个，进行省份地级行政区的位置测试，你可以选择你所在的省份进行测试，以此来熟悉各城市的地理方位。<br />
          <strong>3、中国地区练习：</strong>这个模式下你不需要设置难度和时间，你可以随心所欲的点击不同的地区，你可以查看到省级-地级-县级三层不同的地图，以此来练习掌握各个地区的地理方位，了解祖国的大好河山。
        </p>
        <p className='chinaMap-rule-modal'>
          <i>难度说明：</i><br />
          <strong>1、简单：</strong>显示地图内轮廓线，点击不同省份或城市后保留高亮。<br />
          <strong>2、普通：</strong>不显示地图内轮廓线，点击不同省份或城市后保留高亮。<br />
          <strong>3、困难：</strong>不显示地图内轮廓线，点击不同省份或城市后不保留高亮。
        </p>
      </ChinaMapHelpWrapper>
    )
  }

  const pianoHelpModal = () => {
    return (
      <ChinaMapHelpWrapper>
        <p className='chinaMap-rule-intro'>
          这是一个将钢琴与打字结合的创意项目，你可以在右上角挑选你喜欢的曲子，选择不同的模式，设置不同难度等，还可以自由创作、上传你的曲子，不同模式和设置具体说明如下：
        </p>
        <p className='chinaMap-rule-modal'>
          <i>模式：</i><br />
          <strong>1、打字模式：</strong>这个模式下你需要根据所给单词进行打字，每个按键与琴键不一 一对应，曲子既有旋律又有和弦，你的指尖在键盘上飞扬跳跃，感受纯音乐的纯粹和美妙！<br />
          <strong>2、简谱模式：</strong>这个模式下你需要根据所选择的曲子的旋律节奏进行演奏，每个按键与琴键一一对应，曲子只有旋律没有和弦，但是你可以根据歌词更好地欣赏歌曲的优美旋律。<br />
          <strong>3、自由模式：</strong>这个模式下你无需再根据给定的字词进行演奏，每个按键与琴键一 一对应，你可以随心所欲地弹奏你喜欢的歌曲，弹奏完毕后可以上传乐谱，在乐谱模式中可以找到你上传的曲子。
        </p>
        <p className='chinaMap-rule-modal'>
          <i>设置说明：</i><br />
          <strong>1、琴键显示：</strong>有四个开关按键，分别对应不同的显示内容，其中简谱名和唱名不可同时关闭或开启。<br />
          <strong>2、音色设置：</strong>除钢琴外，你可以设置其它不同的乐器，但是其它乐器的音域可能有所缺失。<br />
          <strong>3、弹奏设置：</strong>选择“当按下一个字母时后”时即为每个字母对应一个发音，而“当打完一个单词时”时即为每个单词对应一个发音。<br />
        </p>
        <p className='chinaMap-rule-modal'>
          <i>其它说明：</i><br />
          <strong>1、</strong>打字模式和简谱模式的乐谱不相同。<br />
          <strong>2、</strong>只有打字模式在演奏结束后有速度、正确率和用时的数据显示。<br />
        </p>
      </ChinaMapHelpWrapper>
    )
  }
  const dictCardHelpModal = () => {
    return (
      <ChinaMapHelpWrapper>
        <p className='chinaMap-rule-intro'>
          这是一个可以帮助你练习打字的小项目，你可以在这里对五笔编码进行打字练习，也可以根据拼音进行打字，还可以对不同词组进行收藏；或者搜索你想要找的词组，你可以使用汉字、拼音和五笔编码三种方式进行检索；遇到不认识的字？想汉字的详细注释？你都可以在卡片的右上角进行查看。以下是不同练习模式的说明。
        </p>
        <p className='chinaMap-rule-modal'>
          <i>模式：</i><br />
          <strong>1、五笔模式：</strong>这个模式下提供了五笔输入法所需的一级简码、二级简码、词语、成语等不同类型的分类，你可以根据你目前的学习进度，选择最合适的分类进行练习。<br />
          <strong>2、收藏模式：</strong>这个模式下显示的卡片都是你在五笔模式和搜索模式下收藏的词组，点击下方工具栏的收藏图标可以进入到这里，再次点击即可返回，你可以在这里进行重难点字词的重温，巩固你的记忆，当你真正学会了某个词组后，你不再需要对它进行练习时，你可以对它取消收藏。<br />
          <strong>3、搜索模式：</strong>这个模式下显示的卡片是你在输入框里进行搜索时的搜索结果，在输入框输入你要检索的关键字（字词、拼音或五笔编码）后，点击输入框前面的放大镜图标按钮就会进行这个模式，跟收藏模式相同的是，这里提供了单字、词组和成语的不同分类，这让你的检索结果条理更加清晰。
        </p>
        <p className='chinaMap-rule-modal'>
          <i>设置说明：</i><br />
          <strong>1、随机设置：</strong>随机设置只针对数量少的分类下的词组，如一级简码、字根、键名汉字等有清晰顺序的分类。<br />
          <strong>2、难度设置：</strong>难度设置只针对数量多的分类下的词组，数量较少或的，如一级简码、字根、键名汉字等无难度设置。<br />
          <strong>3、数量设置：</strong>数量设置只针对数量多的分类下的词组，数量较少或的，如一级简码、字根、键名汉字等无数量设置。<br />
        </p>
        <p className='chinaMap-rule-modal'>
          <i>其它说明：</i><br />
          <strong>1、</strong>目前只可查看汉字的详细注释，词组和成语暂不支持。<br />
          <strong>2、</strong>分享功能正在开发中，暂不支持。<br />
          <strong>3、</strong>取消收藏只可在收藏模式下进行。<br />
        </p>
      </ChinaMapHelpWrapper>
    )
  }

  return (
    <Modal
      title="帮助"
      open={isVisible}
      onCancel={() => closeModal()}
      centered={true}
      wrapClassName="helpModalWrapper"
      footer={null}
    >
      {componentsName === 'demoTools' ? demoToolsHelpModal() : null}
      {componentsName === 'chinaMap' ? chinaMapHelpModal() : null}
      {componentsName === 'piano' ? pianoHelpModal() : null}
      {componentsName === 'dictCard' ? dictCardHelpModal() : null}
    </Modal>
  )
}
