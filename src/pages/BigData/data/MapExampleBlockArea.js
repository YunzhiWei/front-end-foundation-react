
// const mapDataSeries = [
//   {
//     name: "酒店",
//     data: [
//       {name: "苏州市", value: 500 },
//       {name: "盐城市", value: 4500 },
//     ]
//   },
//   {
//     name: "景区",
//     data: [
//       {name: "无锡市", value: 1600 },
//       {name: "扬州市", value: 3600 },
//     ]
//   }
// ];
// const geoMapName     = "江苏";
// const visualMin   = 1000;
// const visualMax   = 5000;
// const visualLabel = ['最高','最低'];


const mapDataSeries = [
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
];
const geoMapName  = "江西";
const visualMin   = 0;
const visualMax   = 2500;
const visualLabel = ['高','低'];


export default {
  geoMapName,
  visualMin,
  visualMax,
  visualLabel,
  mapDataSeries
};
