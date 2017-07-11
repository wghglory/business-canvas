import Graph from './Graph';
import { fabric } from 'fabric';

export default class CanvasSquare extends Graph {
    constructor({
        graph,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        length = 100
    }) {
        super(graph, top, left, fill, stroke, strokeWidth);
        this.width = length;
        this.height = length;
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