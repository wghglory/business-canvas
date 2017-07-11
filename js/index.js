'use strict';
import $ from 'jquery';
import {
    fabric
} from 'fabric';

import CanvasCircle from './CanvasCircle';
import CanvasEllipse from './CanvasEllipse';
import CanvasLine from './CanvasLine';
import CanvasTriangle from './CanvasTriangle';
import CanvasRect from './CanvasRect';
import CanvasSquare from './CanvasSquare';
import CanvasText from './CanvasText';
import CanvasTextbox from './CanvasTextBox';
import CanvasImage from './CanvasImage';

class BusinessCanvas {
    constructor() {
        this.doms = {
            $canvasArea: $('.canvas-area'),
            $mainCanvas: $('#mainCanvas'),
            $inspectorArea: $('.inspector-area'),
            $inspector: $('.inspector'),
            $creators: $('.graphic-object'),
            $deleteButton: $('.delete'),
            $fileUploader: $('input[type=file]'),
        };
        // properties on the right 
        this.doms.$left = this.doms.$inspector.find('.left:first');
        this.doms.$top = this.doms.$inspector.find('.top:first');
        this.doms.$text = this.doms.$inspector.find('.text:first');
        this.doms.$fontSize = this.doms.$inspector.find('.font-size:first');
        this.doms.$centerH = this.doms.$inspector.find('.center-h');
        this.doms.$centerV = this.doms.$inspector.find('.center-v');

        this.objects = [];
        this.activeObject;
        this.canvas;

        this.init(this.canvas);
    }

    init() {
        // set canvas width and height
        this.doms.$mainCanvas.attr('width', this.doms.$canvasArea.width()).attr('height', this.doms.$canvasArea.height());
        this.canvas = new fabric.Canvas('mainCanvas');

        this.bindDeleteObject.call(this);
        this.bindCreatorClick();
        this.bindImageUpload();
    }

    bindDeleteObject() {
        this.doms.$deleteButton.on('click', () => {
            const currentObj = this.canvas.getActiveObject();
            currentObj && currentObj.remove();
            this.clearInspector();
        });
    }
    clearInspector() {
        this.doms.$left.val('');
        this.doms.$top.val('');
        this.doms.$text.val('');
        this.doms.$fontSize.val('');

        this.doms.$inspectorArea.hide();
    }

    bindCreatorClick() {
        const _instance = this;
        this.doms.$creators.on('click', function () {
            // _instance.activeObject = new GraphFactory({}).createGraph($(this).attr('type'));
            // _instance.syncCanvasToInspector(_instance.activeObject);
            // _instance.syncInspectorToCanvas();
            // _instance.render(_instance.activeObject);
            _instance.createGraphObject.call(_instance, $(this).attr('type'));
        });
    }

    createGraphObject(type) {
        // Create Image
        if (type === 'Image') {
            this.doms.$fileUploader.trigger('click');
            return;
        }

        // Other types 
        switch (type) {
            case 'Line':
                this.activeObject = new CanvasLine({
                    x1: 10,
                    y1: 10,
                    x2: 100,
                    y2: 10
                }).createGraph();
                break;
            case 'Circle':
                this.activeObject = new CanvasCircle({
                    radius: 50
                }).createGraph();
                break;
            case 'Ellipse':
                this.activeObject = new CanvasEllipse({
                    rx: 50,
                    ry: 25
                }).createGraph();
                break;
            case 'Triangle':
                this.activeObject = new CanvasTriangle({
                    width: 50,
                    height: 95
                }).createGraph();
                break;
            case 'Rect':
                this.activeObject = new CanvasRect({
                    width: 100,
                    height: 150
                }).createGraph();
                break;
            case 'Square':
                this.activeObject = new CanvasSquare({
                    length: 48
                }).createGraph();
                break;
            case 'Text':
                this.activeObject = new CanvasText({
                    text: 'hello'
                }).createGraph();
                break;
            case 'Textbox':
                this.activeObject = new CanvasTextbox({}).createGraph();
                break;
            default:
                break;
        }

        this.syncCanvasToInspector(this.activeObject);
        this.syncInspectorToCanvas();
        this.render(this.activeObject);
    }

    bindImageUpload() {
        const _instance = this;

        this.doms.$fileUploader.on('change', (e) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageObj = new Image();
                imageObj.src = event.target.result;
                imageObj.onload = () => {
                    const image = new CanvasImage({
                        imageObj,
                        left: 100,
                        top: 100,
                        stroke: ''
                    }).createGraph();
                    _instance.syncCanvasToInspector(image);
                    _instance.render(image);
                    // canvas.renderAll();
                };
            };
            reader.readAsDataURL(e.target.files[0]);
        });
    }

    render(activeObject) {
        this.canvas.add(activeObject);
        this.objects.push(activeObject);
    }

    syncCanvasToInspector(activeObject) {
        activeObject.on('selected', () => {
            this.doms.$left.val(activeObject.getLeft());
            this.doms.$top.val(activeObject.getTop());
            this.doms.$inspectorArea.show();
            // this.doms.$text.val(activeObject.getText())
            // this.doms.$fontSize.val(activeObject.get('fontSize'))
        });
    }

    syncInspectorToCanvas() {
        const _instance = this;

        this.doms.$left.on('change', function () {
            if (_instance.activeObject === null)
                return;
            const left = parseInt($.trim($(this).val()), 10);
            _instance.activeObject.set({
                left: left
            });
            _instance.canvas.renderAll();
        });

        this.doms.$top.on('change', function () {
            if (_instance.activeObject === null)
                return;
            const top = parseInt($.trim($(this).val()), 10);
            _instance.activeObject.set({
                top: top
            });
            _instance.canvas.renderAll();
        });

        this.doms.$text.on('change', function () {
            if (_instance.activeObject === null)
                return;
            const text = $.trim($(this).val());
            _instance.activeObject.setText(text);
            _instance.canvas.renderAll();
        });

        this.doms.$fontSize.on('change', function () {
            if (_instance.activeObject === null)
                return;
            let size = $.trim($(this).val());
            size = parseInt(size, 10);
            _instance.activeObject.set({
                fontSize: size
            });
            _instance.canvas.renderAll();
        });

        this.doms.$centerH.on('click', function () {
            if (_instance.activeObject === null)
                return;
            _instance.activeObject.viewportCenterH();
        });

        this.doms.$centerV.on('click', function () {
            if (_instance.activeObject === null)
                return;
            _instance.activeObject.viewportCenterV();
        });
    }

}

new BusinessCanvas();