import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';

@inject("parkingLotData") @observer
class IOCarsComponent extends Component {
    render() {
		return (
            <div id="IO-Cars">
                <div className="Input"></div>
                <div className="output"></div>
		    </div>
        );
	}
}

export default IOCarsComponent;