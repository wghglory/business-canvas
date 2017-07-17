# 图形化创建

## 使用技术

* [Fabrics](http://fabricjs.com/)
* ES2015 class
* Modularity
* webpack, babel

## 说明

页面核心分3个区域--工具区、画布区、编辑区。

* 工具去包含常见图形，如圆形、矩形、直线、文本、文本框以及根据需要上传图片创建canvas
* 画布区显示点击工具区产生的图形，可以对图形进行缩放、移动、旋转等
* 编辑区会显示在画布区选中图形的属性，如top, left, x, y等。编辑属性值可以更新画布区图形

## 代码介绍

BusinessCanvas包含工具区和画布区，Inspector负责编辑区。BusinessCanvas class需要实例化，未来可以做成静态。Inspector目前是静态，考虑到不同图形大部分属性相同，对应dom变化不大，某些属性刻意隐藏。如果未来觉得不合适，可以Inspector做基类，每个图形(FabricCanvas folder)对应各自的Inspector编辑。

## bug

编辑区修改x, y位置属性后，移动画布区图形有时鼠标和图形有很大偏差。

## Fabricjs core

### Canvas

```javascript
var canvas = new fabric.Canvas('c');
var rect = new fabric.Rect();

canvas.add(rect); // add object

canvas.item(0); // reference fabric.Rect added earlier (first object)
canvas.getObjects(); // get all objects on canvas (rect will be first and only)

canvas.remove(rect); // remove previously-added fabric.Rect
```

While managing objects is the main purpose of fabric.Canvas, it also serves as a configuration host. Need to set background color or image for an entire canvas? Clip all contents to a certain area? Set different width/height? Specify whether canvas is interactive or not? All of these options (and others) can be set on fabric.Canvas, either at the time of creation or after:

```javascript
var canvas = new fabric.Canvas('c', {
  backgroundColor: 'rgb(100,100,200)',
  selectionColor: 'blue',
  selectionLineWidth: 2
  // ...
});

// or

var canvas = new fabric.Canvas('c');
canvas.setBackgroundImage('http://...');
canvas.onFpsUpdate = function(){ /* ... */ };
```

### Events

Want to know when the mouse was pressed? Just observe "mouse:down" event. How about when object was added to canvas? "object:added" is there for you. And what about when the entire canvas is re-rendered? Just use "after:render".

There's `on` method to initialize event listener, and `off` to remove it.

```javascript
var canvas = new fabric.Canvas('...');
canvas.on('mouse:down', function(options) {
  console.log(options.e.clientX, options.e.clientY);
});
```

We're adding event "mouse:down" event listener onto canvas, and giving it an event handler that will log coordinates of where the event originated. In other words, it'll log where exactly on canvas the mouse was pressed. The event handler receives an options object, which has 2 properties: `e` — the original event, and `target` — a clicked object on canvas, if any. The event is present at all times, but `target` only exists if you actually did click on some object on canvas. The `target` is also only passed to handlers of events where it makes sense. For example, for "mouse:down" but not for "after:render" (which denotes that entire canvas was re-drawn).

```javascript
canvas.on('mouse:down', function(options) {
  if (options.target) {
    console.log('an object was clicked! ', options.target.type);
  }
});
```

The above example will log "an object was clicked!" if you click an object. It will also show the type of object clicked.

So which other events are available in Fabric? Well, from mouse-level ones there are "**mouse:down**", "**mouse:move**", and "**mouse:up**". From generic ones, there are "**after:render**". Then there are selection-related events: "**before:selection:cleared**", "**selection:created**", "**selection:cleared**". And finally, object ones: "**object:modified**", "**object:selected**", "**object:moving**", "**object:scaling**", "**object:rotating**", "**object:added**", and "**object:removed**"

Note that events like "object:moving" (or "object:scaling") are fired continuously every time an object is moved (or scaled) even by one pixel. On the other hand, events like "object:modified" or "selection:created" are fired only at the end of the action (object modification or selection creation).

Note how we attached events right onto canvas (`canvas.on('mouse:down', ...)`). As you can imagine, this means that events are all scoped to canvas instances. If you have multiple canvases on a page, you can attach different event listeners to each one of them. They're all independent and respect only events that were assigned to them.

For convenience, Fabric takes event system even further, and allows you to attach listeners directly to canvas objects. Let's take a look:

```javascript
var rect = new fabric.Rect({ width: 100, height: 50, fill: 'green' });
rect.on('selected', function() {
  console.log('selected a rectangle');
});

var circle = new fabric.Circle({ radius: 75, fill: 'blue' });
circle.on('selected', function() {
  console.log('selected a circle');
});
```

We're attaching event listeners directly to rectangle and circle instances. Instead of "object:selected", we're using "selected" event. Similarly, we could have used "modified" event ("object:modified" when attaching to canvas), "rotating" event ("object:rotating" when attaching to canvas), and so on.

Check this [events demo](http://fabricjs.com/events) for a more extensive exploration of Fabric's event system