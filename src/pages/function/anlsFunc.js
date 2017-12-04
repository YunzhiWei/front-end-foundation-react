import echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import geoCoordMap from '../BigData/data/geoCoordMap';

// 日历热力图
function calendarGridData(arg) {
    function getVirtulData(year) {
        year = year || '2017';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 1000)
            ]);
        }
        return data;
    }
    var dayLabel = {
        margin: 2,
        textStyle: {
    	    color: '#fff',
    		fontSize: 14
    	},
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
            max: 1000,
            inRange: {
            	color: ['#0EF', '#07F'],
            }
        },
        calendar: [{
            range: '2015',
            left: 50,
        }, {
            range: '2016',
            left: 200,
        }, {
            range: '2017',
            left: 350,
        }],
        series: [{
	        calendarIndex: 0,
	        data: getVirtulData(2015)
	    }, {
	        calendarIndex: 1,
	        data: getVirtulData(2016)
	    }, {
            calendarIndex: 2,
            data: getVirtulData(2017)
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
	var BJData = [
	    [{
	        name: '北京'
	    }, {
	        name: '上海',
	        value: 95
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '广州',
	        value: 90
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '大连',
	        value: 80
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '南宁',
	        value: 70
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '南昌',
	        value: 60
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '拉萨',
	        value: 50
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '长春',
	        value: 40
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '包头',
	        value: 30
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '重庆',
	        value: 20
	    }],
	    [{
	        name: '北京'
	    }, {
	        name: '常州',
	        value: 10
	    }]
	];
	var SHData = [
	    [{
	        name: '上海'
	    }, {
	        name: '包头',
	        value: 95
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '昆明',
	        value: 90
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '广州',
	        value: 80
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '郑州',
	        value: 70
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '长春',
	        value: 60
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '重庆',
	        value: 50
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '长沙',
	        value: 40
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '北京',
	        value: 30
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '丹东',
	        value: 20
	    }],
	    [{
	        name: '上海'
	    }, {
	        name: '大连',
	        value: 10
	    }]
	];
	var GZData = [
	    [{
	        name: '广州'
	    }, {
	        name: '福州',
	        value: 95
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '太原',
	        value: 90
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '长春',
	        value: 80
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '重庆',
	        value: 70
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '西安',
	        value: 60
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '成都',
	        value: 50
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '常州',
	        value: 40
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '北京',
	        value: 30
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '北海',
	        value: 20
	    }],
	    [{
	        name: '广州'
	    }, {
	        name: '海口',
	        value: 10
	    }]
	];

	var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

	var convertData = function(data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var dataItem = data[i];
	        var fromCoord = geoCoordMap[dataItem[0].name];
	        var toCoord = geoCoordMap[dataItem[1].name];
	        if (fromCoord && toCoord) {
	            res.push({
	                fromName: dataItem[0].name,
	                toName: dataItem[1].name,
	                coords: [fromCoord, toCoord]
	            });
	        }
	    }
	    return res;
	};

	var color = ['#a6c84c', '#ffa022', '#46bee9'];
	var series = [];
	[
	    ['北京', BJData],
	    ['上海', SHData],
	    ['广州', GZData]
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
	            return val[2]/2 < 5 ? 5 : val[2]/8;
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
	            symbolSize: 3
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
	            symbol: planePath,
	            symbolSize: 16
	        },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 1,
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
	                	fontSize: 16
	                }
	            }
	        },
	        symbolSize: function(val) {
	            return val[2]/2 < 5 ? 5 : val[2]/8;
	        },
	        showEffectOn: 'render',
	        itemStyle: {
	            normal: {
	                color: color[i]
	            }
	        },
	        data: item[1].map(function(dataItem) {
	            return {
	                name: dataItem[1].name,
	                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
	            };
	        })
	    });
	});

	const option = {
	    bmap: {
	        center: [104.114129, 37.550339],
	        zoom: 4,
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
	    legend: {
	        orient: 'vertical',
	        bottom: 20,
	        left: 'right',
	        itemGap: 10,
	        itemWidth: 10,
	        itemHeight: 10,
	        data: ['北京 Top10', '上海 Top10', '广州 Top10'],
	        textStyle: {
	        	fontSize: 16,
	            color: '#fff'
	        },
	        selectedMode: 'single'
	    },
	    series: series
	};
	return option;
}

