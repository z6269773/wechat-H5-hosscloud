/**
 * 报修任务
 */

var resultsData=[];
var resultsMedia =[]
$.namespace("cloud.task");
cloud.task = function () {
    return {
        init: function () {
            this.getRepairThis();
            this.getRepairLevel();
            this.getQueryParams();
        },
        /**
         * 获取报修位置
         * 获取保修设备
         * 获取保修型号
         */
        getQueryParams: function () {
            // 转回特殊字符
            var  ourl = decodeURIComponent(window.location.href);
            var QueryParams = cloud.main.toQueryParams.call(ourl);
            if (QueryParams) {
                $('#installationPosition').html(QueryParams.installationPosition)
                $('#name').html(QueryParams.name)
                $('#model').html(QueryParams.model)
            }
            return QueryParams;
        },

        /**
         * 获取报修项目
         */
        getRepairThis: function () {
            var $tenantCode =  this.getQueryParams().tenantCode;
            var data = {
                "tenantCode": $tenantCode
            }
            $.ajax({
                url: ias.api.repairProject,
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: JSON.stringify(data).encode(),
                success: function (data) {
                    if (data.status == 200) {
                        localStorage.setItem("token", data.results.token);
                        console.log("获取报修列表成功");
                        if (data.results && data.results.length > 0 ) {
                            /**
                             * @param 常量赋值
                             */
                            resultsData = data.results;
                            var listsHTML = "";
                            for (let index = 0; index < data.results.length; index++) {
                                const element = data.results[index];
                                  listsHTML += [ 
                                    '<div class="clearfix ulev-2 con uinn big" data-id=' + element.value + '>'
                                        , '<span class="ufl">' + element.text + '</span>'
                                        ,'<span class="ufr">'
                                        ,' <img src="../../static/images/icon_back_b.png" />'
                                    ,' </span>'
                                    ,'</div>'].join("");
                               
                            }
                            $('.contentt0 .content-p').html(listsHTML);
                        }
                    } else {
                        console.log(data.message);
                    }
                }
            });
        },
        /**
        * 选择项目小类
        */
        getRepairC: function (value) {
            var _resultsData = resultsData
                ,msgHTML = "";
            $(_resultsData).each(function (x, y) {
                if (y.value == value) {
                    $(y.nodes).each(function (i, e) {
                        msgHTML += [
                            , '<div class="clearfix ulev-2 con uinn con22" value="' + e.value + '">'
                            , '<span class="ufl con22_img">'
                            , '<img src="../../static/images/icon_dh_l.png" />'
                            , ' </span>', '<span class="ufl">' + e.text + '</span>', ' </div> '
                            , '</div>'].join("");
                    })
                }
            })
            $('.contentt0 .content-c').html(msgHTML);
        },
        /**
         * 得到紧急程度枚举
         */
        getRepairLevel: function () {
            $.ajax({
                url: ias.api.repairLevel,
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                success: function (data) {
                    for (const i in data) {
                        if (data.hasOwnProperty(i)) {
                            var lableHTML;
                            if (i == 1) {
                                lableHTML = [
                                    '<label class="button button-sm button-active" for="' + i + '">', '<input name="lavel" class="hide-input" type="radio" id="' + i + '" value="' + i + '" checked="checked" />' + data[i] + '', '</label>'
                                ].join("");
                            } else {
                                lableHTML = [
                                    '<label class="button button-sm" for="' + i + '">', '<input name="lavel" class="hide-input" type="radio" id="' + i + '" value="' + i + '" />' + data[i] + '', '</label>'
                                ].join("");
                            }
                            $('#repairLevel').append(lableHTML)
                        }

                    }
                }
            });
        },

        /**
         * 提交报修
         */
        setTask: function () {

            var macId = this.getQueryParams().macId;
            var typeId = $('input[name="typeId"]').val();
            var roomId = this.getQueryParams().roomId;
            var desc = $('textarea[name="descs"]').val();
            var lavel = $('input[name="lavel"]:checked ').val();
            var data = {
                "macId": macId || "",
                "typeId": typeId,
                "roomId": roomId,
                "descs":  desc,
                "lavel": lavel,
                "uploadId": resultsMedia.join(",")
            }
            console.log(data)
            $.ajax({
                url: ias.api.createScan,
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: JSON.stringify(data).encode(),
                success: function (data) {
                    let _orderId = data.results || "";
                    if (data.status == 200) {
                        window.open('./alert.html?orderId=' + _orderId + '', '_self');
                    } else {
                        alert(data.message);
                    }
                },
                 complete:function(XMLHttpRequest,textStatus){  
                      $(".btn-submit").attr("disabled",false)
                 }
            });
        }
    }
}();

$(document).ready(function () {
    cloud.task.init();
    var $upload = $(".btn-submit");
    $upload.on('click', function () {
         // 手动上传
        // $tgaUpload1.upload();
        $(this).attr("disabled",true)
        cloud.task.setTask();
        return false;
    });
    $(".ios-content").on('click', 'label.button', function (event) {
        $('label.button').removeClass('button-active')
        $(this).addClass('button-active')
        console.log($('input[name="lavel"]:checked ').val())
    });
    /*****chengjian.jiang ***/
    $("#equipment").click(function () {
        $(".contentt0").show()
    })
    //项目点击下一层
    var str1;
    $(".ios-content").on('click','.big',function () {
        str1 = $(this).children("span:first-child").text()
        var index = $(this).parents(".box").index()
        var value = $(this).data("id")
        if (index != 1) {
            cloud.task.getRepairC(value);
            $(".contentt0 .box").addClass("display_none")
            $(".contentt0 .box").eq(index + 1).removeClass("display_none")
        }
    })
    //项目页面点击选中设备
    $(".ios-content").on('click','.con22',function () {
        $(".con22 span>img").css("display", "none")
        $(this).find("span>img").css("display", "block")
    })

    //项目页面提交设备
    $(".ios-content").on('click', '.contentt0 .sub_btn', function () {
      
        var equip = "";
        $($(".con22")).each(function () {
            if ($(this).find("span>img").css("display") == "block") {
                equip = $(this).children().eq(1).text()
                equipValue = $(this).attr("value")
            }
        })
        var img = $("#project *").not("b")[0]
        $('input[name="typeId"]').val(equipValue)
        $("#equipmentLable").html('【'+str1+'】'+ equip).append(img)
        $(".contentt0").hide()
        $(".contentt0 .box").addClass("display_none")
        $(".contentt0 .box").eq(0).removeClass("display_none")
    })
    //项目页面取消
    $(".ios-content").on('click','.contentt0 .btn_solve', function () {
        $(".contentt0").hide()
        $(".contentt0 .box").addClass("display_none")
        $(".contentt0 .box").eq(0).removeClass("display_none")
    });


    // 上传图片
    var $tgaUpload1 = $('#goodsUpload').diyUpload({
        // 自动上传。
        auto: true,
        url: ias.api.basePath+ias.api.uploadFile,
        success: function (data) { 
            if (data.status == 200) {
                resultsMedia.unshift(data.results.id); 
           }
        },
        error: function (err) {
            $('.diyProgress').css("width","100%")
            
         },
        buttonText: '',
        accept: {
            title: "Images",
            extensions: 'gif,jpg,jpeg,bmp,png'
        },
        thumb: {
            width: 120,
            height: 90,
            quality: 100,
            allowMagnify: true,
            crop: true,
        }
    });
});