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
            this.forceUpdate();
        }

    }
    render() {
        if(this.props.type === 'kuai') {
            const { plotList } = this.props.parkingLotData;
            let plotsGroups = plotList.reduce((prev, curr, i) => {
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
            const { heatmapSet } = this.props.parkingLotData;
            let max = 0;
            let heatmapCoordSet = heatmapSet.map((item) => {
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
                    data: heatmapCoordSet
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