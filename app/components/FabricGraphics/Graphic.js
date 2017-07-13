export default class Graphic {
    constructor({
        fabricObj, // class property that has no relationship with Fabrics. just to provide an interface 
        top = 100,
        left = 100,
        fill = '',
        stroke = 'red',
        strokeWidth = 1
    } = {}) {
        this.fabricObj = fabricObj
        this.top = top
        this.left = left
        this.fill = fill
        this.stroke = stroke
        this.strokeWidth = strokeWidth
    }

    getProperties() {
        return {
            'left': this.fabricObj.getLeft ? this.fabricObj.getLeft() : 0,
            'top': this.fabricObj.getTop ? this.fabricObj.getLeft() : 0,
            'text': this.fabricObj.getText ? this.fabricObj.getText() : 0,
            'angle': this.fabricObj.getAngle ? this.fabricObj.getAngle() : 0,
            'fill': this.fabricObj.getFill ? this.fabricObj.getFill() : '',
            'width': this.fabricObj.getWidth ? this.fabricObj.getWidth() : 0,
            'height': this.fabricObj.getHeight ? this.fabricObj.getHeight() : 0,
            'radiusX': (this.fabricObj.getRadiusX || this.fabricObj.getRx) ? (this.fabricObj.getRadiusX() || this.fabricObj.getRx()) : 0,
            'radiusY': (this.fabricObj.getRadiusY || this.fabricObj.getRy) ? (this.fabricObj.getRadiusY() || this.fabricObj.getRy()) : 0,
            'stroke': this.fabricObj.getStroke ? this.fabricObj.getStroke() : '',
            'strokeWidth': this.fabricObj.getStrokeWidth ? this.fabricObj.getStrokeWidth() : 0,
            'scaleX': this.fabricObj.getScaleX ? this.fabricObj.getScaleX() : 0,
            'scaleY': this.fabricObj.getScaleY ? this.fabricObj.getScaleY() : 0,
            'fontSize': this.fabricObj.getFontSize ? this.fabricObj.getFontSize() : undefined,
            'fontFamily': this.fabricObj.getFontFamily ? this.fabricObj.getFontFamily() : undefined
        }
    }

    /* 通用的一些基本方法
    bringForward(intersectingopt)   sendBackwards(intersectingopt)
    bringToFront()    sendToBack()
    calcCoords()
    center() // set obj to the center
    centerH()
    centerV()
    getAngle()    setAngle(angle)
    getBoundingRect([absoluteopt], [calculateopt]) → Returns coordinates of object's bounding rectangle (left, top, width, height) 
    getCenterPoint()
    getCoords()
    getFill()   setFill(value)  
    getFlipX()  setFlipX(value)     
    getFlipY()  setFlipY(value)
    getHeight()
    getWidth()
    getLeft()   setLeft(value)
    getTop()    setTop(value)
    getLocalPointer(e, pointeropt)
    getObjectScaling()
    getOpacity()
    getOriginX()   setOriginX(value)
    getRadiusX()    setRadius()
    getScaleX()     setScaleX(value)    
    getShadow()
    getStroke()     setStroke(value)
    getStrokeWidth()    setStrokeWidth(value)
    hasStateChanged(propertySetopt)
    !!! onDeselect() : Callback; invoked right before object is about to go from active to inactive
    remove()
    render(ctx, noTransformopt)
    saveState(optionsopt) 
    scale(value)
    scaleToHeight(value)
    scaleToWidth(value) 
    setColor(color)
    setCoords(ignoreZoomopt, skipAbsoluteopt)
    toJSON(propertiesToIncludeopt)
    viewportCenter() → Centers object on current viewport of canvas to which it was added last. You might need to call `setCoords` on an object after centering, to update controls area.
    viewportCenterH()   viewportCenterV()
     */

    /* common events:
    http://fabricjs.com/controls
    http://fabricjs.com/hovering
    http://fabricjs.com/customization
    http://fabricjs.com/controls-customization
     */
}