import { observable, computed } from 'mobx';
import axios from 'axios';
import crypto from 'crypto';
import config from '../config';
const { hik: { addr, port, appkey, appsecret, getDefaultUserUuid }, api } = config.common;

class HikApi {
  async FetchHik(request) {
    if(!request) return;
    const { uri, body } = request;
    const time = new Date().getTime().toString();
    const data = {
        appkey: appkey,
        time: time, 
        opUserUuid: "f31e737cd68d11e8bd7397ad7822bcb8"
    }
    Object.assign(data, body);
    const token = crypto.createHash('md5').update(uri + JSON.stringify(data) + appsecret).digest('hex');
    const requestBody = {
        url: `${addr}:${port}${uri}?token=${token}`,
        body: JSON.stringify(data)
    }
    const result = await axios({
        method: 'GET', 
        url: `http://172.16.24.231:21009/fetchParkinglotDatas`, 
        params: {
          url: `http://${addr}:${port}${uri}?token=${token}`, 
          body: JSON.stringify(data)
        }
    });
    if (result.data.errorCode) {
        console.info(`地址<${uri}>请求错误：${result.data.errorMessage}`);
    }
    return result.data.data;
  }
}

export default HikApi;
