import React,{ Component } from 'react';

class ParkingChargeComponent extends Component {
	render() {
		var sumParking = 'text-baohe';
		var headParking = 'text-baoman';
		var subParking = 'text-kongxian';
		var VIPParking = 'text-zhengchang';
		return (
		    <div className="parking_charge">
		    	<div>
		    		<p className="charge_title">停车场片区</p>
		    		<p className={`charge_num ${subParking}`}>+ 592,240</p>
		    		<p className="charge_subtitle">状态</p>
		    		<p className={`charge_state ${subParking}`}><span>空闲</span></p>
		    	</div>
		    	<div>
		    		<p className="charge_title">主停车场</p>
			    	<p className={`charge_num ${subParking}`}>+ 385,320</p>
			    	<p className="charge_subtitle">状态</p>
			    	<p className={`charge_state ${subParking}`}><span>空闲</span></p>
		    	</div>
		    	<div>
		    		<p className="charge_title">副停车场</p>
			    	<p className={`charge_num ${subParking}`}>+ 118,060</p>
			    	<p className="charge_subtitle">状态</p>
			    	<p className={`charge_state ${subParking}`}><span>空闲</span></p>
		    	</div>
		    	<div>
		    		<p className="charge_title">VIP停车场</p>
			    	<p className={`charge_num ${subParking}`}>+ 88,860</p>
			    	<p className="charge_subtitle">状态</p>
			    	<p className={`charge_state ${subParking}`}><span>空闲</span></p>
		    	</div>
		    </div>
		);
	}
}

export default ParkingChargeComponent;