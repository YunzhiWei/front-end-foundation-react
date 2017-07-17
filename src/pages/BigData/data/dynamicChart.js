const dynamicSeries = [
	{
		name: '游船数量',
		type:'bar',
		data: (function (){
            let res = [];
            let len = 50;
            while (len--) {
                res.push(Math.round(Math.random() * 10));
            }
            return res;
        })()
	},
	{
		name: '游客数量',
		type:'line',
		data: (function (){
            let res = [];
            let len = 0;
            while (len < 50) {
                res.push((Math.random()*10 + 5).toFixed(1) - 0);
                len++;
            }
            return res;
        })()
	}
]

const dynamicXAxis = [
	{
	    data: (function (){
	        let now = new Date();
	        let res = [];
	        let len = 50;
	        while (len--) {
	            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
	            now = new Date(now - 2000);
	        }
	        return res;
	    })(),
	    axisLabel: { textStyle: { color: '#fff' } }
	}
]

const dynamicYAxis = [
	{ name: '游客数量', max:20, min:0 },
	{ name: '游船数量', max:12, min:0 }
]

export default { 
	dynamicSeries,
	dynamicXAxis,
	dynamicYAxis
}
