import Graphic from './Graphic'
import { fabric } from 'fabric'

export default class CanvasTriangle extends Graphic {
    constructor({
        graphic,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        width = 100,
        height = 100,
        originX = 'center',
    }) {
        super(graphic, top, left, fill, stroke, strokeWidth)
        this.width = width
        this.height = height
        this.originX = originX
    }

    createGraphic() {
        this.graphic = new fabric.Triangle({
            width: this.width,
            height: this.height,
            originX: this.originX,
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
