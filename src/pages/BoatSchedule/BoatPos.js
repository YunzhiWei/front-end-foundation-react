import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Map, MarkerList, InfoWindow, ScaleControl, NavigationControl, OverviewMapControl, MapTypeControl, Marker, Polyline} from 'react-bmap';

import img from '../mui/images/large-screen-bg.png'

@inject("boatScheduleData") @observer
class BoatPosComponent extends Component {
    render() {
    	const { _posLineWay, _mapCenter, _posMakers, _wharfList } = this.props.boatScheduleData;
		return (
			<div style={{height: '100%', width: '100%', position: 'relative'}}>
	            <Map style={{height: '100%', width: '100%'}} center={_mapCenter} zoom="15">
	                <NavigationControl />
	                <OverviewMapControl />
	                {Object.keys(_wharfList).map((wharfName, i) => (
	                	<Marker position={_wharfList[wharfName]} icon={`red${i+1}`} key={i}>
	                		 <div style={{width: '80px', height: '25px', lineHeight: '25px', color: '#333', background: 'rgba(61, 212, 222, .4)', position: "relative", top: "-30px", left: "-38px", textAlign: 'center'}}>{wharfName}</div>
	                	</Marker>
	                ))}
	            	<MarkerList 
	            	    data={_posMakers} 
	            	    fillStyle="#ff3333" 
	            	    animation={true} 
	            	    isShowShadow={false} 
	            	    multiple={true} 
	            	    autoViewport={false}
	            	    className="test"
	            	    style={{
	            	    	width: '120px',
	            	    	height: '120px'
	            	    }}
	            	/>
	            	{_posLineWay.map((item, i) => (
	            		<Polyline 
	            			key={i}
	            		    strokeColor={item.color} 
	            		    path={item.data}
	            		    width='1px'
	            		/>
	            	))}
	            </Map>
            </div>
        );
	}
}
// 遮罩
// <div className="jxjb" style={{height: '100%', width: '100%', position: 'absolute', zIndex: '10'}}></div>
export default BoatPosComponent;