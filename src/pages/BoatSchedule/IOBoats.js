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
        const setting1 = setting(this.props.boatScheduleData.boating.inSumPrevOfBig, this.props.boatScheduleData.boating.inSumOfBig);
        const setting2 = setting(this.props.boatScheduleData.boating.outSumPrevOfBig, this.props.boatScheduleData.boating.outSumOfBig);
        const setting3 = setting(this.props.boatScheduleData.boating.inSumPrevOfSmall, this.props.boatScheduleData.boating.inSumOfSmall);
        const setting4 = setting(this.props.boatScheduleData.boating.outSumPrevOfSmall, this.props.boatScheduleData.boating.outSumOfSmall);
		if (this.props.type === '游船进') {
            return (
                <div id="IO-Cars">
                    <div className="input">
                        <p className="title">在港{this.props.name}<b><CountUp className="account-balance" {...setting1} /></b>艘</p>
                        <p className="subtitle"><span className="col-lg-3">名称</span><span className="col-lg-4">线路</span><span className="col-lg-2">停靠</span><span className="col-lg-3">到港时间</span></p>
                        <div>{this.props.boatScheduleData._IOBoats.inputBoats.slice(-6, this.props.boatScheduleData._IOBoats.inputBoats.length).map((item, i) => {
                                if(item.type === 0) return <p key={item.id} className={`list ${item.New ? 'new' : ''}`}><span className="col-lg-3">{item.name}</span><span className="col-lg-4">{item.line}</span><span className="col-lg-2">{item.stayStation}</span><span className="col-lg-3">{item.time.slice(11)}</span></p>
                            })}
                        </div>
                    </div>
                </div>
            );            
        } else if(this.props.type === '游船出') {
            return (
                <div id="IO-Cars">
                    <div className="input">
                        <p className="title">离港{this.props.name}<b><CountUp className="account-balance" {...setting2} /></b>艘</p>
                        <p className="subtitle"><span className="col-lg-3">名称</span><span className="col-lg-4">线路</span><span className="col-lg-2">始发</span><span className="col-lg-3">离港时间</span></p>
                        <div>{this.props.boatScheduleData._IOBoats.outputBoats.slice(-6, this.props.boatScheduleData._IOBoats.outputBoats.length).map((item, i) => {
                                if(item.type === 0) return <p key={item.id} className={`list ${item.New ? 'new' : ''}`}><span className="col-lg-3">{item.name}</span><span className="col-lg-4">{item.line}</span><span className="col-lg-2">{item.stayStation}</span><span className="col-lg-3">{item.startTime.slice(11)}</span></p>
                            })}
                        </div>
                    </div>
                </div>
            )
        } else if(this.props.type === '快艇进') {
            return (
                <div id="IO-Cars">
                    <div className="input">
                        <p className="title">在港{this.props.name}<b><CountUp className="account-balance" {...setting3} /></b>艘</p>
                        <p className="subtitle"><span className="col-lg-3">名称</span><span className="col-lg-4">线路</span><span className="col-lg-2">停靠</span><span className="col-lg-3">到港时间</span></p>
                        <div>{this.props.boatScheduleData._IOBoats.inputBoats.slice(-6, this.props.boatScheduleData._IOBoats.inputBoats.length).map((item, i) => {
                                if(item.type === 1) return <p key={item.id} className={`list ${item.New ? 'new' : ''}`}><span className="col-lg-3">{item.name}</span><span className="col-lg-4">{item.line}</span><span className="col-lg-2">{item.stayStation}</span><span className="col-lg-3">{item.time.slice(11)}</span></p>
                            })}
                        </div>
                    </div>
                </div>
            )
        } else if(this.props.type === '快艇出') {
            return (
                <div id="IO-Cars">
                    <div className="input">
                        <p className="title">离港{this.props.name}<b><CountUp className="account-balance" {...setting4} /></b>艘</p>
                        <p className="subtitle"><span className="col-lg-3">名称</span><span className="col-lg-4">线路</span><span className="col-lg-2">始发</span><span className="col-lg-3">离港时间</span></p>
                        <div>{this.props.boatScheduleData._IOBoats.outputBoats.slice(-6, this.props.boatScheduleData._IOBoats.outputBoats.length).map((item, i) => {
                                if(item.type === 1) return <p key={item.id} className={`list ${item.New ? 'new' : ''}`}><span className="col-lg-3">{item.name}</span><span className="col-lg-4">{item.line}</span><span className="col-lg-2">{item.stayStation}</span><span className="col-lg-3">{item.startTime.slice(11)}</span></p>
                            })}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default IOBoatsComponent;