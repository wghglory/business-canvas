import CanvasCircle from './CanvasCircle'
import CanvasEllipse from './CanvasEllipse'
import CanvasLine from './CanvasLine'
import CanvasTriangle from './CanvasTriangle'
import CanvasRect from './CanvasRect'
import CanvasSquare from './CanvasSquare'
import CanvasText from './CanvasText'
import CanvasTextbox from './CanvasTextBox'
// import CanvasImage from './CanvasImage';

/*let GraphicFactory = function () {};
// static class
GraphicFactory.createGraphic = (type, imageObj) => {
    switch (type) {
        case 'Line':
            return new CanvasLine({
                x1: 10,
                y1: 10,
                x2: 100,
                y2: 10
            });
        case 'Circle':
            return new CanvasCircle({
                radius: 50
            });
        case 'Ellipse':
            return new CanvasEllipse({
                rx: 50,
                ry: 25
            });
        case 'Triangle':
            return new CanvasTriangle({
                width: 50,
                height: 95
            });
        case 'Rect':
            return new CanvasRect({
                width: 100,
                height: 150
            });
        case 'Square':
            return new CanvasSquare({
                length: 48
            });
        case 'Text':
            return new CanvasText({
                text: 'hello'
            });
        case 'Textbox':
            return new CanvasTextbox({});
            // case 'Image':
            // return new CanvasImage({
            //     imageObj,
            //     left: 100,
            //     top: 100,
            //     stroke: ''
            // });
        default:
            return null;
    }
};

export default GraphicFactory;*/

export default class GraphicFactory {
    static createGraphic(type) {
        switch (type) {
            case 'Line':
                return new CanvasLine({
                    x1: 10,
                    y1: 10,
                    x2: 100,
                    y2: 10
                })
            case 'Circle':
                return new CanvasCircle({
                    radius: 50
                })
            case 'Ellipse':
                return new CanvasEllipse({
                    rx: 50,
                    ry: 25
                })
            case 'Triangle':
                return new CanvasTriangle({
                    width: 50,
                    height: 95
                })
            case 'Rect':
                return new CanvasRect({
                    width: 100,
                    height: 150
                })
            case 'Square':
                return new CanvasSquare({
                    length: 48
                })
            case 'Text':
                return new CanvasText({
                    text: 'hello'
                })
            case 'Textbox':
                return new CanvasTextbox({})
                // case 'Image':
                // return new CanvasImage({
                //     imageObj,
                //     left: 100,
                //     top: 100,
                //     stroke: ''
                // });
            default:
                return null
        }
    }
}
