import { h } from '@logicflow/core'
import { RectResize } from '@logicflow/extension'
import { getShapeStyleFuction, getTextStyleFunction } from '../getShapeStyleUtil'

// 平行四边形
class ParallelogramModel extends RectResize.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 100
    this.height = 60
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

class ParallelogramView extends RectResize.view {
  getResizeShape() {
    const { x, y, width, height } = this.props.model;
    const style = this.props.model.getNodeStyle();
    const pointList = [
      [x - width / 2, y + height / 2],
      [x - width / 5, y - height / 2],
      [x + width / 2, y - height / 2],
      [x + width / 5, y + height / 2]
    ];
    const points = pointList.map(item => {
      return `${item[0]},${item[1]}`
    })
    const attrs = {
      ...style,
      x,
      y,
      width,
      height,
      points: points.join(' ')
    }
    return h('g', {}, [
      h('polygon', { ...attrs })
    ]
    )
  }
}

export default {
  type: 'parallelogram',
  view: ParallelogramView,
  model: ParallelogramModel
}