import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';

@inject("parkingLotData") @observer
class IOCarsComponent extends Component {
    render() {
		return (
            <div id="IO-Cars">
                <div className="input">
                    <p>当日进车<span className="account-balance">500</span>辆</p>
                    <p><span className="col-lg-4">车牌号</span><span className="col-lg-4">车型</span><span className="col-lg-4">进场时间</span></p>
                    {this.props.parkingLotData._IOCars.inputCars.map((item, i) => <p key={item.id} className="list"><span className="col-lg-4">{item.license}</span><span className="col-lg-4">{item.logo}</span><span className="col-lg-4">{item.time}</span></p>)}
                </div>
                <div className="output">
                    <p>当日出车<span className="account-balance">200</span>辆</p>
                    <p><span className="col-lg-4">车牌号</span><span className="col-lg-4">车型</span><span className="col-lg-4">离场时间</span></p>
                    {this.props.parkingLotData._IOCars.outputCars.map((item, i) => <p key={item.id} className="list"><span className="col-lg-4">{item.license}</span><span className="col-lg-4">{item.logo}</span><span className="col-lg-4">{item.time}</span></p>)}
                </div>
		    </div>
        );
	}
}

export default IOCarsComponent;