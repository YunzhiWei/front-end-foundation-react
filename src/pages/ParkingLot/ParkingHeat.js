import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from '../function/function';

import h337 from 'heatmapjs/heatmap.min.js';

@inject("parkingLotData") @observer
class ParkingHeatComponent extends Component {
	componentDidMount() {
        if(this.props.type !== 'kuai') {
            // 创建一个heatmap实例对象
            // “h337” 是heatmap.js全局对象的名称.可以使用它来创建热点图实例
            // 这里直接指定热点图渲染的div了.heatmap支持自定义的样式方案,网页外包接活具体可看官网api
            this.heatmapInstance = h337.create({
                container: document.querySelectorAll('#heatmap')[0],
            });
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
            const isIncluded = (a,b) => !!b.filter((item) => ((item[0] <= a) && item[1] >= a)).length;
            let max = 0;
            let pointSet = [{
                name: "F-Part1", 
                park: "F", 
                coord: "500,400", 
                include: [[1, 37], [68, 87]], 
                value: 0
            }, {
                name: "F-Part2", 
                park: "F", 
                coord: "250,400", 
                include: [[38, 67], [88, 139]], 
                value: 0
            }, {
                name: "V-Part1", 
                park: "V", 
                coord: "440,200", 
                include: [[1, 31], [42, 70]], 
                value: 0
            }, {
                name: "V-Part2", 
                park: "V", 
                coord: "225,170", 
                include: [[32, 41], [71, 113]], 
                value: 0
            }, {
                name: "P-Part1", 
                park: "P", 
                coord: "790,230", 
                include: [[1, 176], [272, 283]], 
                value: 0
            }, {
                name: "P-Part2", 
                park: "P", 
                coord: "650,170", 
                include: [[177, 271], [284, 333]], 
                value: 0
            }]
            plotList.forEach((item) => {
                let plotNo = item.plotNo;
                let status = item.status;
                let park = plotNo.slice(0, 1).toLocaleUpperCase();
                let parkNum = Number(plotNo.slice(1));
                pointSet.forEach((point, i) => {
                    if (point.park === park && isIncluded(parkNum, point.include) && !!status) {
                        pointSet[i].value++;
                    }
                })
            })
            let pointCoordSet = pointSet.map((item) => {
                let [ x, y ] = item.coord.split(',');
                max = item.value > max ? item.value : max
                return {
                    x: x,
                    y: y,
                    value: item.value
                }
            });
            if (this.heatmapInstance) {
                this.heatmapInstance.setData({
                    max: max, 
                    data: pointCoordSet
                });
            }
            return (
                <div id="ParkingHeat">
                    <div id="heatmap"></div>
                </div>
            );
        }
	}
}

export default ParkingHeatComponent;