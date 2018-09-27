import config from './config';
const { api: { addr, appid, key } } = config.common;

export async function FetchYG(url) {
	const res = await fetch(`http://${addr}${url}?key=${key}&appid=${appid}`);
    return res.json();
}