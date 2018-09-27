import { observable, computed } from 'mobx';
import axios from 'axios';
import crypto from 'crypto';
import config from '../config';
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
        opUserUuid: this.userUuid
    }
    Object.assign(data, body);
    const token = crypto.createHash('md5').update(uri + JSON.stringify(data) + appsecret).digest('hex');
    const requestBody = {
        url: `http://${addr}:${port}${uri}?token=${token}`,
        body: data
    }
    const result = await axios({
        method: 'POST', 
        url: `http://${api.addr}:${api.port}${api.path}`, 
        data: requestBody
    });
    if (result.data.errorCode) {
      alert(`地址<${uri}>请求错误：${result.data.errorMessage}`);
    }
    return result.data.data;
  }
}

export default HikApi;
