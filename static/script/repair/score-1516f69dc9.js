/**
 * @description 获取维修详情
 */
$.namespace("cloud.score");
cloud.score = function () {
    return {
        init: function () {
            this.getPointDetail();
            this.getSueDetail();
        },
        /*
        * @ 获取投诉详情
        */
        getSueDetail: function() {
            var _orderId = cloud.main.toQueryParams.call(window.location.href).orderId;
            $.ajax({
                url: ias.api.sueDetail
                , contentType: "application/json"
                , dataType: "json"
                , method: "post"
                , data: JSON.stringify({
                    "orderId": _orderId
                }).encode()
                , success: function (data) {
                    if (data.status == 200) {
                        var _sueList = data.results.rows
                            , sueListHTML = '';
                        if (data.results && JSON.stringify(data.results) !== "{}") {
                            if (_sueList && _sueList.length > 0) {
                                for (let i = 0; i < _sueList.length; i++) {
                                    const element = _sueList[i];
                                    sueListHTML += [
                                        , '<li class="card">'
                                        , '<div class="card-items">'
                                        , '<a href="#none" class="pay-method-con">'
                                        , ' <span class="items-title ufl">投诉时间</span>'
                                        , '<div class="items-lable ufr">'
                                        , '  <i class="fa fa-angle-right"></i>'
                                        , '' + element.createDt + ' '
                                        , ' </div>'
                                        , '</a>'
                                        , ' </div>'
                                        , '<div class="card-items card-items-long">'
                                        , ' <a href="#none" class="pay-method-con">'
                                        , '  <span class="items-title ufl">投诉内容</span>'
                                        , '<div class="items-lable ">'
                                        , ' <i class="fa fa-angle-right"></i>'
                                        , '<span class="ufr ">' + element.descs + '</span> '
                                        , ' </div>'
                                        , '</a>'
                                        , '</div>'
                                        , '<div class="card-items">'
                                        , ' <a href="#none" class="pay-method-con">'
                                        , ' <span class="items-title ufl">处理时间</span>'
                                        , ' <div class="items-lable ufr">'
                                        , ' <i class="fa fa-angle-right"></i>'
                                        , '' + element.endTime + ' '
                                        , '</div>'
                                        , '</a>'
                                        , ' </div>'
                                        , ' <div class="card-items">'
                                        , '<a href="#none" class="pay-method-con">'
                                        , ' <span class="items-title ufl">处理结果</span>'
                                        , ' <div class="items-lable ufr">'
                                        , ' <i class="fa fa-angle-right"></i>'
                                        , '' + element.results + ' '
                                        , ' </div>'
                                        , '</a>'
                                        , '</div>'
                                        , '</li>'
                                    ].join("");
                                }
                            }
                            $(".content ul").append(sueListHTML)
                        }
                    } else {
                        alert(data.message);
                    }
                }
            });
        },
         /*
        * @ 获取评论详情
        */
        getPointDetail: function () {
            var _orderId = cloud.main.toQueryParams.call(window.location.href).orderId;
            $.ajax({
                url: ias.api.pointDetail
                , contentType: "application/json"
                , dataType: "json"
                , method: "post"
                , data: JSON.stringify({
                    "orderId": _orderId
                }).encode()
                , success: function (data) {
                    if (data.status == 200) {
                        var _sueList = data.results.sueList
                            , sueListHTML ='';
                        if (data.results && JSON.stringify(data.results) !=="{}") {
                            var scoreHTML = [
                                '<li class="card">'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">总体评分</span>'
                                , '<div class="items-lable ufr">'
                                , ' <i class="fa fa-angle-right"></i>'
                                , '' + data.results.point +' 分'
                                , ' </div>'
                                , '</a>'
                                , '  </div>'
                                , ' <div class="card-items-chlid">'
                                , ' <div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">维修及时</span>'
                                , '<div class="items-lable ufr">'
                                , ' <i class="fa fa-angle-right"></i>'
                                , '' + data.results.repairScore +' 分'
                                , ' </div>'
                                , ' </a>'
                                , '</div>'
                                , '<div class="card-items">'
                                , '<a href="#none" class="pay-method-con">'
                                , '<span class="items-title ufl">维修态度</span>'
                                , ' <div class="items-lable ufr">'
                                , ' <i class="fa fa-angle-right"></i>'
                                , ' ' + data.results.serviceScore +' 分'
                                , ' </div>'
                                , ' </a>'
                                , '</div>'
                                , '<div class="card-items">'
                                , ' <a href="#none" class="pay-method-con">'
                                , ' <span class="items-title ufl">维修质量</span>'
                                , ' <div class="items-lable ufr">'
                                , '   <i class="fa fa-angle-right"></i>'
                                , '    ' + data.results.qualityScore +' 分'
                                , '   </div>'
                                , ' </a>'
                                , ' </div>'
                                , '<div class="card-items">'
                                , ' <a href="#none" class="pay-method-con">'
                                , ' <span class="items-title ufl">维修频率</span>'
                                , '<div class="items-lable ufr">'
                                , '  <i class="fa fa-angle-right"></i>'
                                , '' + data.results.numberScore +' 分'
                                , ' </div>'
                                , ' </a>'
                                , ' </div>'
                                , '</div>'
                                , '<div class="card-items card-items-long">'
                                , ' <a href="#none" class="pay-method-con">'
                                , ' <span class="items-title ufl">评价建议</span>'
                                , ' <div class="items-lable ">'
                                , '<i class="fa fa-angle-right"></i>'
                                , '<span class="ufr">' + data.results.descs +' <span>'
                                , '  </div>'
                                , ' </a>'
                                , '</div>'
                               ,'</li>'
                            ].join("")
                            $(".content ul").html(scoreHTML)
                        }
                    } else {
                        alert(data.message);
                    }
                }
            });
        }
    }
}();

$(document).ready(function () {
    cloud.score.init();
});