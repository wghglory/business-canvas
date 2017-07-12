import Graphic from './Graphic'
import { fabric } from 'fabric'

export default class CanvasEllipse extends Graphic {
    constructor({
        graphic,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        rx = 100,
        ry = 50
    }) {
        super(graphic, top, left, fill, stroke, strokeWidth)
        this.rx = rx
        this.ry = ry
    }

    createGraphic() {
        this.graphic = new fabric.Ellipse({
            rx: this.rx,
            ry: this.ry,
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
