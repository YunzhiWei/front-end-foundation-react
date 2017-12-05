import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from '../function/function';

@inject("echartsData") @observer
class AirQualityComponent extends Component {
	render() {
		const { echartsData } = this.props;
		const option = echartsOption(echartsData.PM25, 'AirQuality');
		return (
			<div style={{width: "100%",height: "100%"}}>
				<div className="comfort" style={{width: "50%", height: "100%", display: "inline-block", float:"left", color: "#fff"}}>
					<p>当前温度：{echartsData.comfort.temperature}</p>
					<p>当前湿度：{echartsData.comfort.humidity}</p>
					<p>当前舒适度：{echartsData.comfort.comfort}</p>
				</div>
			    <ReactEcharts
			      option={option}
			      style={{width: '50%',height: '100%', float:"left"}}
			      className='AirQuality'
			    />
		    </div>
		);
	}
}

export default AirQualityComponent;