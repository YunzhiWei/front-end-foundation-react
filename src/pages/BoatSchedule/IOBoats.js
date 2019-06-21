import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import { dateFormat } from '../../Lib';

import CountUp from 'react-countup';

const toSortByLatestTime = (a, b) => new Date(b.latest_time).getTime() - new Date(a.latest_time).getTime();

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
        const { boating, _IOBoats: { yc_docking, yc_leaving, kt_docking, kt_leaving } } = this.props.boatScheduleData;
        const setting1 = setting(boating.inSumPrevOfBig, boating.inSumOfBig);
        const setting2 = setting(boating.outSumPrevOfBig, boating.outSumOfBig);
        const setting3 = setting(boating.inSumPrevOfSmall, boating.inSumOfSmall);
        const setting4 = setting(boating.outSumPrevOfSmall, boating.outSumOfSmall);
		if (this.props.type === '游船进') {
            return (
                <div id="IO-Cars">
                    <div className="input">
                        <p className="title">在港{this.props.name}<b><CountUp className="account-balance" {...setting1} /></b>艘</p>
                        <p className="subtitle"><span className="col-lg-3">名称</span><span className="col-lg-4">航行时间</span><span className="col-lg-2">停靠</span><span className="col-lg-3">到港时间</span></p>
                        <div className="IO-content">{yc_docking.sort(toSortByLatestTime).map((item, i) => <p key={item.device_id} className={`list`}><span className="col-lg-3">{item.device_name}</span><span className="col-lg-4">{((new Date(item.docking_time) - new Date(item.leaving_time))/60/1000).toFixed(1)}分钟</span><span className="col-lg-2">{item.docking_wharf}</span><span className="col-lg-3">{dateFormat(new Date(item.docking_time), 'hh:mm:ss')}</span></p>)}
                        </div>
                    </div>
                </div>
            );            
        } else if(this.props.type === '游船出') {
            return (
                <div id="IO-Cars">
                    <div className="input">
                        <p className="title">离港{this.props.name}<b><CountUp className="account-balance" {...setting2} /></b>艘</p>
                        <p className="subtitle"><span className="col-lg-3">名称</span><span className="col-lg-4">速度</span><span className="col-lg-2">始发</span><span className="col-lg-3">离港时间</span></p>
                        <div className="IO-content">{yc_leaving.sort(toSortByLatestTime).map((item, i) => <p key={item.device_id} className={`list`}><span className="col-lg-3">{item.device_name}</span><span className="col-lg-4">{(item.speed/100000).toString().slice(0, 4)}km/h</span><span className="col-lg-2">{item.leaving_wharf}</span><span className="col-lg-3">{dateFormat(new Date(item.leaving_time), 'hh:mm:ss')}</span></p>)}
                        </div>
                    </div>
                </div>
            )
        } else if(this.props.type === '快艇进') {
            return (
                <div id="IO-Cars">
                    <div className="input">
                        <p className="title">在港{this.props.name}<b><CountUp className="account-balance" {...setting3} /></b>艘</p>
                        <p className="subtitle"><span className="col-lg-3">名称</span><span className="col-lg-4">航行时间</span><span className="col-lg-2">停靠</span><span className="col-lg-3">到港时间</span></p>
                        <div className="IO-content">{kt_docking.sort(toSortByLatestTime).map((item, i) => <p key={item.device_id} className={`list`}><span className="col-lg-3">{item.device_name}</span><span className="col-lg-4">{((new Date(item.docking_time) - new Date(item.leaving_time))/60/1000).toFixed(1)}分钟</span><span className="col-lg-2">{item.docking_wharf}</span><span className="col-lg-3">{dateFormat(new Date(item.docking_time), 'hh:mm:ss')}</span></p>)}
                        </div>
                    </div>
                </div>
            )
        } else if(this.props.type === '快艇出') {
            return (
                <div id="IO-Cars">
                    <div className="input">
                        <p className="title">离港{this.props.name}<b><CountUp className="account-balance" {...setting4} /></b>艘</p>
                        <p className="subtitle"><span className="col-lg-3">名称</span><span className="col-lg-4">速度</span><span className="col-lg-2">始发</span><span className="col-lg-3">离港时间</span></p>
                        <div className="IO-content">{kt_leaving.sort(toSortByLatestTime).map((item, i) => <p key={item.device_id} className={`list`}><span className="col-lg-3">{item.device_name}</span><span className="col-lg-4">{(item.speed/100000).toString().slice(0, 4)}km/h</span><span className="col-lg-2">{item.leaving_wharf}</span><span className="col-lg-3">{dateFormat(new Date(item.leaving_time), 'hh:mm:ss')}</span></p>)}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default IOBoatsComponent;