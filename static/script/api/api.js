
var token=""


var ias = ias || {};
ias.api = {
	// "basePath":"http://192.168.0.24:8303/"
	// "basePath":"http://127.0.0.1:8303/"
	   "basePath":"https://test.fuyitianjian.net/repiar/"
	/**
	 * 登录
	 */
	,"login":"login/app"
	/**
	 * 报修项目
	 */
	, "repairProject": "repiar/create/project"
	/**
	 * 报修
	 */
	,"createScan":"repiar/create/scan"
	/**
	 * 报修项目
	 */
	,"repairProject":"repiar/create/project"
	/**
	 * 投诉
	 */
	,"repiarSue":"repiar/sue"
	/**
	 * 评价
	 */
	,"repiarPoint":"repiar/point"
	/**
	 * 评价详情
	 */
	, "pointDetail": "repiar/point/detail"
	/**
	 * 投诉详情
	 */
	, "sueDetail": "repiar/sue/detail"
	/**
	 * 删除报修
	 */
	, "repiarDelete": "repiar/my/delete"
	/**
	 * 取消报修
	 */
	, "repiarCancel": "repiar/my/cancel"
	/**
	 * 报修单列表
	 */
	,"myList":"repiar/my/list"
	/**
	 * 报修单详情
	 */
	,"repiarDetail":"repiar/detail"
	/**
	 * 维修单详情
	 */
	,"serviceDetail":"repiar/service/detail"
	/**
	 * 待派工列表
	 */
	,"groupList":"group/list"
	/**
	 * 派工工人列表
	 */
	,"workerList":"group/worker/list"
	/**
	 * 派工
	 */
	,"groupOprate":"group/oprate"
	/**
	 * 维修单列表
	 */
	,"serviceList":"service/list"
	/**
	 * 接单
	 */
	,"serviceAccept":"service/accept"
	/**
	 * 转单
	 */
	,"serviceTurnOn":"service/turnOn"
	/**
	 * 挂单
	 */
	,"serviceHang":"service/hang"	
	/**
	 * 取消挂单
	 */
	,"serviceJoin":"service/join"
	/**
	 * 完工
	 */
	,"serviceFinish":"service/finish"
	/**
	 * 提交工单用料
	 */
	,"materialSubmit":"materials/out"
	/**
	 * 视频保修
	 */
	,"videoRepair":"repiar/create/video"
	/**
	 * 音频保修
	 */
	,"audioRepair":"repiar/create/audio"
	/**
	 * 获取设备列表
	 */
	,"drivceList":"drivce/tree"
	/**
	 * 维修用料列表
	 */
	,"materialsList":"materials/service/list"
	/**
	 * 仓库列表
	 */
	,"materialsHouse":"materials/house"
	/**
	 * 物料查询
	 */
	,"materialsQuery":"materials/query"
	/**
	 * 挂单原因
	 */
	,"hangCause":"content/get/repair-exten-type.json"
	/**
	 * 故障类型
	 */
	,"repiarType":"content/get/repair-repiar-type.json"
	/**
	 * 转单原因
	 */
	,"turnOnCause":"content/get/repair-transfer-type.json"
	/**
	 *设备扫一扫
	 */
	, "equipScan": "scan/code"
	/**
	 * 设备详情
	 */
	, "drivceDetail": "drivce/detail"
	/**
	 * 房间扫一扫
	 */
	, "roomScan": "scan/code"
	/**
	 * 房间详情
	 */
	, "roomDetail": "scan/otherScan"
	/**
	 * 报修紧急程度
	 */
	, "repairLevel": "_content/get/repair-level.json"
	/**
	 * 楼宇树
	 */
	,"serviceLocation":"service/location"
	/**
	 * 房间设备列表
	 */
	,"equipList":"drivce/equipList"
	/**
	 * 维修单数量
	 */
	,"serviceNum":"service/serviceNum"
	/**
	 * 上传文件
	 */
	, "uploadFile": "common/upload/file"
}

/**
 * 登录 
 */
function tokens() {
	$.ajax({
		url: ias.api.basePath+ias.api.login
		,contentType : "application/json"
	    ,dataType : "json"
		,method:"post"
		,async: false
		,data: JSON.stringify({
			"phone":"zzyy_a101"
		}).encode()
		,success:function(data) {
			if(data.status == 200) {
				localStorage.setItem("token",data.results.token);
				token=data.results.token;
				console.log(token)
			} else {
				alert(data.message);
			}
		}
	})
}
// tokens() 


/**
 * 公共处理请求之前数据
 */
$.ajaxSetup({ cache: false }); 
$(document).ajaxSend(function (event, jqXHR, options) {
//	console.log(options)
		 for (var key in ias.api) {
		 	if ((ias.api[key] == options.url || ias.api[key] == options.url.split("?")[0]) && options.url.indexOf(ias.api.basePath) == -1) {
				  options.url = ias.api.basePath + options.url 
					//   + '?flag=' + Date.parse(new Date());
		 	}
		 }
	
	jqXHR.setRequestHeader("token", token);
	jqXHR.setRequestHeader("devicetype", "h5");
	jqXHR.setRequestHeader("h5User-agent", "h5");
});

$(document).ajaxComplete(function (event, jqXHR, options) {

});

$(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
	if (jqXHR.status == 404) {
		alert("404,页面不存在");
	} else if (jqXHR.status == 405) {
		alert("405,资源被禁止");
	} else if (jqXHR.status == 401) {
		top.location = top.location;
	} else if (jqXHR.status == 500) {
		alert("500,服务器内部错误");
	}
});

