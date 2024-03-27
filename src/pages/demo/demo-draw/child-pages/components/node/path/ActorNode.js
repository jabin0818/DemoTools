import { h } from '@logicflow/core'
import { RectResize } from '@logicflow/extension'
import { getShapeStyleFuction, getTextStyleFunction } from '../getShapeStyleUtil'
// 人物
class ActorModel extends RectResize.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 40;
    this.height = 80;
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

class ActorView extends RectResize.view {
  getResizeShape() {
    const { x, y, width, height } = this.props.model
    const style = this.props.model.getNodeStyle()
    // 人物头部圆形
    const ellipseAttrs = {
      ...style,
      cx: x,
      cy: y - 3 / 8 * height,
      rx: 1 / 4 * width,
      ry: 1 / 8 * height,
      width,
      height
    }
    // 人物肩膀横线
    const pathAAttrs = {
      ...style,
      d: `M ${x - 1 / 2 * width} ${y - 1 / 8 * height} L ${x + 1 / 2 * width} ${y - 1 / 8 * height}`
    }
    // 人物身体躯干竖线
    const pathBAttrs = {
      ...style,
      d: `M ${x} ${y - 1 / 4 * height} L ${x} ${y + 1 / 5 * height}`
    }
    // 人物左腿斜线
    const pathCAttrs = {
      ...style,
      d: `M ${x} ${y + 1 / 5 * height} L ${x - 1 / 2 * width} ${y + 1 / 2 * height}`
    }
    // 人物右腿斜线
    const pathDAttrs = {
      ...style,
      d: `M ${x} ${y + 1 / 5 * height} L ${x + 1 / 2 * width} ${y + 1 / 2 * height}`
    }
    // 人物透明背景板
    const bgAttrs = {
      x: x - 1 / 5 * width,
      y: y - 1 / 2 * height,
      width: 2 / 5 * width,
      height,
      style: 'fill: transparent'
    }
    return h('g', {}, [
      h('ellipse', {
        ...ellipseAttrs,
      }),
      h('path', {
        ...pathAAttrs,
      }),
      h('path', {
        ...pathBAttrs
      }),
      h('path', {
        ...pathCAttrs
      }),
      h('path', {
        ...pathDAttrs
      }),
      h('rect', {
        ...bgAttrs
      })
    ]
    );
  }
}

export default {
  type: 'actor',
  view: ActorView,
  model: ActorModel
}