import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { changeHelpIsVisible, changeHelpComponentsName } from '@/store/actions/global';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import React from 'react'

export default function FloatBtn() {

  // redux
  const dispatch = useDispatch()

  return (
    <>
      <FloatButton.Group
        shape="circle"
        style={{
          right: 24,
        }}
      >
        <FloatButton icon={<QuestionCircleOutlined />} onClick={() => dispatch(changeHelpIsVisible(true))} />
        <FloatButton icon={<SettingOutlined />} />
        <FloatButton.BackTop visibilityHeight={400} />
      </FloatButton.Group>
    </>
  )
}
