import echarts from 'echarts';
import { dateFormat } from '../../Lib';
import 'echarts/extension/bmap/bmap';
import geoCoordMap from '../BigData/data/geoCoordMap';

var toYear = dateFormat(new Date(), 'yyyy')*1;

// 日历热力图
function calendarGridData(arg) {
    function getVirtulData(year) {
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        var i = 0;
        for (var time = date; time < end; time += dayTime) {
        	let ymd = dateFormat(time, 'yyyy-MM-dd');
            data.push([
                ymd,
                arg[ymd]*1
            ]);
		}
        return data;
    }
    var dayLabel = {
        margin: 2,
        textStyle: {
    	    color: '#fff',
    		fontSize: 14
    	}
    };
    var monthLabel = {
    	margin: 6,
    	textStyle: {
        	color: '#fff',
        	fontSize: 14
        }
    };
    var yearLabel = {
    	margin: 18,
    	textStyle: {
        	color: '#fff',
        	fontSize: 18
        }
    };
    const option = {
        tooltip: {
            position: 'top',
            formatter: function (p) {
                var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
                return format + ': ' + p.data[1];
            },
            textStyle: {
            	fontSize: 14
            }
        },
        visualMap: {
            show: false,
            min: 0,
            max: 5000,
            inRange: {
            	color: ['#00C6FB', '#005BEA'],
            }
        },
        calendar: [{
            range: toYear,
            left: 50,
        }, {
            range: toYear-1,
            left: 200,
        }, {
            range: toYear-2,
            left: 350,
        }],
        series: [{
	        calendarIndex: 0,
	        data: getVirtulData(toYear)
	    }, {
	        calendarIndex: 1,
	        data: getVirtulData(toYear-1)
	    }, {
            calendarIndex: 2,
            data: getVirtulData(toYear-2)
        }]
    };
    option.calendar.map((item) => {
    	item.orient = 'vertical';
    	item.top = 50;
    	item.cellSize = [15, 15];
    	item.dayLabel = dayLabel;
    	item.monthLabel = monthLabel;
    	item.yearLabel = yearLabel;
    })
    option.series.map((item) => {
    	item.type = 'heatmap';
	    item.coordinateSystem = 'calendar';
    })
    return option;
}

