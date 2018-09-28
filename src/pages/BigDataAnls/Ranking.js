import React, { Component } from "react";

import ReactEcharts from '../lib';

import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

@inject("bigDataAnlsData") @observer
class RankingComponent extends Component {
    render() {
        if(this.props.choose === 'china') {
            var title_l = '省份排名';
            var title_r = '城市排名';
            var ranking = this.props.bigDataAnlsData._nationalRanking
        } else if(this.props.choose === 'jiangxi') {
            var title_l = '城市排名';
            var title_r = '辖区排名';
            var ranking = this.props.bigDataAnlsData._JXRanking
        } else {
            var title_l = '未获取到数据';
            var title_r = '未获取到数据';
            var ranking = [];
        }
        return (
            <div className="rank" style={{width: '100%', height: '100%'}}>
                <div className="rank_l">
                    <p className="rank_l_tit">{title_l}</p>
                    {ranking[0].map((item, i) => <p key={i}><b>{i+1}</b><span className="rank_name">{item.name}</span><span>{item.value}</span></p>) }
                </div>
                <div className="rank_r">
                    <p className="rank_r_tit">{title_r}</p>
                    {ranking[1].map((item, i) => {
                        var width = (item.value/ranking[1][0].value).toFixed(3)*100;
                        return <p key={i}><span className="col-lg-4">{item.name}</span><b className="col-lg-6"><i style={{width: `${width}%`}}></i></b><span className="col-lg-2">{item.value}</span></p> 
                    })}
                </div>
            </div>
        );
    }
}

export default RankingComponent;