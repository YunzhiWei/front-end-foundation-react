import React, { Component } from "react";

import ReactEcharts from '../lib';

import { inject, observer } from 'mobx-react';
import echartsOption from "../function/anlsFunc";

@inject("bigDataAnlsData") @observer
class IndvToGroupComponent extends Component {
    render() {
        const { _individualToGroup } = this.props.bigDataAnlsData;
        const option = echartsOption(_individualToGroup, 'IndvToGroup');    
        return (
            <ReactEcharts
                option={option}
                style={{width: '100%',height: '100%'}}
                className='IndvToGroup'
            />
        );
    }
}

export default IndvToGroupComponent;