// 地图分析
function anlsMapData(arg) {
	let BJData = arg.map((item) => ([{
		name: '仙女湖'
	}, {
		...item
	}]))
	// var BJData = [
	//     [{
	//         name: '仙女湖'
	//     }, {
	//         name: '浏阳',
	//         value: 6708
	//     }],
	//     [{
	//         name: '仙女湖'
	//     }, {
	//         name: '株洲',
	//         value: 5774
	//     }],
	//     [{
	//         name: '仙女湖'
	//     }, {
	//         name: '长沙',
	//         value: 4505
	//     }],
	//     [{
	//         name: '仙女湖'
	//     }, {
	//         name: '福州',
	//         value: 211
	//     }],
	//     [{
	//         name: '仙女湖'
	//     }, {
	//         name: '上海',
	//         value: 13900
	//     }],
	//     [{
	//         name: '仙女湖'
	//     }, {
	//         name: '苏州',
	//         value: 2375
	//     }],
	//     [{
	//         name: '仙女湖'
	//     }, {
	//         name: '武汉',
	//         value: 3371
	//     }],
	//     [{
	//         name: '仙女湖'
	//     }, {
	//         name: '南京',
	//         value: 418
	//     }],
	//     [{
	//         name: '仙女湖'
	//     }, {
	//         name: '杭州',
	//         value: 264
	//     }],
	//     [{
	//         name: '仙女湖'
	//     }, {
	//         name: '深圳',
	//         value: 169
	//     }]
	// ];

	var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
	var train = 'path://M67.335,33.596L67.335,33.596c-0.002-1.39-1.153-3.183-3.328-4.218h-9.096v-2.07h5.371 c-4.939-2.07-11.199-4.141-14.89-4.141H19.72v12.421v5.176h38.373c4.033,0,8.457-1.035,9.142-5.176h-0.027 c0.076-0.367,0.129-0.751,0.129-1.165L67.335,33.596L67.335,33.596z M27.999,30.413h-3.105v-4.141h3.105V30.413z M35.245,30.413 h-3.104v-4.141h3.104V30.413z M42.491,30.413h-3.104v-4.141h3.104V30.413z M49.736,30.413h-3.104v-4.141h3.104V30.413z  M14.544,40.764c1.143,0,2.07-0.927,2.07-2.07V35.59V25.237c0-1.145-0.928-2.07-2.07-2.07H-9.265c-1.143,0-2.068,0.926-2.068,2.07 v10.351v3.105c0,1.144,0.926,2.07,2.068,2.07H14.544L14.544,40.764z M8.333,26.272h3.105v4.141H8.333V26.272z M1.087,26.272h3.105 v4.141H1.087V26.272z M-6.159,26.272h3.105v4.141h-3.105V26.272z M-9.265,41.798h69.352v1.035H-9.265V41.798z';
	var tangle = 'path://M150,50L130,130L170,130Z'

	var convertData = function(data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var dataItem = data[i];
	        var fromCoord = geoCoordMap[dataItem[1].name.replace(/[省市县区镇]/g, '')];
	        var toCoord = geoCoordMap[dataItem[0].name];
	        if (fromCoord && toCoord) {
	            res.push({
	                fromName: dataItem[0].name,
	                toName: dataItem[1].name.replace(/[省市县区镇]/g, ''),
	                coords: [fromCoord, toCoord]
	            });
	        }
	    }
	    return res;
	};

	var color = ['#a6c84c', '#ffa022', '#46bee9'];
	var series = [];
	[
	    ['仙女湖', BJData]
	].forEach(function(item, i) {
	    series.push({
	        name: item[0] + ' Top10',
	        type: 'effectScatter',
	        coordinateSystem: 'bmap',
	        zlevel: 2,
	        rippleEffect: {
	            brushType: 'stroke'
	        },
	        label: {
	            normal: {
	                show: true,
	                position: 'bottom',
	                formatter: '{b}',
	                textStyle: {
	                	fontSize: 12
	                }
	            }
	        },
	        symbolSize: function(val) {
	            return val[2]/2 < 20 ? 5 : val[2]/800;
	        },
	        showEffectOn: 'render',
	        itemStyle: {
	            normal: {
	                color: color[i]
	            }
	        },
	        data: [{
	            name: item[0],
	            value: geoCoordMap[item[0]].concat([100])
	        }]
	    }, {
	        name: item[0] + ' Top10',
	        type: 'lines',
	        coordinateSystem: 'bmap',
	        zlevel: 1,
	        effect: {
	            show: true,
	            period: 6,
	            trailLength: 0.7,
	            color: '#fff',
	            symbolSize: 2
	        },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 0,
	                curveness: 0.2
	            }
	        },
	        data: convertData(item[1])
	    }, {
	        name: item[0] + ' Top10',
	        type: 'lines',
	        coordinateSystem: 'bmap',
	        zlevel: 2,
	        effect: {
	            show: true,
	            period: 6,
	            trailLength: 0,
	            symbol: tangle,
	            symbolSize: 10
	        },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 2,
	                opacity: 0.4,
	                curveness: 0.2
	            }
	        },
	        data: convertData(item[1])
	    }, {
	        name: item[0] + ' Top10',
	        type: 'effectScatter',
	        coordinateSystem: 'bmap',
	        zlevel: 2,
	        rippleEffect: {
	            brushType: 'stroke'
	        },
	        label: {
	            normal: {
	                show: true,
	                position: 'bottom',
	                formatter: '{b}',
	                textStyle: {
	                	fontSize: 12
	                }
	            }
	        },
	        symbolSize: function(val) {
	            return val[2]/2 < 20 ? 5 : val[2]/800;
	        },
	        showEffectOn: 'render',
	        itemStyle: {
	            normal: {
	                color: color[i]
	            }
	        },
	        data: item[1].map(function(dataItem) {
				let coord = geoCoordMap[dataItem[1].name.replace(/[省市县区镇]/g, '')]
				if (!coord) {
					return null;
				} else {
					return {
					    name: dataItem[1].name,
						value: coord.concat([dataItem[1].value])
					};
				}
			}).filter(item => !!item)
	    });
	});

	const option = {
	    bmap: {
	        center: [114.79,27.72],
	        zoom: 6,
	        roam: false,
	        mapStyle: {
	            styleJson: [{
                	featureType: "water",
                	elementType: "all",
                	stylers: {
                    	color: "#044161"
                    }
                },
                {
                	featureType: "land",
                	elementType: "all",
                	stylers: {
                    	color: "#004981"
                    }
                },
                {
                	featureType: "boundary",
                	elementType: "geometry",
                	stylers: {
                    	color: "#064f85"
                    }
                },
                {
                	featureType: "railway",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "highway",
                	elementType: "geometry",
                	stylers: {
                    	color: "#004981"
                    }
                },
                {
                	featureType: "highway",
                	elementType: "geometry.fill",
                	stylers: {
                    	color: "#005b96",
                    	lightness: 1
                    }
                },
                {
                	featureType: "highway",
                	elementType: "labels",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "arterial",
                	elementType: "geometry",
                	stylers: {
                    	color: "#004981"
                    }
                },
                {
                	featureType: "arterial",
                	elementType: "geometry.fill",
                	stylers: {
                    	color: "#00508b"
                    }
                },
                {
                	featureType: "poi",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "green",
                	elementType: "all",
                	stylers: {
                    	color: "#056197",
                    	visibility: "off"
                    }
                },
                {
                	featureType: "subway",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "manmade",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "local",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "arterial",
                	elementType: "labels",
                	stylers: {
                    	visibility: "off"
                    }
                },
                {
                	featureType: "boundary",
                	elementType: "geometry.fill",
                	stylers: {
                    	color: "#029fd4"
                    }
                },
                {
                	featureType: "building",
                	elementType: "all",
                	stylers: {
                    	color: "#1a5787"
                    }
                },
                {
                	featureType: "label",
                	elementType: "all",
                	stylers: {
                    	visibility: "off"
                    }
                }]
	        }
	    },
	    color: ['gold', 'aqua', 'lime'],
	    backgroundColor: '#404a59',
	    tooltip: {
	        trigger: 'item',
	        textStyle: {
	            fontSize: 16
	        }
	    },
	    series: series
	};
	return option;
}

