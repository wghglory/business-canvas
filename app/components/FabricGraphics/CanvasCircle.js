import Graphic from './Graphic'
import { fabric } from 'fabric'

export default class CanvasCircle extends Graphic {
    constructor({
        graphic,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        radius = 100
    }) {
        super(graphic, top, left, fill, stroke, strokeWidth)
        this.radius = radius
    }

    createGraphic() {
        this.graphic = new fabric.Circle({
            radius: this.radius,
            // common
            top: this.top,
            left: this.left,
            fill: this.fill,
            stroke: this.stroke,
            strokeWidth: this.strokeWidth
        })
        return this.graphic
    }
}
