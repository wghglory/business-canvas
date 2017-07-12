import Graphic from './Graphic'
import { fabric } from 'fabric'

export default class CanvasRect extends Graphic {
    constructor({
        graphic,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        width = 100,
        height = 200,
    }) {
        super(graphic, top, left, fill, stroke, strokeWidth)
        this.width = width
        this.height = height
    }

    createGraphic() {
        this.graphic = new fabric.Rect({
            width: this.width,
            height: this.height,
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
