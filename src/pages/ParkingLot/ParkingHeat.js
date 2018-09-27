import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from '../function/function';

import h337 from 'heatmapjs/heatmap.min.js';

@inject("parkingLotData") @observer
class ParkingHeatComponent extends Component {
    constructor() {
        super();
        this.state = {
            max: 0,
            points: []
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
	componentDidMount() {
        if(this.props.type !== 'kuai') {
            // 创建一个heatmap实例对象
            // “h337” 是heatmap.js全局对象的名称.可以使用它来创建热点图实例
            // 这里直接指定热点图渲染的div了.heatmap支持自定义的样式方案,网页外包接活具体可看官网api
            var heatmapInstance = h337.create({
                container: document.querySelectorAll('#heatmap')[0],
            });
            //构建一些随机数据点,网页切图价格这里替换成你的业务数据
            function loop() {
                var points = [];
                var max = 0;
                var width = 900;
                var height = 550;
                var len = 10;
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
                console.log(max);
                console.log(points);
                var data = {
                    max: max,
                    data: points
                };
                heatmapInstance.setData(data); //数据绑定还可以使用
            }
            // 因为data是一组数据,web切图报价所以直接setData
            loop();
        }
    }
    render() {
        const { plotList } = this.props.parkingLotData;
        if(this.props.type === 'kuai') {
            let plotsArray = [];
            let plotsObject = {
                "F": [], 
                "P": [], 
                "V": []
            }
            plotList.forEach((item) => plotsObject[item.plotNo.slice(0, 1).toLocaleUpperCase()].push(item))
            Object.keys(plotsObject).forEach((item) => {
                plotsObject[item].sort((a, b) => a.plotNo.slice(1) - b.plotNo.slice(1));
                plotsArray = plotsArray.concat(plotsObject[item]);
            })
            let plotsGroups = plotsArray.reduce((prev, curr, i) => {
                let groupId = Math.floor(i/100);
                prev[groupId].push(curr)
                return prev;
            }, [[], [], [], [], [], []]);
            return (
                <div id="parking_cube">
                    <div id="father">
                        <div className="zong">
                            {plotsGroups.map((block, i) => (
                                <div id={`son${i+1}`} className="son" key={i}>
                                    {block.map((plot) => (
                                        <span className={plot.status && 'red'} key={plot.plotNo}>{plot.plotNo}</span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div id="ParkingHeat">
                    <div id="heatmap"></div>
                </div>
            );
        }
	}
}

export default ParkingHeatComponent;