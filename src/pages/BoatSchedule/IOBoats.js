import React,{ Component } from 'react';
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

@inject("boatScheduleData") @observer
class IOBoatsComponent extends Component {
    render() {
        const setting1 = setting(this.props.boatScheduleData._IOBoats.inSumPrev, this.props.boatScheduleData._IOBoats.inSum);
        const setting2 = setting(this.props.boatScheduleData._IOBoats.outSumPrev, this.props.boatScheduleData._IOBoats.outSum);
		return (
            <div id="IO-Cars">
                <div className="input">
                    <p className="title">在岗快艇<b><CountUp className="account-balance" {...setting1} /></b>艘</p>
                    <p className="subtitle"><span className="col-lg-3">名称</span><span className="col-lg-3">线路</span><span className="col-lg-3">停靠</span><span className="col-lg-3">离港时间</span></p>
                    <div>{this.props.boatScheduleData._IOBoats.inputBoats.map((item, i) => <p key={item.id} className={`list ${item.New ? 'new' : ''}`}><span className="col-lg-3">{item.license}</span><span className="col-lg-3">{item.line}</span><span className="col-lg-3">{item.stayStation}</span><span className="col-lg-3">{item.time}</span></p>)}</div>
                </div>
		    </div>
        );
	}
}

export default IOBoatsComponent;