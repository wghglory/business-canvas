'use strict'
import $ from 'jquery'

/**
 * Note: using this as a static class if all graphs correspond to a unique Inspector
 */
export default class Inspector {
    static get doms() {
        const _doms = {
            $inspectorArea: $('.inspector-area'),
            $inspector: $('.inspector')
        }
        _doms.$left = _doms.$inspector.find('.left:first')
        _doms.$top = _doms.$inspector.find('.top:first')
        _doms.$text = _doms.$inspector.find('.text:first')
        _doms.$fontSize = _doms.$inspector.find('.font-size:first')
        _doms.$centerH = _doms.$inspector.find('.center-h')
        _doms.$centerV = _doms.$inspector.find('.center-v')
        return _doms
    }
    static clearInspector() {
        Inspector.doms.$left.val('')
        Inspector.doms.$top.val('')
        Inspector.doms.$text.val('')
        Inspector.doms.$fontSize.val('')

        Inspector.doms.$inspectorArea.hide()
    }

    static syncCanvasToInspector(createdObj) {
        createdObj.on('selected', () => {
            Inspector.doms.$left.val(createdObj.getLeft())
            Inspector.doms.$top.val(createdObj.getTop())
            Inspector.doms.$inspectorArea.show()
            // some don't have text or fontSize field
            // Inspector.doms.$text.val(createdObj.getText())
            // Inspector.doms.$fontSize.val(createdObj.get('fontSize'))
        })
    }

    static syncInspectorToCanvas(businessCanvas) {
        Inspector.doms.$left.on('change', function() {
            const activeObj = businessCanvas.canvas.getActiveObject()
            const left = parseInt($.trim($(this).val()), 10)
            activeObj.set({
                left: left
            })
            businessCanvas.canvas.renderAll()
        })

        Inspector.doms.$top.on('change', function() {
            const activeObj = businessCanvas.canvas.getActiveObject()
            const top = parseInt($.trim($(this).val()), 10)
            activeObj.set({
                top: top
            })
            businessCanvas.canvas.renderAll()
        })

        Inspector.doms.$text.on('change', function() {
            const activeObj = businessCanvas.canvas.getActiveObject()
            const text = $.trim($(this).val())
            activeObj.setText(text)
            businessCanvas.canvas.renderAll()
        })

        Inspector.doms.$fontSize.on('change', function() {
            const activeObj = businessCanvas.canvas.getActiveObject()
            let size = $.trim($(this).val())
            size = parseInt(size, 10)
            activeObj.set({
                fontSize: size
            })
            businessCanvas.canvas.renderAll()
        })

        Inspector.doms.$centerH.on('click', function() {
            const activeObj = businessCanvas.canvas.getActiveObject()
            activeObj.viewportCenterH()
        })

        Inspector.doms.$centerV.on('click', function() {
            const activeObj = businessCanvas.canvas.getActiveObject()
            activeObj.viewportCenterV()
        })
    }
}

/**
 * Note: using this as a instance class if graph to inspector 1 : 1
 */
// export default class Inspector {
//     constructor() {
//         this.doms = {
//             $inspectorArea: $('.inspector-area'),
//             $inspector: $('.inspector')
//         };
//         // properties on the right 
//         this.doms.$left = this.doms.$inspector.find('.left:first');
//         this.doms.$top = this.doms.$inspector.find('.top:first');
//         this.doms.$text = this.doms.$inspector.find('.text:first');
//         this.doms.$fontSize = this.doms.$inspector.find('.font-size:first');
//         this.doms.$centerH = this.doms.$inspector.find('.center-h');
//         this.doms.$centerV = this.doms.$inspector.find('.center-v');
//     }

//     clearInspector() {
//         this.doms.$left.val('');
//         this.doms.$top.val('');
//         this.doms.$text.val('');
//         this.doms.$fontSize.val('');

//         this.doms.$inspectorArea.hide();
//     }

//     static syncCanvasToInspector(createdObj) {
//         createdObj.on('selected', () => {
//             this.doms.$left.val(createdObj.getLeft());
//             this.doms.$top.val(createdObj.getTop());
//             this.doms.$inspectorArea.show();
//             // this.doms.$text.val(createdObj.getText())
//             // this.doms.$fontSize.val(createdObj.get('fontSize'))
//         });
//     }

//     static syncInspectorToCanvas(businessCanvas) {
//         this.doms.$left.on('change', function () {
//             const activeObj = businessCanvas.canvas.getActiveObject();
//             const left = parseInt($.trim($(this).val()), 10);
//             activeObj.set({
//                 left: left
//             });
//             businessCanvas.canvas.renderAll();
//         });

//         this.doms.$top.on('change', function () {
//             const activeObj = businessCanvas.canvas.getActiveObject();
//             const top = parseInt($.trim($(this).val()), 10);
//             activeObj.set({
//                 top: top
//             });
//             businessCanvas.canvas.renderAll();
//         });

//         this.doms.$text.on('change', function () {
//             const activeObj = businessCanvas.canvas.getActiveObject();
//             const text = $.trim($(this).val());
//             activeObj.setText(text);
//             businessCanvas.canvas.renderAll();
//         });

//         this.doms.$fontSize.on('change', function () {
//             const activeObj = businessCanvas.canvas.getActiveObject();
//             let size = $.trim($(this).val());
//             size = parseInt(size, 10);
//             activeObj.set({
//                 fontSize: size
//             });
//             businessCanvas.canvas.renderAll();
//         });

//         this.doms.$centerH.on('click', function () {
//             const activeObj = businessCanvas.canvas.getActiveObject();
//             activeObj.viewportCenterH();
//         });

//         this.doms.$centerV.on('click', function () {
//             const activeObj = businessCanvas.canvas.getActiveObject();
//             activeObj.viewportCenterV();
//         });
//     }
// }