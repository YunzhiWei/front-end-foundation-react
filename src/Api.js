import config from './config';
const { api, dingyou } = config.common;

export async function FetchYG(url) {
	const res = await fetch(`${api.addr}${url}?key=${api.key}&appid=${api.appid}`);
    return res.json();
}

export async function FetchDY(type) {
	const res = await fetch(`${dingyou.addr}:${dingyou.port || 80}${dingyou.apiUrl}?method=${type}`);
	return res.json();
}