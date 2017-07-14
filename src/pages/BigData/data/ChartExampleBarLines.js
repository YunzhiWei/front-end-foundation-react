// const yAxisConfig = [
//   {
//     name: '收入',
//     min: 0, max: 50000, interval: 10000,
//     axisLabel: { formatter: '{value} RMB' }
//   }
// ];
// const xAxisData  = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
// const legendData = ['收入'];
// const seriesData = [
//   {
//     name:'收入',
//     type:'bar',
//     data:[10000, 20000, 30000, 50000, 40000, 40000, 30000, 30000, 350000, 25000, 45000, 25000]
//   }
// ];

// const yAxisConfig = [
//   {
//     name: '金额 RMB',
//     min: 0, max: 50000, interval: 10000,
//     axisLabel: { formatter: '{value}' }
//   }
// ];
// const xAxisData  = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
// const legendData = ['收入', '支出'];
// const seriesData = [
//   {
//     name:'收入',
//     type:'bar',
//     data:[10000, 20000, 30000, 50000, 40000, 40000, 30000, 30000, 350000, 25000, 45000, 25000]
//   },
//   {
//     name:'支出',
//     type:'bar',
//     data:[9000, 19000, 29000, 49000, 38000, 37000, 29000, 31000, 320000, 26000, 46000, 22000]
//   }
// ];


const yAxisConfig = [
  {
    name: '量',
    min: 0, max: 200, interval: 40,
    axisLabel: { formatter: '{value} ml' }
  },
  {
    name: '度',
    min: 0, max: 30, interval: 6,
    axisLabel: { formatter: '{value} °C' }
  }
];
const xAxisData  = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
const legendData = ['蒸发量', '降水量', '温度', '湿度'];
const seriesData = [
  {
    name:'蒸发量',
    type:'bar',
    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
  },
  {
    name:'降水量',
    type:'bar',
    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
  },
  {
    name:'温度',
    type:'line',
    yAxisIndex: 1,
    data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
  },
  {
    name:'湿度',
    type:'line',
    yAxisIndex: 1,
    data:[2.0, 2.2, 13.3, 14.5, 16.3, 20.2, 27.3, 23.4, 23.0, 16.5, 12.0, 6.2]
  }
];

export default {
  yAxisConfig,
  legendData,
  xAxisData,
  seriesData
};
