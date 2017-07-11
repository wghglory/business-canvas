import Graph from './Graph';
import { fabric } from 'fabric';

export default class CanvasEllipse extends Graph {
    constructor({
        graph,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        rx = 100,
        ry = 50
    }) {
        super(graph, top, left, fill, stroke, strokeWidth);
        this.rx = rx;
        this.ry = ry;
    }

    createGraph() {
        this.graph = new fabric.Ellipse({
            rx: this.rx,
            ry: this.ry,
            // common
            top: this.top,
            left: this.left,
            fill: this.fill,
            stroke: this.stroke,
            strokeWidth: this.strokeWidth
        });

        return this.graph;
    }
}