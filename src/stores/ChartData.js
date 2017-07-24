import { observable } from 'mobx';

class ChartData {
  @observable newdata = 0;
  @observable chartdata = {
    yAxisConfig: [
      {
        name: '收入',
        min: 0, max: 50000, interval: 10000,
        axisLabel: { formatter: '{value} RMB' }
      }
    ],
    xAxisData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    seriesData: [
      {
        name:'收入',
        type:'bar',
        data:[10000, 20000, 30000, 50000, 40000, 40000, 30000, 30000, 350000, 25000, 45000, 25000]
      }
    ]
  };

  constructor() {
    setInterval(() => {
      // this.chartdata.seriesData[0].data.shift();
      // this.chartdata.seriesData[0].data.push(Math.round(Math.random() * 50000));
      this.newdata = [Math.round(Math.random() * 10), Math.round(Math.random() * 10)]
    }, 5000);
  }
}

export default ChartData;
