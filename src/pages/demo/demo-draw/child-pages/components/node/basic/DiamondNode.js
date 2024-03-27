import { DiamondResize } from '@logicflow/extension'
import { getShapeStyleFuction, getTextStyleFunction } from '../getShapeStyleUtil'

// 菱形
/**
 * model控制初始化的值
 */
class DiamondModel extends DiamondResize.model {
  initNodeData(data) {
    super.initNodeData(data)
    this.rx = 35
    this.ry = 35
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

  setToBottom() {
    this.zIndex = 0
  }

  setAttributes(item) {
    if (item?.status === "lock") {
      this.draggable = false;
      this.text.editable = false;
      this.text.draggable = false;
      this.maxWidth = this.width;
      this.maxHeight = this.height;
      this.minWidth = this.width;
      this.minHeight = this.height;
    } else if (item?.status === "unlock") {
      this.draggable = true;
      this.text.editable = true;
      // this.text.draggable = true;
      this.maxWidth = 5000;
      this.maxHeight = 5000;
      this.minWidth = 0;
      this.minHeight = 0;
    }

    const size = this.properties.scale || 1;
    if (item?.width) {
      this.rx = (item.width * size) / 2
    }
    if (item?.height) {
      this.ry = (item.height * size) / 2
    }

    if (item?.textAlign) {
      if (item.textAlign === "left") {
        this.text.x = this.x - this.rx
      } else if (item.textAlign === "right") {
        this.text.x = this.x + this.rx
      } else if (item.textAlign === "center") {
        this.text.x = this.x
      }
    }
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

export default {
  type: 'pro-diamond',
  view: DiamondResize.view,
  model: DiamondModel
}
