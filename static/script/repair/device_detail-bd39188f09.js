/**
 * 获取设备详情和维修记录
 */
$.namespace("cloud.detail");
cloud.detail = function () {
    return {
        init: function () {
            this.getRepairDetail();
        },
        /**
         * 获取设备详情
         */
        getRepairDetail: function () {
            var deviceID = cloud.main.toQueryParams.call(window.location.href).id;
            var data = {
                "id": deviceID
            }
            $.ajax({
                url: ias.api.drivceDetail,
                contentType: "application/json",
                dataType: "json",
                method: "POST"
                , data: JSON.stringify(data).encode()
                ,success: function (data) {
                    if (data.status == 200) {
                        localStorage.setItem("token", data.results.token);
                        console.log("获取报修列表成功");
                        if (data.results.equip) {

                            var imgList = data.results.equip.imageUrlList
                                ,imgListHTML='';
                            // 转义特殊字符
                            var url = encodeURIComponent('macId=' + data.results.equip.id + '&roomId=' + data.results.equip.roomId + '&name=' + data.results.equip.name + '&installationPosition=' + data.results.equip.installationPosition + '&model=' + data.results.equip.model +'&tenantCode=' + data.results.equip.tenantCode)
                            if(imgList && imgList.length > 0){
                                // for(let i = 0; i<imgList.length; i++){
                                    imgListHTML += ['<div class="swiper-slide">'
                                                , '<img src = "' + imgList[0] + '" /> '
                                                , '</div >'].join("");
                                // }
                            }
                            var listsHTML = [
                                '<ul>'
                                , '<li class="card">'
                                , '<div class="logo-img">'
                                , '<div class="card-img">'
                                  , '<div class="swiper-container">'
                                , '<div class="swiper-wrapper">'+ imgListHTML +'</div>'
                                , '<div class="swiper-pagination"></div>'
                                , '</div>'
                                , '</div>'
                                , '</div>'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">设备名称</span>'
                                , '<div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + data.results.equip.name + '</div>'
                                , '</a>'
                                , '</div>'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">设备编号</span>'
                                , '<div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + data.results.equip.code + '</div>'
                                , '</a>'
                                , '</div>'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">规格型号</span>'
                                , '<div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + data.results.equip.model + '</div>'
                                , '</a>'
                                , '</div>'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">设备类型</span>'
                                , '<div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + data.results.equip.category + '</div>'
                                , ' </a>'
                                , '</div>'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">设备标识</span>'
                                , ' <div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + data.results.equip.tag + ' </div>'
                                , '</a>'
                                , '</div>'                          
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">维保厂商</span>'
                                , '<div class="items-lable ufr"> <i class="fa fa-angle-right"></i>' + data.results.equip.maintenanceProvider + '</div>'
                                , '</a>'
                                , '</div>'
                                , '</li>'
                                , '<li class="card">'
                                , ' <div class="card-items card-items-title">'
                                , ' <h4 class="card-title">资产及使用</h4>'
                                , '</div>'
                                , ' <div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , ' <span class="items-title ufl">资产原值</span>'
                                , '<div class="items-lable ufr">' + data.results.equip.originalValue + '元</div>'
                                , '</a>'
                                , ' </div>'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">资产净值</span>'
                                , '<div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + data.results.equip.netValue + '元</div>'
                                , '</a>'
                                , '</div>'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">使用年限</span>'
                                , '<div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + data.results.equip.useYear + '年</div>'
                                , ' </a>'
                                , ' </div>'
                                , '<div class="card-items card-items-long">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">安装地点</span>'
                                , '<div class="items-lable ufr"><span class="ufr">' + data.results.equip.location + '</span></div>'
                                , ' </a>'
                                , '</div>'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">安装日期</span>'
                                , '<div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + data.results.equip.assemblyString + '</div>'
                                , '</a>'
                                , '</div>'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , ' <span class="items-title ufl">启用日期</span>'
                                , '<div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + data.results.equip.enableString + '</div>'
                                , '</a>'
                                , ' </div>'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">使用部门</span>'
                                , '<div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + data.results.equip.department + '</div>'
                                , '</a>'
                                , '</div>'
                                , '</li>'
                                , ' </ul>'
                                , '<p class="content-center">'
                                , '<a href="./repair_task.html?'+ url +'"><button class="button button-default button-lg">报修</button></a>'
                                , '</p>'].join("");
                            $('.tab-content #info').html(listsHTML);
                        }
                        
                        // 维修记录
                        var repairList = data.results.repair;
                        if(repairList && repairList.length > 0){
                            var repairListHTML = ''
                            for (let i = 0; i < repairList.length; i++) {
                                var element = repairList[i];
                                repairListHTML += ['<li class="card">'
                                    , '<div class="card-items">'
                                    , '<a href="#none" class="pay-method-con">'
                                    , '<span class="items-title ufl">维修时间</span>'
                                    , '<div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + element.acceptTime + '</div>'
                                    , '</a>'
                                    , ' </div>'
                                    , '<div class="card-items">'
                                    , '<a href="#none" class="pay-method-con">'
                                    , '<span class="items-title ufl">维修项目</span>'
                                    , '<div class="items-lable ufr">'
                                    , ' <i class="fa fa-angle-right"></i>' + element.projectName +'</div>'
                                    , '</a>'
                                    , '</div>'
                                    , '<div class="card-items">'
                                    , '<a href="#none" class="pay-method-con">'
                                    , '<span class="items-title ufl">维修技师</span>'
                                    , '<div class="items-lable ufr"><i class="fa fa-angle-right"></i>' + element.worker +'</div>'
                                    , ' </a>'
                                    , '</div>'
                                    , '</li>'].join("");
                            }
                            $('.tab-content #record ul').html(repairListHTML);
                        }
                    } else {
                        alert(data.message);
                    }
                }
            });
        },
    }
}();

$(document).ready(function () {
    cloud.detail.init();
    
});