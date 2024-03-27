import { CurvedEdge, CurvedEdgeModel } from "@logicflow/extension";
import { getShapeStyleFuction, getTextStyleFunction } from '../getShapeStyleUtil'
import { h } from '@logicflow/core'

// 圆角折线 CurvedEdge
class curvedEdgeModel extends CurvedEdgeModel {
    initEdgeData(data) {
        super.initEdgeData(data);
        this.radius = 5;
        this.strokeWidth = 1
    }
    getTextStyle() {
        const style = super.getTextStyle()
        return getTextStyleFunction(style, this.properties)
    }
    getEdgeStyle() {
        const attributes = super.getEdgeStyle();
        const properties = this.properties;
        const style = getShapeStyleFuction(attributes, properties)
        return { ...style, fill: 'none' };
    }
    // 动画效果
    // setAttributes() {
    //     this.isAnimation = true;
    // }
    // getEdgeAnimationStyle() {
    //     const style = super.getEdgeAnimationStyle();
    //     style.strokeDasharray = "15 5";
    //     style.animationDuration = "10s";
    //     style.stroke = "rgb(130, 179, 102)";
    //     return style;
    // }
}

class curvedEdge extends CurvedEdge {
    getStartArrow() {
        const { model, graphModel } = this.props;
        const {
            id,
            properties: { startArrowType, arrowStyle },
        } = model;
        const { stroke, strokeWidth } = model.getArrowStyle();
        const pathAttr = {
            stroke,
            strokeWidth,
        };
        if (startArrowType) {
            if (arrowStyle === "triangle-full1") {
                return h("path", {
                    ...pathAttr,
                    d: "M 0 0 10 -6 10 6 z",
                });
            } else if (arrowStyle === "triangle-full2") {
                return h("path", {
                    ...pathAttr,
                    d: "M 0 0 L 10 -6 L -3 0 L 10 6 Z",
                });
            } else if (arrowStyle === "triangle-hollow") {
                return h("path", {
                    ...pathAttr,
                    fill: "#FFF",
                    d: "M 0 0 L 10 -6 L 10 6 Z",
                });
            } else if (arrowStyle === "triangle-solid") {
                return h("path", {
                    ...pathAttr,
                    fill: "#FFF",
                    d: "M 10 -6 L 0 0 L 10 6 M 0 0 L 10 0",
                });
            } else if (arrowStyle === "round-full") {
                return h("path", {
                    ...pathAttr,
                    d: "M 0 0 A 5 5 0 0 1 10 0 A 5 5 0 0 1 0 0 Z",
                });
            } else if (arrowStyle === "round-hollow") {
                return h("path", {
                    ...pathAttr,
                    fill: "#fff",
                    d: "M 0 0 A 5 5 0 0 1 10 0 A 5 5 0 0 1 0 0 Z",
                });
            } else if (arrowStyle === "none") {
                return;
            }
        }
        return;
    }
    getEndArrow() {
        const { model, graphModel } = this.props;
        const {
            id,
            properties: { endArrowType, arrowStyle },
        } = model;
        const { stroke, strokeWidth } = model.getArrowStyle();
        const pathAttr = {
            stroke,
            strokeWidth,
        };
        if (endArrowType) {
            if (arrowStyle === "triangle-full1") {
                // 箭头样式为实心
                return h("path", {
                    ...pathAttr,
                    d: "M 0 0 -10 -6 -10 6 z",
                });
            } else if (arrowStyle === "triangle-full2") {
                // M -10 0 -20 -5 -30 0 -20 5 z 菱形
                return h("path", {
                    ...pathAttr,
                    d: "M 0 0 L -10 -6 L -3 0 L -10 6 Z",
                });
            } else if (arrowStyle === "triangle-hollow") {
                return h("path", {
                    ...pathAttr,
                    fill: "#FFF",
                    d: "M 0 0 L -10 -6 L -10 6 Z",
                });
            } else if (arrowStyle === "triangle-solid") {
                return h("path", {
                    ...pathAttr,
                    fill: "#FFF",
                    d: "M -10 -6 L 0 0 L -10 6 M 0 0 L -10 0",
                });
            } else if (arrowStyle === "round-full") {
                return h("path", {
                    ...pathAttr,
                    d: "M 0 0 A 5 5 0 0 1 -10 0 A 5 5 0 0 1 0 0 Z",
                });
            } else if (arrowStyle === "round-hollow") {
                return h("path", {
                    ...pathAttr,
                    fill: "#fff",
                    d: "M 0 0 A 5 5 0 0 1 -10 0 A 5 5 0 0 1 0 0 Z",
                });
            } else if (arrowStyle === "none") {
                return;
            }
        }
        return;
    }
}

export default {
    type: 'pro-curved',
    view: curvedEdge,
    model: curvedEdgeModel
}