/**
 * 评价
 */
$.namespace("cloud.repairD");
cloud.repairD = function () {
    return {
        init: function () {
            this.getRepairThis();
        },
        /**
         * 获取维修单详情
         */
        getRepairThis: function () {
            var _repiarNo = cloud.main.toQueryParams.call(window.location.href).repairNo;
            var _repairStatusName = cloud.main.toQueryParams.call(window.location.href).repairStatusName;
            $('.card-items .items-span').eq(0).html(_repiarNo);
            $('.card-items .items-span').eq(1).html(_repairStatusName);
          
            $.ajax({
                url: ias.api.serviceDetail,
                contentType: "application/json",
                dataType: "json",
                method: "POST"
                , data: JSON.stringify({
                    "repiarNo": _repiarNo
                }).encode()
                , success: function (data) {
                    if (data.status == 200) {
                        localStorage.setItem("token", data.results.token);
                        console.log("获取报修单成功");
                        if (data.results && data.results.length > 0) {
                           var resultsHTML='';
                            for (let index = 0; index < data.results.length; index++) {
                                const element = data.results[index];
                                var materialListHTML=""
                                    ,childHTML = '';
                                if (element.materialList && element.materialList.length >0) {
                                    for (let i = 0; i < element.materialList.length; i++) {
                                        const materialList = element.materialList[i];
                                        /**
                                        * @param {any} 工单用料列表 
                                        */
                                        materialListHTML += [
                                            ' <div class="card-items">'
                                            , ' <a href="#none" class="pay-method-con">'
                                            , ' <span class= "items-title ufl"> ' + materialList.brand + '*' + materialList.qty + '</span > '
                                            , '  <div class="items-lable ufr">'
                                            , '     <i class="fa fa-angle-right"></i>'
                                            , '   ' + materialList.moneny + ''
                                            , ' </div>'
                                            , '  </a>'
                                            , ' </div>'
                                        ].join("");
                                    }
                                }
                                /**
                                * @param {any} 维修附件 
                                */
                                if (element.uploadList && element.uploadList.length > 0 ) {
                                    childHTML = [
                                        ' <div class="card-items-chlid">'
                                        , '     <img src="../../static/images/smbx_audio.png">'
                                        , '     <img src="../../static/images/smbx_photograph.png">'
                                        , '     <img src="../../static/images/smbx_photo.png">'
                                        , '     <img src="../../static/images/smbx_video.png">'
                                        , ' </div>'
                                    ].join("");
                                }
                               
                                /**
                                * @param {any} 派工单列表 
                                */
                                resultsHTML += [
                                    '<li class="card">'
                                    , '    <div class="card-items">'
                                    , '        <a href="#none" class="pay-method-con">'
                                    , '            <span class="items-title ufl">派工单号</span>'
                                    , '            <div class="items-lable ufr">'
                                    , '                <i class="fa fa-angle-right"></i>'
                                    , '                ' + element.dispatchNo +''
                                    , '            </div>'
                                    , '        </a>'
                                    , '     </div>'
                                    , '     <div class="card-items">'
                                    , '         <a href="#none" class="pay-method-con">'
                                    , '             <span class="items-title ufl">维修项目</span>'
                                    , '             <div class="items-lable ufr">'
                                    , '                <i class="fa fa-angle-right"></i>'
                                    , '                ' + element.projectName +''
                                    , '            </div>'
                                    , '       </a>'
                                    , '    </div>'
                                    , '    <div class="card-items">'
                                    , '         <a href="#none" class="pay-method-con">'
                                    , '          <span class="items-title ufl">维修说明</span>'
                                    , '            <div class="items-lable ufr">'
                                    , '                <i class="fa fa-angle-right"></i>'
                                    , '                 ' + element.descs +''
                                    , '           </div>'
                                    , '       </a>'
                                    , '    </div>'
                                    , '   <div class="card-items">'
                                    , '        <a href="#none" class="pay-method-con">'
                                    , '           <span class="items-title ufl">维修费用</span>'
                                    , '          <div class="items-lable ufr">'
                                    , '              <i class="fa fa-angle-right"></i>'
                                    , '             ' + element.repiarPrice +''
                                    , '          </div>'
                                    , '      </a>'
                                    , ' </div>'
                                    , '  <div class="card-items">'
                                    , '      <a href="#none" class="pay-method-con">'
                                    , '          <span class="items-title ufl">派工时间</span>'
                                    , '          <div class="items-lable ufr">'
                                    , '              <i class="fa fa-angle-right"></i>'
                                    , '              ' + element.createDt +''
                                    , '          </div>'
                                    , '      </a>'
                                    , '  </div>'
                                    , '  <div class="card-items">'
                                    , '      <a href="#none" class="pay-method-con">'
                                    , '          <span class="items-title ufl">接单时间</span>'
                                    , '          <div class="items-lable ufr">'
                                    , '              <i class="fa fa-angle-right"></i>'
                                    , '              ' + element.acceptTime +''
                                    , '          </div>'
                                    , '      </a>'
                                    , '  </div>'
                                    , '  <div class="card-items">'
                                    , '      <a href="#none" class="pay-method-con">'
                                    , '          <span class="items-title ufl">完工时间</span>'
                                    , '          <div class="items-lable ufr">'
                                    , '              <i class="fa fa-angle-right"></i>'
                                    , '              ' + element.completeTime +''
                                    , '          </div>'
                                    , '      </a>'
                                    , '  </div>'
                                    , '  <div class="card-items">'
                                    , '      <a href="#none" class="pay-method-con">'
                                    , '          <span class="items-title ufl">维修人员</span>'
                                    , '          <div class="items-lable ufr">'
                                    , '              <i class="fa fa-angle-right"></i>'
                                    , '              ' + element.worker +''
                                    , '          </div>'
                                    , '      </a>'
                                    , '  </div>'
                                    , '  <div class="card-items card-no">'
                                    , '      <a href="#none" class="pay-method-con">'
                                    , '         <span class="items-title ufl">维修附件</span>'
                                    , '         <div class="items-lable ufr">'
                                    , '             <i class="fa fa-angle-right"></i>'
                                    , '         </div>'
                                    , '     </a>'
                                    , ' </div>'
                                    , ' ' + childHTML   +''
                                    , ' <div class="card-items">'
                                    , '     <a href="#none" class="pay-method-con">'
                                    , '         <span class="items-title ufl">维修设备</span>'
                                    , '         <div class="items-lable ufr">'
                                    , '             <i class="fa fa-angle-right"></i>'
                                    , '             ' + element.macName +''
                                    , '         </div>'
                                    , '     </a>'
                                    , ' </div>'
                                    , ' <div class="card-items">'
                                    , '     <a href="#none" class="pay-method-con">'
                                    , '         <span class="items-title ufl">工单用料</span>'
                                    , '         <div class="items-lable ufr">'
                                    , '             <i class="fa fa-angle-right"></i>'
                                    , '         </div>'
                                    , '     </a>'
                                    , ' </div>'
                                    , ' <div class="card-items-chlid">'
                                    , '  ' + materialListHTML +' '
                                    , ' </div>'
                                    , ' <div class="card-items">'
                                    , '  <a href="#none" class="pay-method-con">'
                                    , ' <span class="items-title ufl">院方签字</span>'
                                    , ' <div class="items-lable ufr">'
                                    , '<i class="fa fa-angle-right"></i>'
                                    , '<img src="' + element.signUrl +'">'
                                    , ' </div>'
                                    , ' </a>'
                                    , ' </div>'
                                    , '</li>'
                                ].join("");
                            }
                            $('.content .pgNO').html(resultsHTML);
                        }
                        
                      
                    } else {
                        console.log(data.message);
                    }
                }
            });
        },
    }
}();

$(document).ready(function () {
    cloud.repairD.init();

});