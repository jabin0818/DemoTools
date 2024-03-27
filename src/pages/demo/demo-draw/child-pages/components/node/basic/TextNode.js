import { TextNodeModel, TextNode } from '@logicflow/core'
import { getShapeStyleFuction, getTextStyleFunction } from '../getShapeStyleUtil'

// 文本节点
class TextNewNode extends TextNode {
}
class TextNewModel extends TextNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle()
    const properties = this.getProperties()
    return getShapeStyleFuction(style, properties)
  }

  getTextStyle() {
    const style = super.getTextStyle()
    const properties = this.getProperties()
    if (properties.backgroundColor) {
      style.backgroundStyle = {
        fill: properties.backgroundColor
      }
    }
    return getTextStyleFunction(style, properties)
  }

  getResizeOutlineStyle() {
    const properties = this.properties;
    // if (properties.status === "lock") {
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

  setAttributes(item) {
    super.setAttributes()
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
    if (!this.text.value) {
      this.text.value = 'text'
    }
  }
}

export default {
  type: 'pro-text',
  view: TextNewNode,
  model: TextNewModel
}
