/**
 * 投诉
 */

$.namespace("cloud.evaluate");
cloud.evaluate = function () {
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
                ,success: function (data) {
                    if (data.status == 200) {
                        console.log("获取报修单成功");
                        var _projectName = data.results.projectName
                            , _createDt = data.results.createDt
                            , _orderNo = data.results.orderNo;
                        var listsHTML = [
                            '<ul>'
                            , '<li class="card">'
                            , '<div class="con">'
                            , '<div class="ub conb ulev-4">'
                            , '<div>'
                            , '<img src="../../static/images/img_shui.png" />'
                            , ' </div>'
                            , '<div class="conb2">'
                            , '<p class="cutText">&nbsp;</p>'
                            , '<p class="cutText ulev-2">' + _projectName +'</p>'
                            , '<p class="cutText-2">' + _createDt +'</p>'
                            , '</div>'
                            , '</div>'
                            , ' </div>'
                            , '<input type="hidden" name="orderNo" value="' + _orderNo +'"/>'
                            , '<p class="evaluate-center">'
                            , '<textarea name="descs" id="content" placeholder="输入投诉原因"></textarea>'
                            , '</p>'
                            , '</li>'
                            , ' </ul>'].join("");
                            
                        $('form[name=evaluate]').html(listsHTML);
                    } else {
                        console(data.message);
                    }
                }
            });
        },
        /**
         * 提交投诉
         */
        setEvaluate: function () {
            console.log(content)
            // var data = $('form.content-form').serializeArray();
            var data = {
                "orderNo": $('input[name=orderNo]').val()
                , "descs": $('textarea[name=descs]').val()
            }
            console.log(data)
            $.ajax({
                url: ias.api.repiarSue,
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: JSON.stringify(data).encode(),
                success: function (data) {
                    if (data.status == 200) {
                        localStorage.setItem("token", data.results.token);
                        console.log("投诉成功");
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
    cloud.evaluate.init();
    $('.btn-submit').click(function (event) {
        cloud.evaluate.setEvaluate();
        return false;
    });
});