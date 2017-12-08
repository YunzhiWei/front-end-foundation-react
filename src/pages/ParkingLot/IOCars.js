import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';

import CountUp from 'react-countup';

function setting(start, end) {
    var setTemp = new Object();
    setTemp.start = start;
    setTemp.end = end;
    setTemp.duration = 2;
    setTemp.useEasing = true;
    setTemp.useGrouping = true;
    setTemp.separator = ",";
    return setTemp;
}

@inject("parkingLotData") @observer
class IOCarsComponent extends Component {
    render() {
        const setting1 = setting(this.props.parkingLotData._IOCars.inSumPrev, this.props.parkingLotData._IOCars.inSum);
        const setting2 = setting(this.props.parkingLotData._IOCars.outSumPrev, this.props.parkingLotData._IOCars.outSum);
		return (
            <div id="IO-Cars">
                <div className="input">
                    <p className="title">当日进车<b><CountUp className="account-balance" {...setting1} /></b>辆</p>
                    <p className="subtitle"><span className="col-lg-4">车牌号</span><span className="col-lg-4">归属地</span><span className="col-lg-4">进场时间</span></p>
                    <div>{this.props.parkingLotData._IOCars.inputCars.map((item, i) => <p key={item.id} className={`list ${item.New ? 'new' : ''}`}><span className="col-lg-4">{item.license}</span><span className="col-lg-4">{item.addr}</span><span className="col-lg-4">{item.time}</span></p>)}</div>
                </div>
                <div className="output">
                    <p className="title">当日出车<b><CountUp className="account-balance" {...setting2} /></b>辆</p>
                    <p className="subtitle"><span className="col-lg-4">车牌号</span><span className="col-lg-4">离场时间</span><span className="col-lg-4">停留时间</span></p>
                    <div>{this.props.parkingLotData._IOCars.outputCars.map((item, i) => <p key={item.id} className={`list ${item.New ? 'new' : ''}`} ><span className="col-lg-4">{item.license}</span><span className="col-lg-4">{item.time}</span><span className="col-lg-4">{item.stayTime} 分钟</span></p>)}</div>
                </div>
		    </div>
        );
	}
}

export default IOCarsComponent;