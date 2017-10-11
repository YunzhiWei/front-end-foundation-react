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
        margin: 10,
        textStyle: {
    	    color: '#fff',
    		fontSize: 36
    	},
    };
    var monthLabel = {
    	margin: 25,
    	textStyle: {
        	color: '#fff',
        	fontSize: 36
        }
    };
    var yearLabel = {
    	margin: 75,
    	textStyle: {
        	color: '#fff',
        	fontSize: 48
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
            	fontSize: 36
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
            left: 250,
        }, {
            range: '2016',
            left: 800,
        }, {
            range: '2017',
            left: 1350,
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
    	item.top = 120;
    	item.cellSize = [50, 50];
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
	                position: 'right',
	                formatter: '{b}'
	            }
	        },
	        symbolSize: function(val) {
	            return val[2] / 4;
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
	            symbolSize: 15
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
	                position: 'right',
	                formatter: '{b}'
	            }
	        },
	        symbolSize: function(val) {
	            return val[2] / 4;
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
	        trigger: 'item'
	    },
	    legend: {
	        orient: 'vertical',
	        top: 'bottom',
	        left: 'right',
	        data: ['北京 Top10', '上海 Top10', '广州 Top10'],
	        textStyle: {
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
	    name: '鹰潭市',
	    value: geoCoordMap['鹰潭']
	}, {
	    name: '九江市',
	    value: geoCoordMap['九江']
	}, {
	    name: '抚州市',
	    value: geoCoordMap['抚州']
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
            symbolSize: 30,
            rippleEffect: {
                brushType: 'stroke',
                period: 5,
                scale: 5
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    offset: [8, -2],
                    show: true,
                    textStyle: {
                        color: "yellow",
                        fontSize: 46
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
            symbolSize: 40,
            rippleEffect: {
                brushType: 'stroke',
                period: 2,
                scale: 6
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    offset: [8, -2],
                    show: true,
                    textStyle: {
                        color: "#00EBEB",
                        fontSize: 46
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
	        itemWidth: 50,
	        itemHeight: 30,
	        itemGap: 20,
	        textStyle: {
	        	color: '#fff',
	        	fontSize: 36
	        }
	    },
	    calculable : true,
	    series : [{
            name:'面积模式',
            type:'pie',
            center: ['50%', '45%'],
            radius : ['30%', '80%'],
            roseType : 'radius',
            label: {
            	normal: {
            		textStyle: {
            			fontSize: 36
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
	var giftImageUrl = "data:image/png;base64,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";

	const option = {
	    graphic: {
	        elements: [{
	            type: 'image',
	            style: {
	                image: giftImageUrl,
	                width: 30,
	                height: 30
	            },
	            left: 'center',
	            top: 'center'
	        }]
	    },
	    color: ['#83D560', '#AF89D6', '#a9ADF3'],
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)",
	        textStyle: {
	        	fontSize: 46
	        }
	    },
	    legend: {
	        orient: 'vertical', //horizontal 
	        //bottom: '0%',
	        x: 'left',
	        data: ['data1', 'data2', 'data3'],
	        textStyle: {
	            fontSize: 28,
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
	                        fontSize: '30',
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
	                value: 1778.2,
	                name: 'data1'
	            }, {
	                value: 7118,
	                name: 'data2'
	            }, {
	                value: 3870.2,
	                name: 'data3'
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
	                    shadowBlur: 30,
	                    shadowColor: 'rgba(0, 0, 0, 0.4)'
	                }
	            },

	            data: [{
	                value: 178,
	                name: 'data1'
	            }, {
	                value: 118,
	                name: 'data2'
	            }, {
	                value: 870,
	                name: 'data3'
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
	                    position: 'inner',
	                    formatter: '{c}',
	                    textStyle: {
	                        color: '#777777',
	                        fontWeight: 'bold',
	                        fontSize: 10
	                    }
	                }
	            },

	            data: [{
	                value: 178,
	                name: 'data1'
	            }, {
	                value: 118,
	                name: 'data2'
	            }, {
	                value: 870,
	                name: 'data3'
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
	    title: {
	        text: '64%',
	        subtext:"线上占比",
	        x: 'center',
	        y: 'center',
	        textStyle: {
	            color: '#fb358a',
	            fontSize: 64,
	        }
	    },
	    series: [{
	        name: '线上',
	        type: 'pie',
	        radius: ['75%', '80%'],
	        hoverAnimation: false,
	        label: {
	            normal: {
	                show: false,
	            }
	        },
	        data: [{
		        value: tips,
		        itemStyle: {
		            normal: {
		                color: '#fb358a',
		                shadowBlur: 40,
		                shadowColor: '#fb358a'
		            }
		        }
		    }, {
		        value: 100 - tips
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
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        },
	        textStyle: {
	        	fontSize: 46
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
		            	fontSize: 28
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
		            	fontSize: 28
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
	                formatter: '{c} 人'
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
			trigger: 'axis'
		},
		xAxis: {
			type: 'category',
			// boundaryGap: false,
			axisTick:{show:false},
			axisLabel:{
			    textStyle:{
			        color:'#dededf',
			        fontSize: 32
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
			        fontSize: 32
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
							fontSize: 46
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