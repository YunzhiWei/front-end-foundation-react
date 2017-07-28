const BlockAreaDataArray = [
  { // id: 0
    mapDataSeries: [
      {
        name: "酒店",
        data: [
          {name: "苏州市", value: 500 },
          {name: "盐城市", value: 4500 },
        ]
      },
      {
        name: "景区",
        data: [
          {name: "无锡市", value: 1600 },
          {name: "扬州市", value: 3600 },
        ]
      }
    ],
    geoMapName: "江苏",
    map: 'jiangsu',
    visualMin: 1000,
    visualMax: 5000,
    visualLabel: ['最高','最低']
  },
  { // id: 1
    mapDataSeries: [
      {
        name: "2018",
        data:[
          {name: "南昌市",   value: 953 },
          {name: "九江市",   value: 111 },
          {name: "宜春市",   value: 222 },
          {name: "上饶市",   value: 333 },
          {name: "鹰潭市",   value: 444 },
          {name: "赣州市",   value: 555 },
          {name: "吉安市",   value: 666 },
          {name: "萍乡市",   value: 777 },
          {name: "新余市",   value: 888 },
          {name: "抚州市",   value: 1200 },
          {name: "景德镇市", value: 999 },
        ]
      },
      {
        name: "2017",
        data:[
            {name: "南昌市",   value: 120 },
            {name: "九江市",   value: 121 },
            {name: "宜春市",   value: 122 },
            {name: "上饶市",   value: 123 },
            {name: "鹰潭市",   value: 125 },
            {name: "赣州市",   value: 143 },
            {name: "吉安市",   value: 154 },
            {name: "萍乡市",   value: 143 },
            {name: "新余市",   value: 154 },
            {name: "抚州市",   value: 165 },
            {name: "景德镇市", value: 187 },
        ]
      },
      {
        name: "2016",
        data:[
          {name: "南昌市",   value: 927 },
          {name: "九江市",   value: 640 },
          {name: "宜春市",   value: 330 },
          {name: "上饶市",   value: 657 },
          {name: "鹰潭市",   value: 404 },
          {name: "赣州市",   value: 168 },
          {name: "吉安市",   value: 235 },
          {name: "萍乡市",   value: 962 },
          {name: "新余市",   value: 472 },
          {name: "抚州市",   value: 589 },
          {name: "景德镇市", value: 800 },
        ]
      }
    ],
    geoMapName: "江西",
    map: 'jiangxi',
    visualMin: 0,
    visualMax: 2500,
    visualLabel: ['高','低'],
  }
];

export default BlockAreaDataArray;
