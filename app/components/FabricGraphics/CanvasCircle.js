import Graphic from './Graphic'
import { fabric } from 'fabric'

export default class CanvasCircle extends Graphic {
    constructor({
        fabricObj,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        radius = 100
    }) {
        super(fabricObj, top, left, fill, stroke, strokeWidth)
        this.radius = radius
    }

    createFabricObj() {
        this.fabricObj = new fabric.Circle({
            radius: this.radius,
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