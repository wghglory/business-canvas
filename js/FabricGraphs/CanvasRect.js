import Graph from './Graph';
import { fabric } from 'fabric';

export default class CanvasRect extends Graph {
    constructor({
        graph,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        width = 100,
        height = 200,
    }) {
        super(graph, top, left, fill, stroke, strokeWidth);
        this.width = width;
        this.height = height;
    }

    createGraph() {
        this.graph = new fabric.Rect({
            width: this.width,
            height: this.height,
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