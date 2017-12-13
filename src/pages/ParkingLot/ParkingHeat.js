import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from '../function/function';

import h337 from 'heatmapjs/heatmap.min.js';

class ParkingHeatComponent extends Component {
    constructor() {
        super();
        this.state = {
            max: 0,
            points: []
        }
    }
	componentDidMount() {
        // // 创建一个heatmap实例对象
        // // “h337” 是heatmap.js全局对象的名称.可以使用它来创建热点图实例
        // // 这里直接指定热点图渲染的div了.heatmap支持自定义的样式方案,网页外包接活具体可看官网api
        // var heatmapInstance = h337.create({
        //     container: document.querySelectorAll('#heatmap')[0],
        // });
        // var heatmapInstance2 = h337.create({
        //     container: document.querySelectorAll('#heatmap')[1],
        // });
        // //构建一些随机数据点,网页切图价格这里替换成你的业务数据
        // function loop() {
        //     var points = [];
        //     var max = 0;
        //     var width = 3640;
        //     var height = 1550;
        //     var len = 500;
        //     while (len--) {
        //         var val = Math.floor(Math.random()*100);
        //         max = Math.max(max, val);
        //         var point = {
        //             x: Math.floor(Math.random()*width),
        //             y: Math.floor(Math.random()*height),
        //             value: val
        //         };
        //         points.push(point);
        //     }
        //     var data = {
        //         max: max,
        //         data: points
        //     };
        //     heatmapInstance.setData(data); //数据绑定还可以使用
        // }
        // function loop2() {
        //     var points = [];
        //     var max = 0;
        //     var width = 1720;
        //     var height = 760;
        //     var len = 200;
        //     while (len--) {
        //         var val = Math.floor(Math.random()*100);
        //         max = Math.max(max, val);
        //         var point = {
        //             x: Math.floor(Math.random()*width),
        //             y: Math.floor(Math.random()*height),
        //             value: val
        //         };
        //         points.push(point);
        //     }
        //     var data = {
        //         max: max,
        //         data: points
        //     };
        //     heatmapInstance2.setData(data);
        // }
        // //因为data是一组数据,web切图报价所以直接setData
        // loop();
        // loop2();
    }
    render() {
        if(this.props.type === 'kuai') {
            return (
                <div id="parking_cube">
                    <div id="father">
                        <div className="zong">
                            <div id="son1" className="son">
                                <span>#B46</span>
                                <span>#B47</span>
                                <span>#B48</span>
                                <span>#B49</span>
                                <span>#B50</span>
                                <span>#B51</span>
                                <span>#B52</span>
                                <span>#B53</span>
                                <span>#B54</span>
                                <span className = "red">#B55</span>
                                <span>#B56</span>
                                <span className = "red">#B57</span>
                                <span>#B58</span>
                                <span>#B59</span>
                                <span>#B60</span>
                                <span>#B61</span>
                                <span>#B62</span>
                                <span>#B63</span>
                                <span>#B64</span>
                                <span>#B65</span>
                                <span className = "red">#B66</span>
                                <span>#B67</span>
                                <span>#B68</span>
                                <span>#B69</span>
                                <span className = "red">#B70</span>
                                <span className = "red">#B71</span>
                                <span>#B72</span>
                                <span>#B73</span>
                                <span>#B74</span>
                                <span>#B75</span>
                            </div>
                            <div id="son2" className="son">
                                <span>#A31</span>
                                <span>#A32</span>
                                <span>#A33</span>
                                <span>#A34</span>
                                <span>#A35</span>
                                <span>#A36</span>
                                <span>#A37</span>
                                <span>#A38</span>
                                <span>#A39</span>
                                <span className="red">#A40</span>
                                <span className="red">#A41</span>
                                <span className="red">#A42</span>
                                <span>#A43</span>
                                <span>#A44</span>
                                <span>#A45</span>
                                <span>#B01</span>
                                <span>#B02</span>
                                <span>#B03</span>
                                <span>#B04</span>
                                <span>#B05</span>
                                <span>#B06</span>
                                <span>#B07</span>
                                <span>#B08</span>
                                <span>#B09</span>
                                <span>#B10</span>
                                <span>#B11</span>
                                <span>#B12</span>
                                <span>#B13</span>
                                <span>#B14</span>
                                <span>#B15</span>
                            </div>
                            <div id="son3" className="son">
                                <span>#B16</span>
                                <span>#B17</span>
                                <span>#B18</span>
                                <span className="red">#B19</span>
                                <span>#B20</span>
                                <span>#B21</span>
                                <span>#B22</span>
                                <span className="red">#B23</span>
                                <span className="red">#B24</span>
                                <span className="red">#B25</span>
                                <span>#B26</span>
                                <span>#B27</span>
                                <span>#B28</span>
                                <span>#B29</span>
                                <span>#B30</span>
                                <span>#B31</span>
                                <span>#B32</span>
                                <span>#B33</span>
                                <span>#B34</span>
                                <span>#B35</span>
                                <span>#B36</span>
                                <span>#B37</span>
                                <span className="red">#B38</span>
                                <span className="red">#B39</span>
                                <span>#B40</span>
                                <span>#B41</span>
                                <span>#B42</span>
                                <span>#B43</span>
                                <span>#B44</span>
                                <span>#B45</span>
                            </div>
                            <div id="son1" className="son">
                                <span>#B46</span>
                                <span>#B47</span>
                                <span>#B48</span>
                                <span>#B49</span>
                                <span>#B50</span>
                                <span>#B51</span>
                                <span>#B52</span>
                                <span>#B53</span>
                                <span>#B54</span>
                                <span className = "red">#B55</span>
                                <span>#B56</span>
                                <span className = "red">#B57</span>
                                <span>#B58</span>
                                <span>#B59</span>
                                <span>#B60</span>
                                <span>#B61</span>
                                <span>#B62</span>
                                <span>#B63</span>
                                <span>#B64</span>
                                <span>#B65</span>
                                <span className = "red">#B66</span>
                                <span>#B67</span>
                                <span>#B68</span>
                                <span>#B69</span>
                                <span className = "red">#B70</span>
                                <span className = "red">#B71</span>
                                <span>#B72</span>
                                <span>#B73</span>
                                <span>#B74</span>
                                <span>#B75</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div id="ParkingHeat">
                    <div id="heatmap"></div>
                </div>
            );
        }
	}
}

export default ParkingHeatComponent;