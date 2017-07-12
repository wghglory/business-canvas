import $ from 'jquery'
import { fabric } from 'fabric'

import CanvasImage from './FabricGraphs/CanvasImage'
import GraphFactory from './FabricGraphs/GraphFactory'
import Inspector from './Inspector'

export default class BusinessCanvas {
    constructor() {
        this.doms = {
            $canvasArea: $('.canvas-area'),
            $mainCanvas: $('#mainCanvas'),
            $creators: $('.graphic-object'),
            $deleteButton: $('.delete'),
            $fileUploader: $('input[type=file]'),
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

        this.bindDeleteObject.call(this)
        this.bindToolsClick()
        this.bindImageUpload()
    }

    bindDeleteObject() {
        this.doms.$deleteButton.on('click', () => {
            const currentObj = this.canvas.getActiveObject()
            currentObj && currentObj.remove()
            Inspector.clearInspector()
        })
    }

    bindToolsClick() {
        const _instance = this
        this.doms.$creators.on('click', function() {
            const type = $(this).attr('type')

            if (type === 'Image') {
                _instance.doms.$fileUploader.trigger('click')
                return
            }

            _instance.createdObj = GraphFactory.createGraph(type)

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
                    const image = new CanvasImage({
                        imageObj,
                        left: 100,
                        top: 100,
                        stroke: ''
                    }).createGraph()

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