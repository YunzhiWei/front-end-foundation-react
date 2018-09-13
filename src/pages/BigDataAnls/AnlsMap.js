import React, { Component } from "react";

import ReactEcharts from '../lib';
import CountUp from 'react-countup';

import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

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

@inject("bigDataAnlsData") @observer
@inject("echartsData") @observer
class AnlsMapComponent extends Component {
    render() {
        const { online, offline, check } = this.props.echartsData.ticketsNum;
        const option = echartsOption(this.props.bigDataAnlsData, 'AnlsMap');
        const setting1 = setting(0, online+offline);
        const setting2 = setting(0, check);        
        return (
            <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
                <ReactEcharts
                    option={option}
                    style={{width: '100%',height: '100%'}}
                    className='AnlsMap'
                />
                <div className="anlsmap">
                    <div>
                        <p>今日累计游客</p>
                        <p className="cyan"><span><b><CountUp className="account-balance" {...setting1} /></b></span> 人</p>
                    </div>
                    <div>
                        <p>当前景区人数</p>
                        <p className="yellow"><span><b><CountUp className="account-balance" {...setting2} /></b></span> 人</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default AnlsMapComponent;