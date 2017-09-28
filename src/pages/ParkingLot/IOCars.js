import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';

@inject("parkingLotData") @observer
class IOCarsComponent extends Component {
    render() {
        var inputCars = [
            {
                license: "赣A9U070",
                id: 1111111111,
                logo: '奔驰',
                time: '10:00:59'
            }, {
                license: "赣C58888",
                id: 1111111112,
                logo: '宝马',
                time: '10:08:59'
            }, {
                license: "赣D58888",
                id: 1111111113,
                logo: 'GTR',
                time: '10:08:59'
            }, {
                license: "赣E58888",
                id: 1111111114,
                logo: 'AE86',
                time: '10:08:59'
            }, {
                license: "赣H58888",
                id: 1111111115,
                logo: '大众桑塔纳',
                time: '10:08:59'
            }, 
        ]
		return (
            <div id="IO-Cars">
                <div className="Input">
                    {inputCars.map((item, i) => <p key={item.id} style={{color: '#ffffff'}}><span>{item.license}</span><span>{item.logo}</span><span>{item.time}</span></p>)}
                </div>
                <div className="output">

                </div>
		    </div>
        );
	}
}

export default IOCarsComponent;