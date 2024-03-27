import RectNode from './RectNode'

// 带圆角的矩形
class RectRadiusModel extends RectNode.model {
  setAttributes(item) {
    super.setAttributes(item)
    if (item?.radius) {
      this.radius = item.radius
    } else {
      this.radius = 20
    }
  }
}
export default {
  type: 'rect-radius',
  view: RectNode.view,
  model: RectRadiusModel
}
