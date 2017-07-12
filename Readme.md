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
