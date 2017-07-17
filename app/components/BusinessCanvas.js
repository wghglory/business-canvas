import $ from 'jquery'
import { fabric } from 'fabric'

import CanvasImage from './FabricGraphics/CanvasImage'
import GraphicFactory from './FabricGraphics/GraphicFactory'
import Inspector from './Inspector'

export default class BusinessCanvas {
    constructor() {
        this.doms = {
            $canvasArea: $('.canvas-area'),
            $mainCanvas: $('#mainCanvas'),
            $previewCanvas: $('#previewCanvas'),
            $creators: $('.graphic-object'),
            $fileUploader: $('input[type=file]'),
            $save: $('.save') // this might be in other classes, now only for demo purpose
        }

        this.objects = []
        this.fabricObj
        this.canvas

        this.init()
    }

    init() {
        // set canvas width and height
        this.doms.$mainCanvas.attr('width', this.doms.$canvasArea.width()).attr('height', this.doms.$canvasArea.height())
        this.doms.$previewCanvas.attr('width', this.doms.$canvasArea.width()).attr('height', this.doms.$canvasArea.height())
        this.canvas = new fabric.Canvas('mainCanvas')
        this.previewCanvas = new fabric.Canvas('previewCanvas')

        Inspector.bindDeleteObject(this.canvas)

        this.bindToolsClick()
        this.bindImageUpload()
        this.bindSave(this.canvas)
    }

    bindToolsClick() {
        const _instance = this
        this.doms.$creators.on('click', function() {
            const type = $(this).attr('type')

            if (type === 'Image') {
                _instance.doms.$fileUploader.trigger('click')
                return
            }

            // note: GraphicFactory.createGraphic(type) returns CanvasCircle or likewise, not fabric obj
            // to get fabric obj: let fabricObj = graphic.createFabricObj()
            const graphic = GraphicFactory.createGraphic(type)
            const fabricObj = graphic.createFabricObj()
            _instance.fabricObj = fabricObj

            if (_instance.fabricObj) {
                Inspector.syncCanvasToInspector(graphic, fabricObj)
                Inspector.syncInspectorToCanvas(_instance)
                _instance.render(fabricObj)
            }
        })
    }

    bindImageUpload() {
        const _instance = this

        this.doms.$fileUploader.on('change', (e) => {
            const reader = new FileReader()
            reader.onload = (event) => {
                const imageObj = new Image()
                imageObj.src = event.target.result
                imageObj.onload = () => {
                    const graphic = new CanvasImage({ imageObj, left: 100, top: 100, stroke: '' })
                    const image = graphic.createFabricObj()

                    Inspector.syncCanvasToInspector(graphic, image)
                    _instance.render(image)
                    // canvas.renderAll();
                }
            }
            reader.readAsDataURL(e.target.files[0])
        })
    }

    render(fabricObj) {
        this.canvas.add(fabricObj)
        this.objects.push(fabricObj)
    }

    bindSave(canvas) {
        const _canvas = canvas
        this.doms.$save.on('click', (function() {
            const data = _canvas.toObject()
            // todo: save to json or database
            this.showPreview(data)
        }).bind(this))
    }

    showPreview(data) {
        this.previewCanvas.loadFromJSON(data)
    }
}