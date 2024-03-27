import React from 'react'

import { ToolListWrapper } from './style'

import {
  LikeOutlined,
  StarOutlined
} from '@ant-design/icons'
export default function ToolList() {

  const toDemoChinaMap = () => {
    window.open('/demo/chainMap', '_blank');
  }
  const toDemoPiano = () => {
    window.open('/demo/piano', '_blank');
  }

  const toDemoDictCard = () => {
    window.open('/demo/dictCard', '_blank');
  }

  function toDemoDraw() {
    window.open('/demo/draw', '_blank');
  }
  return (
    <ToolListWrapper>
      <ul className='toolList'>
        <li className='toolItem' onClick={() => toDemoChinaMap()}>
          <div className='title'>地理测试器</div>
          <div className='desc'>中国地图地理位置测试</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem' onClick={() => toDemoPiano()}>
          <div className='title'>音乐演奏器</div>
          <div className='desc'>歌曲的演奏与键盘结合</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem' onClick={() => toDemoDictCard()}>
          <div className='title'>打字练习器</div>
          <div className='desc'>使用卡片词组练习打字</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem' onClick={() => toDemoDraw()}>
          <div className='title'>在线绘图工具</div>
          <div className='desc'>流程图/画板/思维导图/备忘录</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>配色器</div>
          <div className='desc'>为你提供多种配色选择</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>密码生成器</div>
          <div className='desc'>为你生成最适合你的密码</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>单位转换器</div>
          <div className='desc'>用于各种单位的转换</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>番茄时钟</div>
          <div className='desc'>开始专注学习时刻</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>文本编辑器</div>
          <div className='desc'>文本二次处理工具</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>算法可视化</div>
          <div className='desc'>排序算法可视化</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>化学元素周期表</div>
          <div className='desc'>元素周期表各特性</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>数独解算器</div>
          <div className='desc'>帮助你解算数独的工具</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>人机对话语料库</div>
          <div className='desc'>仿AI人工智能对话</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>简历在线编辑器</div>
          <div className='desc'>快速制作简历</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>小说打字器</div>
          <div className='desc'>边打字边阅读</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>家谱关系记录器</div>
          <div className='desc'>用于记录家庭历代成员</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>变量生成器</div>
          <div className='desc'>自动生成代码变量</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
        <li className='toolItem'>
          <div className='title'>文章打字练习</div>
          <div className='desc'>全面打字能力评测</div>
          <div className='actions'>
            <div className='actionItem like'>
              <LikeOutlined className='icon' />
            </div>
            <div className='actionItem star'>
              <StarOutlined className='icon' />
            </div>
          </div>
        </li>
      </ul>
    </ToolListWrapper>
  )
}
