import CanvasCircle from './CanvasCircle';
import CanvasEllipse from './CanvasEllipse';
import CanvasLine from './CanvasLine';
import CanvasTriangle from './CanvasTriangle';
import CanvasRect from './CanvasRect';
import CanvasSquare from './CanvasSquare';
import CanvasText from './CanvasText';
import CanvasTextbox from './CanvasTextBox';
import CanvasImage from './CanvasImage';

// static class
let GraphFactory = function () {};
GraphFactory.createGraph = (type, imageObj) => {
    switch (type) {
        case 'Line':
            return new CanvasLine({
                x1: 10,
                y1: 10,
                x2: 100,
                y2: 10
            }).createGraph();
        case 'Circle':
            return new CanvasCircle({
                radius: 50
            }).createGraph();
        case 'Ellipse':
            return new CanvasEllipse({
                rx: 50,
                ry: 25
            }).createGraph();
        case 'Triangle':
            return new CanvasTriangle({
                width: 50,
                height: 95
            }).createGraph();
        case 'Rect':
            return new CanvasRect({
                width: 100,
                height: 150
            }).createGraph();
        case 'Square':
            return new CanvasSquare({
                length: 48
            }).createGraph();
        case 'Text':
            return new CanvasText({
                text: 'hello'
            }).createGraph();
        case 'Textbox':
            return new CanvasTextbox({}).createGraph();
            // case 'Image':
            // return new CanvasImage({
            //     imageObj,
            //     left: 100,
            //     top: 100,
            //     stroke: ''
            // }).createGraph();
        default:
            return null;
    }
};

export default GraphFactory;