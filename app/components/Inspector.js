'use strict'
import $ from 'jquery'

/**
 * Note: using this as a static class if all graphics correspond to a unique Inspector
 */
export default class Inspector {
    static get doms() {
        const _doms = {
            $inspectorArea: $('.inspector-area'),
            $inspector: $('.inspector'),
            props: {}
        }
        _doms.props.$left = _doms.$inspector.find('.left')
        _doms.props.$top = _doms.$inspector.find('.top')
        _doms.props.$width = _doms.$inspector.find('.width')
        _doms.props.$height = _doms.$inspector.find('.height')
        _doms.props.$angle = _doms.$inspector.find('.angle')
        _doms.props.$fill = _doms.$inspector.find('.fill')
        _doms.props.$stroke = _doms.$inspector.find('.stroke')
        _doms.props.$strokeWidth = _doms.$inspector.find('.strokeWidth')
        _doms.props.$scaleX = _doms.$inspector.find('.scale-x')
        _doms.props.$scaleY = _doms.$inspector.find('.scale-y')
        _doms.props.$radiusX = _doms.$inspector.find('.radius-x') // circle
        _doms.props.$radiusY = _doms.$inspector.find('.radius-y')
        _doms.props.$rx = _doms.$inspector.find('.rx') // ellipse
        _doms.props.$ry = _doms.$inspector.find('.ry')
        _doms.props.$text = _doms.$inspector.find('.text')
        _doms.props.$fontSize = _doms.$inspector.find('.font-size')
        _doms.props.$fontFamily = _doms.$inspector.find('.font-family')
        _doms.props.$centerH = _doms.$inspector.find('.center-h')
        _doms.props.$centerV = _doms.$inspector.find('.center-v')
        return _doms
    }

    static clearInspector() {
        for (let [k, $d] of Object.entries(Inspector.doms.props)) {
            $d.val('')
        }
        Inspector.doms.$inspectorArea.hide()
    }

    static syncCanvasToInspector(graphic, fabricObj) {
        function updateControls() {
            // get current graphic props
            const props = graphic.getProperties()

            // loop thru inspector property fields, put props' values into dom
            for (let [k, $d] of Object.entries(Inspector.doms.props)) {
                $d.val(`${props[k.slice(1)]}`) // props[k.slice(1)] && $d.val(`${props[k.slice(1)]}`)
            }

            Inspector.doms.$inspectorArea.show()
        }

        // when events below fires, inspectorArea will be updated
        const events = ['selected', 'moving', 'scaling', 'resizing', 'rotating']
        for (const e of events) {
            fabricObj.on(`${e}`, updateControls)
        }

        /* for reference:
        canvas.on({
            'object:moving': updateControls,
            'object:scaling': updateControls,
            'object:resizing': updateControls,
            'object:rotating': updateControls
        }); */
    }

    static syncInspectorToCanvas(businessCanvas) {
        // loop thru inspector property fields, put props' values into dom
        for (let [k, $d] of Object.entries(Inspector.doms.props)) {
            const key = k.slice(1)
            $d.on('change', function() {
                const activeObj = businessCanvas.canvas.getActiveObject()

                let value = $.trim($(this).val())
                if ($(this).attr('type') === 'number') {
                    value = parseInt(value, 10)
                }

                if (key.includes('radius')) {
                    activeObj.set({ 'radius': value })
                } else {
                    activeObj.set({
                        [key]: value
                    })
                }

                businessCanvas.canvas.renderAll()
            })
        }

        // these 2 only sync inspector to canvas
        Inspector.doms.props.$centerH.on('click', function() {
            const activeObj = businessCanvas.canvas.getActiveObject()
            activeObj.viewportCenterH()
        })

        Inspector.doms.props.$centerV.on('click', function() {
            const activeObj = businessCanvas.canvas.getActiveObject()
            activeObj.viewportCenterV()
        })
    }
}

/**
 * Note: using this as a instance class if graphic to inspector 1 : 1
 */
// export default class Inspector {
//     constructor() {
//         this.doms = {
//             $inspectorArea: $('.inspector-area'),
//             $inspector: $('.inspector'),
//             $deleteButton: $('.delete')
//         }
//         // properties on the right
//         this.doms.$left = this.doms.$inspector.find('.left:first')
//         this.doms.$top = this.doms.$inspector.find('.top:first')
//         this.doms.$text = this.doms.$inspector.find('.text:first')
//         this.doms.$fontSize = this.doms.$inspector.find('.font-size:first')
//         this.doms.$centerH = this.doms.$inspector.find('.center-h')
//         this.doms.$centerV = this.doms.$inspector.find('.center-v')
//     }
//
//     clearInspector() {
//         this.doms.$left.val('')
//         this.doms.$top.val('')
//         this.doms.$text.val('')
//         this.doms.$fontSize.val('')
//
//         this.doms.$inspectorArea.hide()
//     }
//
//     bindDeleteObject(canvas) {
//         this.doms.$deleteButton.on('click', () => {
//             const currentObj = canvas.getActiveObject()
//             currentObj && currentObj.remove()
//             this.clearInspector()
//         })
//     }
//
//     syncCanvasToInspector(fabricObj) {
//         fabricObj.on('selected', () => {
//             this.doms.$left.val(fabricObj.getLeft())
//             this.doms.$top.val(fabricObj.getTop())
//             this.doms.$inspectorArea.show()
//             // this.doms.$text.val(fabricObj.getText())
//             // this.doms.$fontSize.val(fabricObj.get('fontSize'))
//         })
//     }
//
//     syncInspectorToCanvas(businessCanvas) {
//         this.doms.$left.on('change', function() {
//             const activeObj = businessCanvas.canvas.getActiveObject()
//             const left = parseInt($.trim($(this).val()), 10)
//             activeObj.set({left: left})
//             businessCanvas.canvas.renderAll()
//         })
//
//         this.doms.$top.on('change', function() {
//             const activeObj = businessCanvas.canvas.getActiveObject()
//             const top = parseInt($.trim($(this).val()), 10)
//             activeObj.set({top: top})
//             businessCanvas.canvas.renderAll()
//         })
//
//         this.doms.$text.on('change', function() {
//             const activeObj = businessCanvas.canvas.getActiveObject()
//             const text = $.trim($(this).val())
//             activeObj.setText(text)
//             businessCanvas.canvas.renderAll()
//         })
//
//         this.doms.$fontSize.on('change', function() {
//             const activeObj = businessCanvas.canvas.getActiveObject()
//             let size = $.trim($(this).val())
//             size = parseInt(size, 10)
//             activeObj.set({fontSize: size})
//             businessCanvas.canvas.renderAll()
//         })
//
//         this.doms.$centerH.on('click', function() {
//             const activeObj = businessCanvas.canvas.getActiveObject()
//             activeObj.viewportCenterH()
//         })
//
//         this.doms.$centerV.on('click', function() {
//             const activeObj = businessCanvas.canvas.getActiveObject()
//             activeObj.viewportCenterV()
//         })
//     }
// }