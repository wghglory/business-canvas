export default class Graphic {
    constructor({
        graphic, // class property that has no relationship with Fabrics
        top = 100,
        left = 100,
        fill = '',
        stroke = 'red',
        strokeWidth = 1
    } = {}) {
        this.graphic = graphic
        this.top = top
        this.left = left
        this.fill = fill
        this.stroke = stroke
        this.strokeWidth = strokeWidth
    }
}