// 省级地图分析
function anlsProvMapData(arg) {
	var geodata = [{
	    name: '南昌市',
	    value: geoCoordMap['南昌']
	}, {
	    name: '上饶市',
	    value: geoCoordMap['上饶']
	}, {
	    name: '萍乡市',
	    value: geoCoordMap['萍乡']
	}, {
	    name: '九江市',
	    value: geoCoordMap['九江']
	}, {
	    name: '宜春市',
	    value: geoCoordMap['宜春']
	}, {
	    name: '樟树市',
	    value: geoCoordMap['樟树']
	}, {
	    name: '赣州市',
	    value: geoCoordMap['赣州']
	}, {
	    name: '吉安市',
	    value: geoCoordMap['吉安']
	}, ];
	var geodata1 = [{
	    name: '新余市',
	    value: geoCoordMap['新余']
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
    const option = {
    	color: ['#5ab1ef', '#a9ADF3'],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {d}%"
	    },
	    legend: {
	        x : 'center',
	        y : 'bottom',
	        data:['男','女'],
	        itemWidth: 14,
	        itemHeight: 10,
	        itemGap: 8,
	        textStyle: {
	        	color: '#fff',
	        	fontSize: 14
	        }
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
            		textStyle: {
            			fontSize: 16
            		}
            	}
            },
            data:[
                {value:64, name:'男'},
                {value:36, name:'女'},
            ]
        }]
	};
	return option;
}

// 景区团散比
function indvToGroupData(argument) {
	const option = {
	    color: ['#83D560', '#AF89D6'],
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)",
	        textStyle: {
	        	fontSize: 16
	        }
	    },
	    legend: {
	        orient: 'horizontal', //vertical
	        //bottom: '0%',
	        x: 'center',
	        itemWidth: 14,
	        itemHeight: 10,
	        itemGap: 8,
	        data: ['散客', '团客'],
	        textStyle: {
	            fontSize: 12,
	            color: '#fff'
	        }
	    },
	    series: [
	        //内圈
	        {
	            name: '内圈',
	            type: 'pie',
	            roseType: 'area', //area比例缩放 ，radius
	            radius: ['30%', '60%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'inner', //center 
	                    formatter: '{d}%', //{d} 
	                    textStyle: {
	                        color: '#fff',
	                        fontWeight: 'bold',
	                        fontSize: 14
	                    }
	                },
	                emphasis: {
	                    show: true,
	                    textStyle: {
	                        fontSize: 14,
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data: [{
	                value: 118,
	                name: '散客'
	            }, {
	                value: 178,
	                name: '团客'
	            }]
	        }, //外圈
	        {
	            name: '外圈',
	            type: 'pie',
	            radius: ['70%', '85%'], 
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'inner', //center  
	                    formatter: function(param) {
	                        return param.name + ':\n' + Math.round(param.percent) + '%';
	                    },
	                    textStyle: {
	                        color: '#fff',
	                        fontWeight: 'bold',
	                        fontSize: 14
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
	                value: 118,
	                name: '散客'
	            }, {
	                value: 178,
	                name: '团客'
	            }]
	        }, {
	            name: '最外圈',
	            type: 'pie',
	            radius: ['90%', '95%'],
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
	                    position: 'inner',
	                    formatter: '{c}',
	                    textStyle: {
	                        color: '#777777',
	                        fontWeight: 'bold',
	                    }
	                }
	            },

	            data: [{
	                value: 118,
	                name: '散客'
	            }, {
	                value: 178,
	                name: '团客'
	            }]
	        }
	    ]
	};
	return option;
}

// 线上线下比
function onToOffData(arg) {
	var tips = 64;
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
	        	name: "线上占比",
		        value: tips,
		        itemStyle: {
		            normal: {
		                color: '#fb358a',
		                shadowBlur: 10,
		                shadowColor: '#fb358a'
		            }
		        }
		    }, {
		    	name: "线下占比",
		        value: 100 - tips,
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
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['10', '15', '20', '25', '30', '35', '40','45','50','55','60','65+'],
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
		            	fontSize: 16
	            	}
	            }
	        }
	    ],
	    yAxis : [
	        {
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
	            	}
	            }
	        }
	    ],
	    series : [
	        {
	            name:'年龄分布',
	            type:'bar',
	            barWidth: '40%',
	            data:[100, 200, 300, 400, 300, 200, 300,300,200,350,250,100,]
	        },
	        
	    ],
	    label: {
	            normal: {
	                show: true,
	                position: 'top',
	                formatter: '{c}',
	                textStyle: {
	                	fontSize: 12
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
                shadowBlur: 10
            }
        }
	};
	return option;
}

function customerTendData(arg) {
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
			    }
			},
			splitLine:{//网格线
                show: true,
                lineStyle:{
                    color:['#23303f'],
                    type:'solid'
                }
            },
			data: ['09-10','09-12','09-14','09-16','09-18','09-20','09-22','09-24','09-26']
		},
		yAxis: {
		    min:0,
		    max:100,
		    interval:20,
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
				name:'剩余额度',
				type:'line',
				smooth:true,
			    symbolSize:12,
				data:['48','43','41','40','24','53','47','50','49'],
				label: {
					normal: {
						show: false,
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