/**
 * 获取设备详情和维修记录
 */
$.namespace("cloud.select");
cloud.select = function () {
    return {
        init: function () {
            this.getDevice();
        },
        /**
         * 获取房间设备列表
         */
        getDevice: function () {
            var roomID = cloud.main.toQueryParams.call(window.location.href).id;
            var _this = this;
            $.ajax({
                url: ias.api.roomDetail + '?id=' + roomID +'&type=0'
                , contentType: "application/json"
                , dataType: "json"
                , method: "GET"
                , success: function (data) {
                    if (data.status == 200) {
                        var installationPosition = data.results.buildingName + '-' + data.results.floorName + '-' + data.results.name // 房间安装位置
                            , roomId = data.results.id// 房间ID
                            , deviceList = data.results.equipList//设备列表
                            , tenantCode = data.results.tenantCode;//所属机构
                        $('#installationPosition').html(installationPosition)
                        _this.getAllDevice(installationPosition, roomId, deviceList, tenantCode);
                    } else {
                        alert(data.message);
                    }
                }
            });
        }, 
        /**
         * 遍历房间设备
         */
        getAllDevice: function (installationPosition, roomId, deviceList,tenantCode) {
            if (deviceList && deviceList.length > 0) {
                var deviceListHTML = '';
                for (let i = 0; i < deviceList.length; i++) {
                    if (deviceList[i].id != "0") {
                        deviceListHTML += [
                            '<div class="parent-select">'
                            , '<div class="card-items card-items-parent">'
                            , '<a href="#none" class="pay-method-con equipment" id="">'
                            , '<span class="items-title ufl">' + deviceList[i].category + '</span>'
                            , '<div class="items-icon ufr">'
                            , '<span id=""></span>'
                            , '<i class="icon"></i>'
                            , '</div>'
                            , ' </a>'
                            , '</div>'].join("");
                   }else{
                        deviceListHTML += ['<div class="parent-select">'
                            , '<div class="card-items">'
                            , ' <a href="./repair_task.html?roomId=' + roomId + '&installationPosition=' + installationPosition + '&tenantCode=' + tenantCode + '" class="pay-method-con" id="">'
                            , '<span class="items-title ufl">其他</span>'
                            , '<div class="items-icon ufr">'
                            , ' <span id=""></span>'
                            , '<i class="icon"></i>'
                            , ' </div>'
                            , ' </a>'
                            , ' </div>'
                            , ' </div>'].join("");
                   }
                    // 其他的分类没有子类
                    if (deviceList[i].id != "0"){
                        for (let j = 0; j < deviceList[i].equipList.length; j++) {
                            // 转义特殊字符
                            var url = encodeURIComponent('macId=' + deviceList[i].equipList[j].id + '&roomId=' + roomId + '&name=' + deviceList[i].equipList[j].name + '&installationPosition=' + installationPosition + '&model=' + deviceList[i].equipList[j].model + '&tenantCode=' + tenantCode);
                            deviceListHTML += [
                                , '<div class="card-items-chlid card-items-parent-chlid">'
                                , ' <div class="card-items">'
                                , '<a href="./repair_task.html?' + url + '" class="pay-method-con equipment" id="">'
                                , '<span class="items-title ufl">' + deviceList[i].equipList[j].name + '</span>'
                                , ' <div class="items-icon ufr">'
                                , ' <span id=""></span>'
                                , ' <i class="icon"></i>'
                                , '</div>'
                                , ' </a>'
                                , ' </div>'
                                , '</div>'].join("");
                        }
                    }
                    deviceListHTML += '</div>';
                }

                
                $('.content #deviceCard').html(deviceListHTML);
            }
        }
    }
}();

$(document).ready(function () {
    cloud.select.init();
    
});