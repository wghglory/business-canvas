import Graph from './Graph'
import { fabric } from 'fabric'

export default class CanvasTriangle extends Graph {
    constructor({
        graph,
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
        super(graph, top, left, fill, stroke, strokeWidth)
        this.width = width
        this.height = height
        this.originX = originX
    }

    createGraph() {
        this.graph = new fabric.Triangle({
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

        return this.graph
    }
}