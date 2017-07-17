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
            $dataArea: $('.data-area'),
            $creators: $('.graphic-object'),
            $fileUploader: $('input[type=file]'),
            $selectAll: $('.select-all'),
            $delete: $('.delete'),
            $clear: $('.clear'),
            $save: $('.save'), // this might be in other classes, now only for demo purpose
            $moveup: $('.moveup'),
            $movedown: $('.movedown')
        }

        this.objects = []
        this.fabricObj
        this.fabricObjs = []
        this.canvas
        this.previewCanvas

        this.init()
    }

    init() {
        // set canvas width and height
        this.doms.$mainCanvas.attr('width', this.doms.$canvasArea.width()).attr('height', this.doms.$canvasArea.height())
        this.doms.$previewCanvas.attr('width', this.doms.$canvasArea.width()).attr('height', this.doms.$canvasArea.height())
        this.canvas = new fabric.Canvas('mainCanvas')
        this.previewCanvas = new fabric.Canvas('previewCanvas')

        this.bindToolsClick()
        this.bindImageUpload()

        this.bindSelectAll(this.canvas)
        this.bindClear(this.canvas)
        this.bindDeleteObject(this.canvas, Inspector)
        this.bindSave(this.canvas)

        this.bindMoveUpOrDown()
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

    bindClear(canvas) {
        this.doms.$clear.on('click', () => {
            // remove all objects and re-render
            canvas.clear().renderAll()
        })
    }

    bindDeleteObject(canvas, Inspector) {
        const _instance = this
        this.doms.$delete.on('click', () => {
            const currentObj = canvas.getActiveObject()
            console.log(currentObj)
            if (currentObj) {
                currentObj.remove()
            } else {
                for (let o of _instance.fabricObjs) {
                    o.remove()
                }
                canvas.renderAll()
            }
            Inspector.clearInspector()
        })
    }

    // todo: select once, add another new, select again...(bug: position changes)
    bindSelectAll(canvas) {
        const _instance = this
        this.doms.$selectAll.on('click', () => {
            const objects = canvas.getObjects().map(function(o) {
                _instance.fabricObjs.push(o)
                return o.set('active', true)
            })

            const group = new fabric.Group(objects, {
                originX: 'center',
                originY: 'center'
            })

            canvas.fabricObj = null
            // canvas._activeObject = null

            canvas.setActiveGroup(group.setCoords()).renderAll()
        })

    }

    bindSave(canvas) {
        const _canvas = canvas
        this.doms.$save.on('click', (function() {
            const data = JSON.stringify(_canvas)
            // todo: save to json or database
            this.showPreview(data)
        }).bind(this))
    }

    showPreview(data) {
        this.doms.$dataArea.html(data)
        this.previewCanvas.loadFromJSON(data)
    }

    // todo: bring send did change layer, but UI doesn't change
    bindMoveUpOrDown() {
        this.doms.$moveup.on('click', () => {
            const activeObj = this.canvas.getActiveObject()
            console.log(this.canvas)
            this.canvas.bringForward(activeObj, true)
            this.canvas.renderAll()
            // this.canvas.bringToFront(activeObj)
        })
        this.doms.$movedown.on('click', () => {
            const activeObj = this.canvas.getActiveObject()
            console.log(this.canvas)
            this.canvas.sendBackwards(activeObj, true)
            this.canvas.renderAll()
            // this.canvas.sendToBack(activeObj)
        })
    }
}