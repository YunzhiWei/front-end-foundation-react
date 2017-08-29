const radarDataArray = [
	{
		radarSeries: {
			data: [
				{
				    value : [50, 100, 80],
				    name : '项目1'
				},
				{
				    value : [80, 70, 60],
				    name : '项目2'
				},
				{
				    value : [40, 20, 80],
				    name : '项目3'
				}
			]
		},
		radarIndicator: {
			indicator: [
				{ name: '预算', max: 100},
				{ name: '工期', max: 100},
				{ name: '质量', max: 100}
			],
		}
	},
	{
		radarSeries: [
			{
			    value : [4300, 10000, 28000, 35000, 50000, 19000],
			    name : '预算分配'
			},
			{
			    value : [5000, 14000, 28000, 31000, 42000, 21000],
			    name : '实际开销'
			},
			{
			    value : [4500, 12000, 20000, 25000, 31000, 6000],
			    name : '测试开销'
			}
		],
		radarIndicator: [
			{ name: '销售', max: 6500},
			{ name: '管理', max: 16000},
			{ name: '信息技术', max: 30000},
			{ name: '客服', max: 38000},
			{ name: '研发', max: 52000},
			{ name: '市场', max: 25000}
		]
	}
];

export default radarDataArray;
