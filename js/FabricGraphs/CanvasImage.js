import Graph from './Graph';
import { fabric } from 'fabric';

export default class CanvasImage extends Graph {
    constructor({
        graph,
        top,
        left,
        fill,
        stroke,
        strokeWidth,
        // customize
        imageObj
    }) {
        super(graph, top, left, fill, stroke, strokeWidth);
        this.imageObj = imageObj;
        this.stroke = stroke;
    }

    createGraph() {
        this.graph = new fabric.Image(this.imageObj, {
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