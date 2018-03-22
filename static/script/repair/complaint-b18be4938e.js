/**
 * 评价
 */
$.namespace("cloud.complain");
cloud.complain = function () {
    return {
        init: function () {
            this.getRepairThis();
        },
        /**
         * 获取报修单详情
         */
        getRepairThis: function () {
            var _orderId = cloud.main.toQueryParams.call(window.location.href).orderId;
            var data = {
                "orderId": _orderId
            }
            $.ajax({
                url: ias.api.repiarDetail,
                contentType: "application/json",
                dataType: "json",
                method: "POST"
                , data: JSON.stringify(data).encode()
                , success: function (data) {
                    if (data.status == 200) {
                        localStorage.setItem("token", data.results.token);
                        console.log("获取报修单成功");
                        var _repairStatusName = data.results.repairStatusName
                            , _createDt = data.results.createDt
                            , _orderNo = data.results.orderNo;
                        var listsHTML = [
                            '<div class="con">'
                            , '<div class="ub conb ulev-4">'
                            , '<div>'
                            , '<img src="../../static/images/img_shui.png" />'
                            , ' </div>'
                            , ' <div class="conb2">'
                            , ' <p class="cutText">&nbsp;</p>'
                            , ' <p class="cutText ulev-2">' + _repairStatusName + '</p>'
                            , ' <p class="cutText-2">' + _createDt + '</p>'
                            , '</div>'
                            , '</div>'
                            , '</div>'
                            , '<input type="hidden" name="orderNo" value="' + _orderNo + '" />'].join("");
                        $('#RepairThis').html(listsHTML);
                    } else {
                        console.log(data.message);
                    }
                }
            });
        },
        /**
         * 提交评价
         */
        setcomplain: function () {
            var data = {
                "orderNo": $('input[name="orderNo"]').val(),
                "repairScore": $('input[name="repairScore"]').val(),
                "serviceScore": $('input[name="serviceScore"]').val(),
                "qualityScore": $('input[name="qualityScore"]').val(),
                "numberScore": $('input[name="numberScore"]').val(),
                "descs": $('textarea[name="descs"]').val()
            }
            console.log(data)
            $.ajax({
                url: ias.api.repiarPoint,
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: JSON.stringify(data).encode(),
                success: function (data) {
                    if (data.status == 200) {
                        localStorage.setItem("token", data.results.token);
                        console.log("评价成功");
                        window.history.go(-1);
                    } else {
                        console.log(data.message);
                    }
                }
            });
        }
    }
}();

$(document).ready(function () {
    cloud.complain.init();
    $('.star').raty({
            width: 232,
            score: function () {
                return $(this).attr('data-score');
            },
            scoreName: function () {
                return $(this).attr('id');
            },
     });
    $('.btn-submit').click(function (event) {
        cloud.complain.setcomplain();
        return false;
    });

});