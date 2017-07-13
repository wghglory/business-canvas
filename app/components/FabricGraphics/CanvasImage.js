import Graphic from './Graphic'
import { fabric } from 'fabric'

export default class CanvasImage extends Graphic {
    constructor({
        fabricObj,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        imageObj
    }) {
        super(fabricObj, top, left, fill, stroke, strokeWidth)
        this.imageObj = imageObj
        this.stroke = stroke
    }

    createFabricObj() {
        this.fabricObj = new fabric.Image(this.imageObj, {
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
