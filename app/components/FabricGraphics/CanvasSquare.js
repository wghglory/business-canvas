import Graphic from './Graphic'
import { fabric } from 'fabric'

export default class CanvasSquare extends Graphic {
    constructor({
        graphic,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        length = 100
    }) {
        super(graphic, top, left, fill, stroke, strokeWidth)
        this.width = length
        this.height = length
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
