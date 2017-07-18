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
            $deselectAll: $('.deselect-all'),
            $delete: $('.delete'),
            $clear: $('.clear'),
            $save: $('.save'), // this might be in other classes, now only for demo purpose
            $bringFront: $('.bringFront'),
            $sendBack: $('.sendBack')
        }

        // this.objects = []
        this.fabricObj
        this.canvas
        this.previewCanvas

        this.init()
    }

    init() {
        // set canvas width and height
        this.doms.$mainCanvas.attr('width', this.doms.$canvasArea.width()).attr('height', this.doms.$canvasArea.height())
        this.doms.$previewCanvas.attr('width', this.doms.$canvasArea.width()).attr('height', this.doms.$canvasArea.height())
        this.canvas = new fabric.Canvas('mainCanvas', { preserveObjectStacking: true })
        this.previewCanvas = new fabric.Canvas('previewCanvas')

        this.bindToolsClick()
        this.bindImageUpload()

        this.bindDeselectAll(this.canvas)
        this.bindSelectAll(this.canvas)
        this.bindClear(this.canvas)
        this.bindDeleteObject(this.canvas, Inspector)
        this.bindSave(this.canvas)

        this.bindBringFrontAndSendBack(this.canvas)
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
        // this.objects.push(fabricObj)
    }

    bindClear(canvas) {
        this.doms.$clear.on('click', () => {
            // remove all objects and re-render
            canvas.clear().renderAll()
        })
    }

    bindDeleteObject(canvas, Inspector) {
        this.doms.$delete.on('click', () => {
            const currentObj = canvas.getActiveObject()

            if (currentObj) {
                canvas.remove(currentObj)
                // currentObj.remove()
            } else {
                const group = canvas.getActiveGroup()
                if (group) {
                    canvas.discardActiveGroup()
                    group.forEachObject((o) => {
                        canvas.remove(o)
                    })
                }
            }
            Inspector.clearInspector()
        })
    }

    bindSelectAll(canvas) {

        this.doms.$selectAll.on('click', () => {
            // note: bug solve: select once, add another new, select again...(bug: position changes)
            canvas.deactivateAll()

            const objects = canvas.getObjects().map((o) => {
                return o.set('active', true)
            })

            const group = new fabric.Group(objects, {
                originX: 'center',
                originY: 'center'
            })

            canvas.fabricObj = null

            canvas.setActiveGroup(group.setCoords()).renderAll()
        })

    }

    bindDeselectAll(canvas) {
        this.doms.$deselectAll.on('click', () => {
            canvas.deactivateAll().renderAll()
        })
    }

    bindSave(canvas) {
        this.doms.$save.on('click', (function() {
            const data = JSON.stringify(canvas)
            this.showPreview(data)
        }).bind(this))
    }

    showPreview(data) {
        this.doms.$dataArea.html(data)
        this.previewCanvas.loadFromJSON(data)
    }

    // bring/send did change layer, but UI doesn't change, to fix this: new fabric.Canvas('mainCanvas', { preserveObjectStacking: true })
    bindBringFrontAndSendBack(canvas) {
        this.doms.$bringFront.on('click', () => {
            const activeObj = canvas.getActiveObject()
            // canvas.bringForward(activeObj, true)  // 上移一层
            canvas.bringToFront(activeObj) // 最前
        })

        this.doms.$sendBack.on('click', () => {
            const activeObj = canvas.getActiveObject()
            // canvas.sendBackwards(activeObj, true)
            canvas.sendToBack(activeObj)
        })
    }
}