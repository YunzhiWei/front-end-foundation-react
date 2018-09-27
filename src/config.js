const config = {
	dashboard: {

	}, 
	parkinglot: {

	}, 
	boatSchedule: {

	}, 
	bigdata: {

	}, 
	common: {
		baidu: {
			ap: "10059654", 
			ak: "sNMXxOABfRbtHccnLt0UhBUuAggl4pNA", 
			transCrood: "http://api.map.baidu.com/geoconv/v1/"
		}, 
		hik: {
			addr: "218.87.96.224", 
			port: "8700", 
			appkey: "c3f7218c", 
			appsecret: "0d497fa0d817466ba012a36fe61dde33", 
			getDefaultUserUuid: "/openapi/service/base/user/getDefaultUserUuid", 
			getVehicleRecords: "/openapi/service/pms/record/getVehicleRecords", 
			fetchVehicleRecordFuzzy: "/openapi/service/pms/record/fetchVehicleRecordFuzzy", 
			getPlotStatus: "/openapi/service/pms/status/getPlotStatus"
		}, 
		api: {
			addr: "localhost", 
			port: "3000", 
			path: "/test"
		}
	}
}

export default config