// 省级地图分析
function anlsProvMapData(arg) {
	let geodata = arg.map(item => ({
		name: item.name,
		value: geoCoordMap[item.name.replace('地区', '市').replace(/[省市县区]/g, '')]
	}))
	var geodata1 = [{
	    name: '仙女湖',
	    value: geoCoordMap['仙女湖']
	}];
	const option = {
	    backgroundColor: '#044061',
	    geo: {
	        map: '江西',
	        label: {
	            emphasis: {
	                show: false
	            }
	        },
	        roam: false,
	        zoom: 1.2,
	        zlevel: 1,
	        itemStyle: {
	            normal: {
	                areaColor: '#004881',
	                borderColor: '#019FD4',
	                borderWidth: 2
	            },
	            emphasis: {
	                areaColor: '#004881'
	            }
	        }
	    },
	    series: [{
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 3,
            symbol: 'circle',
            symbolSize: 10,
            rippleEffect: {
                brushType: 'stroke',
                period: 5,
                scale: 5
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'top',
                    offset: [0, -20],
                    show: true,
                    textStyle: {
                        color: "yellow",
                        fontSize: 14
                    }
                }
            },
            itemStyle: {
                normal: {
                    show: true,
                    color: 'yellow'
                }
            },
            data: geodata
        }, {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 3,
            symbol: 'circle',
            symbolSize: 10,
            rippleEffect: {
                brushType: 'stroke',
                period: 2,
                scale: 6
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    offset: [20, 0],
                    show: true,
                    textStyle: {
                        color: "#00EBEB",
                        fontSize: 14
                    }
                }
            },
            itemStyle: {
                normal: {
                    show: true,
                    color: '#00EBEB'
                }
            },
            data: geodata1
        }]
	};
	return option;
}

