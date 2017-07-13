import Graphic from './Graphic'
import { fabric } from 'fabric'

export default class CanvasTextbox extends Graphic {
    constructor({
        fabricObj,
        top,
        left,
        fill = '#000',
        stroke = '',
        strokeWidth,
        // customize
        fontSize = 16,
        width = 250,
        height = 150,
        text = '文本框',
        textAlign = 'center',
        fixedWidth = 150
    }) {
        super(fabricObj, top, left, fill, stroke, strokeWidth)
        this.fontSize = fontSize
        this.width = width
        this.height = height
        this.text = text
        this.textAlign = textAlign
        this.fixedWidth = fixedWidth
        // override base
        this.stroke = stroke
        this.fill = fill
    }

    createFabricObj() {
        this.fabricObj = new fabric.Textbox(this.text, {
            fontSize: this.fontSize,
            width: this.width,
            height: this.height,
            textAlign: this.textAlign,
            fixedWidth: this.fixedWidth,
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
