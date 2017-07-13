import Graphic from './Graphic'
import { fabric } from 'fabric'

export default class CanvasLine extends Graphic {
    constructor({
        fabricObj,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        x1,
        y1,
        x2,
        y2
    }) {
        super(fabricObj, top, left, fill, stroke, strokeWidth)
        this.x1 = x1
        this.x2 = x2
        this.y1 = y1
        this.y2 = y2
    }

    createFabricObj() {
        this.fabricObj = new fabric.Line([
            this.x1, this.y1, this.x2, this.y2
        ], {
            // common
            top: this.top,
            left: this.left,
            fill: this.fill,
            stroke: this.stroke,
            strokeWidth: this.strokeWidth
        })
        return this.fabricObj
    }
}
