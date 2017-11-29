import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from '../function/function';

import h337 from 'heatmapjs/heatmap.js';

class ParkingHeatComponent extends Component {
    constructor() {
        super();
        this.state = {
            max: 0,
            points: []
        }
    }
	componentDidMount() {
        // 创建一个heatmap实例对象
        // “h337” 是heatmap.js全局对象的名称.可以使用它来创建热点图实例
        // 这里直接指定热点图渲染的div了.heatmap支持自定义的样式方案,网页外包接活具体可看官网api
        var heatmapInstance = h337.create({
            container: document.querySelectorAll('#heatmap')[0],
        });
        var heatmapInstance2 = h337.create({
            container: document.querySelectorAll('#heatmap')[1],
        });
        //构建一些随机数据点,网页切图价格这里替换成你的业务数据
        function loop() {
            var points = [];
            var max = 0;
            var width = 3640;
            var height = 1550;
            var len = 500;
            while (len--) {
                var val = Math.floor(Math.random()*100);
                max = Math.max(max, val);
                var point = {
                    x: Math.floor(Math.random()*width),
                    y: Math.floor(Math.random()*height),
                    value: val
                };
                points.push(point);
            }
            var data = {
                max: max,
                data: points
            };
            heatmapInstance.setData(data); //数据绑定还可以使用
        }
        function loop2() {
            var points = [];
            var max = 0;
            var width = 1720;
            var height = 760;
            var len = 200;
            while (len--) {
                var val = Math.floor(Math.random()*100);
                max = Math.max(max, val);
                var point = {
                    x: Math.floor(Math.random()*width),
                    y: Math.floor(Math.random()*height),
                    value: val
                };
                points.push(point);
            }
            var data = {
                max: max,
                data: points
            };
            heatmapInstance2.setData(data);
        }
        //因为data是一组数据,web切图报价所以直接setData
        loop();
        loop2();
    }
    render() {
		return (
            <div id="ParkingHeat">
                <div id="heatmap"></div>
		    </div>
        );
	}
}

export default ParkingHeatComponent;