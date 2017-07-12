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
            $creators: $('.graphic-object'),
            $fileUploader: $('input[type=file]')
        }

        this.objects = []
        this.createdObj
        this.canvas

        this.init()
    }

    init() {
        // set canvas width and height
        this.doms.$mainCanvas.attr('width', this.doms.$canvasArea.width()).attr('height', this.doms.$canvasArea.height())
        this.canvas = new fabric.Canvas('mainCanvas')

        Inspector.bindDeleteObject(this.canvas)

        this.bindToolsClick()
        this.bindImageUpload()
    }

    bindToolsClick() {
        const _instance = this
        this.doms.$creators.on('click', function() {
            const type = $(this).attr('type')

            if (type === 'Image') {
                _instance.doms.$fileUploader.trigger('click')
                return
            }

            _instance.createdObj = GraphicFactory.createGraphic(type)

            if (_instance.createdObj) {
                Inspector.syncCanvasToInspector(_instance.createdObj)
                Inspector.syncInspectorToCanvas(_instance)
                _instance.render(_instance.createdObj)
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
                    const image = new CanvasImage({imageObj, left: 100, top: 100, stroke: ''}).createGraphic()

                    Inspector.syncCanvasToInspector(image)
                    _instance.render(image)
                    // canvas.renderAll();
                }
            }
            reader.readAsDataURL(e.target.files[0])
        })
    }

    render(createdObj) {
        this.canvas.add(createdObj)
        this.objects.push(createdObj)
    }
}
