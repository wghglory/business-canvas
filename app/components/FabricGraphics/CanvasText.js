import Graphic from './Graphic'
import { fabric } from 'fabric'

export default class CanvasText extends Graphic {
    constructor({
        fabricObj,
        top,
        left,
        fill = '#000',
        stroke = '',
        strokeWidth,
        // customize
        fontSize = 30,
        originX = 'center',
        originY = 'center',
        text = '默认文字'
    }) {
        super(fabricObj, top, left, fill, stroke, strokeWidth)
        this.fontSize = fontSize
        this.originX = originX
        this.originY = originY
        this.text = text
        // override base
        this.stroke = stroke
        this.fill = fill
    }

    createFabricObj() {
        this.fabricObj = new fabric.Text(this.text, {
            fontSize: this.fontSize,
            originX: this.originX,
            originY: this.originY,
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
