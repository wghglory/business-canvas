'use strict'
import $ from 'jquery'
import {
    fabric
} from 'fabric'

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
        this.doms.$left = this.doms.$inspector.find('.left:first')
        this.doms.$top = this.doms.$inspector.find('.top:first')
        this.doms.$text = this.doms.$inspector.find('.text:first')
        this.doms.$fontSize = this.doms.$inspector.find('.font-size:first')
        this.doms.$centerH = this.doms.$inspector.find('.center-h')
        this.doms.$centerV = this.doms.$inspector.find('.center-v')

        this.objects = []
        this.activeObject
        this.canvas

        this.init(this.canvas);
    }

    init() {
        // set canvas width and height
        this.doms.$mainCanvas.attr('width', this.doms.$canvasArea.width()).attr('height', this.doms.$canvasArea.height())
        this.canvas = new fabric.Canvas('mainCanvas')

        this.bindDeleteObject.call(this);
        this.bindCreatorClick();
        this.bindImageUpload();
    }

    bindDeleteObject() {
        this.doms.$deleteButton.on('click', () => {
            const currentObj = this.canvas.getActiveObject();
            currentObj && currentObj.remove();
            this.clearInspector();
        })
    }

    bindCreatorClick() {
        const _instance = this;
        this.doms.$creators.on('click', function () {
            _instance.createFabricObject.call(_instance, $(this).attr('type'))
        });
    }

    clearInspector() {
        this.doms.$left.val('')
        this.doms.$top.val('')
        this.doms.$text.val('')
        this.doms.$fontSize.val('')

        this.doms.$inspectorArea.hide()
    }

    createFabricObject(type) {
        // Create Image
        if (type === 'Image') {
            this.doms.$fileUploader.trigger('click')
            return;
        }

        // Other types 
        switch (type) {
            case 'Line':
                this.activeObject = this.createLine();
                break;
            case 'Circle':
                this.activeObject = this.createCircle();
                break;
            case 'Triangle':
                this.activeObject = this.createTriangle();
                break;
            case 'Text':
                this.activeObject = this.createText();
                break;
            case 'Ellipse':
                this.activeObject = this.createEllipse();
                break;
            case 'Rect':
                this.activeObject = this.createRect();
                break
            case 'Square':
                this.activeObject = this.createSquare();
                break
            case 'TextBox':
                this.activeObject = this.createTextBox();
                break
            default:
                break
        }

        this.syncCanvasToInspector(this.activeObject);
        this.syncInspectorToCanvas();
        this.render(this.activeObject);
    }

    bindImageUpload() {
        const _instance = this;

        this.doms.$fileUploader.on('change', (e) => {
            console.log(1)
            const reader = new FileReader()
            reader.onload = (event) => {
                const imageObj = new Image()
                imageObj.src = event.target.result
                imageObj.onload = () => {
                    const image = new fabric.Image(imageObj, {
                        left: 100,
                        top: 100
                    })
                    _instance.syncCanvasToInspector(image)
                    _instance.render(image);
                    // canvas.renderAll();
                }
            }
            reader.readAsDataURL(e.target.files[0])
        })
    }

    createLine() {
        return new fabric.Line([
            10, 10, 100, 10
        ], {
            left: 50,
            top: 100,
            stroke: 'red'
        })
    }

    createCircle() {
        return new fabric.Circle({
            radius: 100,
            fill: '',
            stroke: 'red',
            strokeWidth: 2,
            left: 100,
            top: 100
        })
    }
    createTriangle() {
        return new fabric.Triangle({
            left: 120,
            top: 120,
            width: 100,
            height: 100,
            originX: 'center',
            strokeWidth: 2,
            stroke: 'black',
            fill: ''
        })
    }
    createText() {
        return new fabric.Text('默认文字', {
            left: 120,
            top: 120,
            fontSize: 30,
            originX: 'center',
            originY: 'center',
            fill: '#000'
        })
    }
    createEllipse() {
        return new fabric.Ellipse({
            rx: 150,
            ry: 100,
            scaleX: 1,
            scaleY: 1,
            fill: '',
            stroke: 'red',
            strokeWidth: 2,
            left: 100,
            top: 100
        })
    }

    createRect() {
        return new fabric.Rect({
            width: 150,
            height: 100,
            scaleX: 1,
            scaleY: 1,
            fill: '',
            stroke: 'red',
            strokeWidth: 2,
            left: 100,
            top: 100
        })
    }
    createSquare() {
        return new fabric.Rect({
            width: 100,
            height: 100,
            fill: '',
            stroke: 'red',
            strokeWidth: 2,
            left: 100,
            top: 100
        })
    }
    createTextBox() {
        return new fabric.Textbox('文本框', {
            width: 250,
            height: 200,
            top: 5,
            left: 5,
            fontSize: 16,
            textAlign: 'center',
            fixedWidth: 150
        })
    }

    render(activeObject) {
        this.canvas.add(activeObject)
        this.objects.push(activeObject)
    }

    syncCanvasToInspector(activeObject) {
        activeObject.on('selected', () => {
            this.doms.$left.val(activeObject.getLeft())
            this.doms.$top.val(activeObject.getTop())
            this.doms.$inspectorArea.show()
            // this.doms.$text.val(activeObject.getText())
            // this.doms.$fontSize.val(activeObject.get('fontSize'))
        })
    }

    syncInspectorToCanvas() {
        const _instance = this;

        this.doms.$left.on('change', function () {
            if (_instance.activeObject === null)
                return
            const left = parseInt($.trim($(this).val()), 10)
            _instance.activeObject.set({
                left: left
            })
            _instance.canvas.renderAll()
        })

        this.doms.$top.on('change', function () {
            if (_instance.activeObject === null)
                return
            const top = parseInt($.trim($(this).val()), 10)
            _instance.activeObject.set({
                top: top
            })
            _instance.canvas.renderAll()
        })

        this.doms.$text.on('change', function () {
            if (_instance.activeObject === null)
                return
            const text = $.trim($(this).val())
            _instance.activeObject.setText(text)
            _instance.canvas.renderAll()
        })

        this.doms.$fontSize.on('change', function () {
            if (_instance.activeObject === null)
                return
            let size = $.trim($(this).val())
            size = parseInt(size, 10)
            _instance.activeObject.set({
                fontSize: size
            })
            _instance.canvas.renderAll()
        })

        this.doms.$centerH.on('click', function () {
            if (_instance.activeObject === null)
                return
            _instance.activeObject.viewportCenterH()
        })

        this.doms.$centerV.on('click', function () {
            if (_instance.activeObject === null)
                return
            _instance.activeObject.viewportCenterV()
        })
    }

}

new BusinessCanvas();