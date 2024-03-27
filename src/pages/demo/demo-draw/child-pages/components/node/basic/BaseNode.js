import { BaseNode, BaseNodeModel } from '@logicflow/core'

class BaseNewNode extends BaseNode {
}

class BaseNewModel extends BaseNodeModel {
  setAttributes() {
    this.fill = 'red'
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

  getResizeOutlineStyle() {
    const properties = this.properties;
    if (properties.status === "lock") {
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
}

export default {
  type: 'BaseNode',
  view: BaseNewNode,
  model: BaseNewModel
}