// 男女比例
function maleToFemaleData(arg) {
	let { male, female } = arg;
	let total = male + female;
	let maleRate = (male / total * 100).toFixed(2);
	let femaleRate = (female / total * 100).toFixed(2);
    const option = {
    	color: ['#5ab1ef', '#a9ADF3'],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {d}%"
	    },
	    calculable : true,
	    series : [{
            name:'面积模式',
            type:'pie',
            center: ['50%', '45%'],
            radius : ['30%', '60%'],
            roseType : 'radius',
            label: {
            	normal: {
            		position: 'inner',
            		formatter: function (data) {
            			return data.data.value + '%'
            		},
            		textStyle: {
            			fontSize: 16
            		}
            	}
            },
            data:[
				{ value: maleRate, name: '男' },
				{ value: femaleRate, name: '女' },
            ]
        }]
	};
	return option;
}

// 景区团散比
function indvToGroupData(arg) {
	const option = {
	    color: ['#83D560', '#AF89D6', '#a9ADF3'],
	    tooltip: {
	        trigger: 'item',
	        formatter: "{b}: {c} ({d}%)",
	        textStyle: {
	        	fontSize: 16
	        }
	    },
	    series: [//外圈
	        {
	            name: '外圈',
	            type: 'pie',
	            radius: ['40%', '50%'], 
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'outside', //center  
	                    formatter: function(param) {
	                        return param.name + '\n' + param.percent + '%';
	                    },
	                    textStyle: {
	                        color: '#F0F05B',
	                        fontWeight: 'normal',
	                        fontSize: 12
	                    }
	                },

	                emphasis: {
	                    show: false,
	                }
	            },
	            labelLine: {
	                normal: {
	                    smooth: true,
	                    lineStyle: {
	                        width: 2
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    shadowBlur: 8,
	                    shadowColor: 'rgba(0, 0, 0, 0.4)'
	                }
	            },

	            data: [{
					value: arg.individual,
	                name: '散客'
	            }, {
					value: arg.group,
	                name: '团客'
	            }]
	        }, {
	            name: '最外圈',
	            silent: true,
	            type: 'pie',
	            radius: ['55%', '60%'],
	            color: ['#ffff00'],
	            avoidLabelOverlap: false,
	            itemStyle: {
	                normal: {
	                    color: '#F2F2F2'
	                },
	                emphasis: {
	                    color: '#ADADAD'
	                }
	            },
	            label: {
	                normal: {
	                	show: false,
	                }
	            },

	            data: [{
					value: arg.individual,
					name: '散客'
	            }, {
					value: arg.group,
					name: '团客'
	            }]
	        }
	    ]
	};
	return option;
}

// 线上线下比
function onToOffData(arg) {
	let { online, offline } = arg;
	let total = online + offline;
	let onlineRate = (online / total * 100).toFixed(2);
	let offlineRate = (offline / total * 100).toFixed(2);
	const option = {
	    tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            textStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            }
        },
	    series: [{
	        name: '线上线下占比',
	        type: 'pie',
	        radius: ['75%', '85%'],
	        label: {
	            normal: {
	                show: true,
	                textStyle: {
	                    fontSize: 14,
	                    fontWeight: 'bold'
	                },
	                position: "center"
	            },
	            emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                }
	        },
	        data: [{
	        	name: `线上占比 ${onlineRate}%`,
				value: online,
		        itemStyle: {
		            normal: {
		                color: '#fb358a',
		                shadowBlur: 10,
		                shadowColor: '#fb358a'
		            }
		        }
		    }, {
		    	name: `线下占比 ${offlineRate}7%`,
				value: offline,
		        itemStyle: {
		            normal: {
		                shadowBlur: 10,
		                shadowColor: '#fb358a'
		            }
		        }
		    }]
	    }]
	};
	return option;
}

