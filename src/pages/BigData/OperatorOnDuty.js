import React,{ Component } from 'react';

class OperatorOnDutyComponent extends Component {
	saveHeadToLocalStorage = (type) => () => {
		localStorage.setItem(type, document.getElementById(type).innerHTML)
	}
	render() {
		return (
		    <div className="zhiban">
	    		<p><span>总负责人：</span><span id="general-head" contentEditable suppressContentEditableWarning onInput={this.saveHeadToLocalStorage('general-head')}>{localStorage.getItem("general-head") || "孔令俊"}</span></p>
	    		<p><span>游船调度负责人：</span><span id="boat-head" contentEditable suppressContentEditableWarning onInput={this.saveHeadToLocalStorage('boat-head')}>{localStorage.getItem("boat-head") || "胡岩勇"}</span></p>
	    		<p><span>客服负责人：</span><span id="custom-head" contentEditable suppressContentEditableWarning onInput={this.saveHeadToLocalStorage('custom-head')}>{localStorage.getItem("custom-head") || "刘晓芹"}</span></p>
	    		<p><span>物业负责人：</span><span id="property-head" contentEditable suppressContentEditableWarning onInput={this.saveHeadToLocalStorage('property-head')}>{localStorage.getItem("property-head") || "何小丽"}</span></p>
		    </div>
		);
	}
}

export default OperatorOnDutyComponent;