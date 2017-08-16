import { observable, computed } from 'mobx';
import dynamicChart from '../pages/BigData/data/dynamicChart';
import echartsOption from '../pages/function/function';

class DynamicChartStore {
    @observable option = {};
    constructor(){
        this.option = Object.assign({}, echartsOption(dynamicChart, 'DynamicChart'));
        setInterval(this.fetchNewDate(), 3000);
    }
    fetchNewDate () {
        let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
        // let newOption = Object.assign({}, option);
        this.option.series.map((item, i)=>{
            item.data.shift();
            item.data.push(item.type === 'line' ? Math.round(Math.random() * 10) : (Math.random() * 10 + 5).toFixed(1) - 0)
            return item.data
        })
        this.option.xAxis[0].data.shift();
        this.option.xAxis[0].data.push(axisData);
    }
    

}

export default DynamicChartStore;