// 年龄分布
function ageDistributionData(arg) {
	let { categories, data } = arg;
	const option = {
	    color: ['#3398DB'],
	    tooltip : {
	        trigger: 'axis',
	        formatter: "{b}岁左右人数： <br/>{c}",
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        },
	        textStyle: {
	        	fontSize: 16
	        }
	    },
	    grid: {
	    	left: 20,
	    	right: 0,
	    	bottom: 42,
	    },
	    xAxis : [
	        {
	            type : 'category',
				data: categories.filter(item => !!item),
	            axisTick: {
	                alignWithLabel: true
	            },
	            axisLine: {
	            	lineStyle: {
		            	color: '#fff'
		            }
	            },
	            axisLabel: {
	            	textStyle: {
	            		color: '#fff',
		            	fontSize: 12
	            	},
	            	interval: 0,
	            	rotate: 45
	            }
	        }
	    ],
	    yAxis : [
	        {
	        	show: false,
	        }
	    ],
	    series : [
	        {
	            name:'年龄分布',
	            type:'bar',
	            barWidth: '40%',
	            data:data.filter(item => !!item)
	        },
	        
	    ],
	    label: {
	            normal: {
	                show: true,
	                position: 'top',
	                formatter: '{c}',
	                textStyle: {
	                	fontSize: 12,
	                	color: '#00EBEB'
	                }
	            }
	        },
	    itemStyle: {
            normal: {
             
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(17, 168,171, 1)'
                }, {
                    offset: 1,
                    color: 'rgba(17, 168,171, 0.1)'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 2
            }
        }
	};
	return option;
}

function customerTendData(arg) {
	var month1 = [1,3,5,7,8,10,12];
	var month2 = [4,6,9,11];
	var month3 = 2;
	function getDays(month, year) {
	    return month1.indexOf(month) + 1 ? 31 : month2.indexOf(month) + 1 ? 30 : month === month3 && year%4 === 0 ? 29 : 28 ;
	}
	function getDate(index) {
	    var year = new Date().getFullYear();
	    var month = new Date().getMonth() + 1;
	    var day = new Date().getDate() - index;
	    var preMonth = month - 1;
	    if(preMonth === 0) {
	        preMonth = month + 11;
	        year -= 1;
	    }
	    var preDay = getDays(preMonth, year);
	    if(day - 1 < 0) {
	        month = preMonth;
	        day = preDay + day;
	    }
	    return [month, day];
	}
	var day = [];
	for (var i = 0; i < 7; i++) {
		day.unshift(getDate(i + 1).join('-'));
	}
	const option= {
		color: ['#38b4ee'],
		tooltip: {
			trigger: 'axis',
			textStyle: {
				fontSize: 16
			}
		},
		xAxis: {
			type: 'category',
			// boundaryGap: false,
			axisTick:{show:false},
			axisLabel:{
			    textStyle:{
			        color:'#dededf',
			        fontSize: 14
			    },
			    interval: 0
			},
			splitLine:{//网格线
                show: true,
                lineStyle:{
                    color:['#23303f'],
                    type:'solid'
                }
            },
			data: day
		},
		yAxis: {
		    // interval:50,
		    axisTick:{show:false},
		    axisLine:{
		        show:false,
		    //    onZero:false
		    },
		    axisLabel:{
			    textStyle:{
			        color:'#dededf',
			        fontSize: 14
			    }
			},
			splitLine:{//网格线
                show: true,
                lineStyle:{
                    color:['#23303f'],
                    type:'solid'
                }
            }
		},
		series: [
			{
				name:'游客趋势',
				type:'line',
				smooth:true,
			    symbolSize:2,
				data: arg.slice(-7),
				label: {
					normal: {
						show: true,
						position: 'top',
						textStyle: {
							fontSize: 16
						}
					}
				}
			},
		]
	};
	return option;
}


function echartsOption(data, name) {
    switch(name) {
        case 'CalendarGrid':
            return calendarGridData(data);
        case 'AnlsMap':
        	return anlsMapData(data);
    	case 'AnlsProvMap':
    		return anlsProvMapData(data);
		case 'MaleToFemale':
			return maleToFemaleData(data);
		case 'IndvToGroup':
			return indvToGroupData(data);
		case 'OnToOff':
			return onToOffData(data);
		case 'AgeDistribution':
			return ageDistributionData(data);
		case 'CustomerTend':
			return customerTendData(data);
        default :
            return;
    }
}

export default echartsOption;