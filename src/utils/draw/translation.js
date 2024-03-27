// logicflow源码
export const translationNodeData = (nodeData, distance) => {
    nodeData.x += distance;
    nodeData.y += distance;
    if (nodeData.text) {
        nodeData.text.x += distance;
        nodeData.text.y += distance;
    }
    return nodeData;
}

export const translationEdgeData = (edgeData, distance) => {
    if (edgeData.startPoint) {
        edgeData.startPoint.x += distance;
        edgeData.startPoint.y += distance;
    }
    if (edgeData.endPoint) {
        edgeData.endPoint.x += distance;
        edgeData.endPoint.y += distance;
    }
    if (edgeData.pointsList && edgeData.pointsList.length > 0) {
        edgeData.pointsList.forEach((point) => {
            point.x += distance;
            point.y += distance;
        });
    }
    if (edgeData.text) {
        edgeData.text.x += distance;
        edgeData.text.y += distance;
    }
    return edgeData;
}

// 位置为用户鼠标在画布上的位置
export const translationElementByClient = (elementData, clinetX, clinetY) => {
    elementData.x = clinetX;
    elementData.y = clinetY;
    if (elementData.text) {
        elementData.text.x = clinetX;
        elementData.text.y = clinetY;
    }
    return elementData;
}