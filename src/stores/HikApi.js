import { observable, computed } from 'mobx';
import axios from 'axios';
import crypto from 'crypto';
import config from '../config';
import $ from 'jquery';
const { hik: { addr, port, appkey, appsecret, getDefaultUserUuid }, api } = config.common;

class HikApi {
  @observable userUuid = ""
  constructor() {

  }
  @observable async FetchHik(request) {
    this.userUuid = await this.Fetch({ uri: getDefaultUserUuid });
    return await this.Fetch(request);
  }
  async Fetch(request) {
    if(!request) return;
    const { uri, body } = request;
    const time = new Date().getTime().toString();
    const data = {
        appkey: appkey,
        time: time, 
        opUserUuid: "05fb9e8cdfb511e78e7cc75bf57dc840"
    }
    Object.assign(data, body);
    const token = crypto.createHash('md5').update(uri + JSON.stringify(data) + appsecret).digest('hex');
    const requestBody = {
        url: `http://${addr}:${port}${uri}?token=${token}`,
        body: JSON.stringify(data)
    }
    const result = await axios({
        method: 'GET', 
        url: `http://${api.addr}/OpenApi/CommonHandle`, 
        params: {
          key: api.key, 
          appid: api.appid, 
          url: `http://${addr}:${port}${uri}?token=${token}`, 
          body: JSON.stringify(data)
        }
    });
    if (result.data.errorCode) {
        alert(`地址<${uri}>请求错误：${result.data.errorMessage}`);
    }
    console.log(JSON.parse(result.data));
    return JSON.parse(result.data).data;
  }
}

export default HikApi;
