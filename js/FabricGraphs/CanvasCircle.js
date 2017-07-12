import Graph from './Graph'
import { fabric } from 'fabric'

export default class CanvasCircle extends Graph {
    constructor({
        graph,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        radius = 100
    }) {
        super(graph, top, left, fill, stroke, strokeWidth)
        this.radius = radius
    }

    createGraph() {
        this.graph = new fabric.Circle({
            radius: this.radius,
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