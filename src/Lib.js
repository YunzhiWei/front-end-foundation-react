export function dateFormat(date, fmt) {
    date = new Date(date);
    const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export function whichType(data) {
    return Object.prototype.toString.call(data).slice(1, -1).split(' ').pop();
}

export function isEmpty(data) {
    const type = Object.prototype.toString.call(data).slice(1, -1).split(' ').pop();
    switch (type) {
        case 'String':
            if (!data.length) return true;
            break;
        case 'Object':
            if (!Object.keys(data).length) return true;
            break;
        case 'Array':
            if (!data.length) return true;
            break;
        case 'Function':
            if (data.toString().match(/{[\S\s]*}/ig).shift().replace(/\s/ig, '') === '{}') return true;
            break;
        case 'Number':
            if (!data) return true;
            break;
        case 'Boolean':
            if (!data) return true;
            break;
        case 'Null':
            if (!data) return true;
            break;
        case 'Undefined':
            if (!data) return true;
            break;
        case 'Date':
            if (!new Date(data).getTime()) return true;
            break;
        case 'Set':
            if (!data.size) return true;
            break;
        case 'Map':
            if (!data.size) return true;
            break;
        default:
            return false;
    }
    return false;
}

export function deepClone(data) {
    var type = Object.prototype.toString.call(data).slice(8,-1);
    var obj = null;
    if (type === 'Array') {
        obj = [];
        data.forEach((item) => obj.push(deepClone(item)));
    } else if (type === 'Object') {
        obj = {};
        Object.keys(data).forEach((item) => obj[item] = deepClone(data[item]));
    } else {
        return data;
    }
    return obj;
}