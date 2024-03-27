import { h } from '@logicflow/core'
import { RectResize } from '@logicflow/extension'
import { getShapeStyleFuction, getTextStyleFunction } from '../getShapeStyleUtil'

// 圆柱体
class CylindeModel extends RectResize.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 60
    this.height = 80
  }
  getNodeStyle() {
    const style = super.getNodeStyle()
    const properties = this.getProperties()
    return getShapeStyleFuction(style, properties)
  }

  getTextStyle() {
    const style = super.getTextStyle()
    const properties = this.getProperties()
    return getTextStyleFunction(style, properties)
  }

  getResizeOutlineStyle() {
    if (this.draggable === false) {
      return {
        stroke: "red",
        strokeWidth: 1,
        strokeDasharray: "3,3",
      };
    }
    return {
      stroke: "#249ffd",
      strokeWidth: 1,
      strokeDasharray: "3,3",
    };
  }

  // 锚点样式
  getAnchorStyle(anchorInfo) {
    const style = super.getAnchorStyle(anchorInfo);
    style.stroke = "rgba(36, 159, 253, 1)";
    style.r = 3;
    style.hover.r = 8;
    style.hover.fill = "rgba(255, 255, 255, 1)";
    style.hover.stroke = "rgba(36, 159, 253, .8)";
    return style;
  }

  getControlPointStyle() {
    return {
      width: 7,
      height: 7,
      fill: "rgba(255, 255, 255, 1)",
      stroke: "rgba(36, 159, 253, 1)",
    };
  }
}

class CylindeView extends RectResize.view {
  getResizeShape() {
    const { x, y, width, height } = this.props.model
    const style = this.props.model.getNodeStyle()
    // 圆柱体顶部椭圆
    const ellipseAAttrs = {
      ...style,
      cx: x,
      cy: y - 1 / 3 * height,
      rx: 1 / 2 * width,
      ry: 1 / 6 * height,
      width,
      height
    }
    // 圆柱体左直线 
    const pathAAttrs = {
      ...style,
      d: `M ${x - 1 / 2 * width} ${y - 1 / 3 * height} L ${x - 1 / 2 * width} ${y + 1 / 3 * height}`
    }
    // 圆柱体右直线
    const pathBAttrs = {
      ...style,
      d: `M ${x + 1 / 2 * width} ${y - 1 / 3 * height} L ${x + 1 / 2 * width} ${y + 1 / 3 * height}`
    }
    // 圆柱体下椭圆
    const ellipseBAttrs = {
      ...style,
      cx: x,
      cy: y + 1 / 3 * height,
      rx: 1 / 2 * width,
      ry: 1 / 6 * height,
      width,
      height
    }
    // 圆柱体中间填充部分
    const rectAttrs = {
      ...style,
      x: x - 1 / 2 * width,
      y: y - 1 / 3 * height,
      width,
      height: 2 / 3 * height,
      stroke: 'transparent'
    }
    return h('g', {}, [
      h('ellipse', {
        ...ellipseBAttrs
      }),
      h('rect', {
        ...rectAttrs
      }),
      h('path', {
        ...pathAAttrs
      }),
      h('path', {
        ...pathBAttrs
      }),
      h('ellipse', {
        ...ellipseAAttrs
      })
    ])
  }
}

export default {
  type: 'cylinde',
  model: CylindeModel,
  view: CylindeView
}