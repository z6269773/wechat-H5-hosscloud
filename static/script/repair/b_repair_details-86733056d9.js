/**
 * 报修详情
 */
$.namespace("cloud.RrDetail");
cloud.RrDetail = function () {
    return {
        init: function () {
            this.getRepiarDetail();
        },
        /**
         * 获取报修单详情
         */
        getRepiarDetail: function () {
            var _orderId = cloud.main.toQueryParams.call(window.location.href).orderId;

            var data = {
                "orderId": _orderId
            }
            $.ajax({
                url: ias.api.repiarDetail,
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: JSON.stringify(data).encode(),
                success: function (data) {
                    if (data.status == 200) {
                        var TOKEN  = localStorage.getItem("token");
                        console.log("获取报修单详情成功");
                        if (data.results){
                            var _results = data.results;
                            var _status = _results.status
                                , _lavel = _results.lavel
                                , _createDt = _results.createDt
                                , _schedulDate = _results.schedulDate
                                , _accecpDt = _results.accecpDt 
                                , _completDt = _results.completDt
                                , _waitTime = _results.waitTime
                                , _uploadList = _results.uploadList
                                , _endTime = _results.endTime;

                            var $status = $(".content .status")
                                ,$btnHTML = $(".content .content-center");
                            /* 
                            *状态
                            */
                            switch (_status) {
                                case 0:
                                var statusHTML = [
                                    '<div class="content4 ub">'
                                    , '<div class="ct4 ulev-3">'
                                    , '<span>待调度</span><br>'
                                    , '<span><img src="../../static/images/icon_ing_h.png"></span><br>'
                                    , '<span class="ulev-4">' + _createDt +'</span>'
                                    , '<p class="bg-af763d"></p>'
                                    , '</div>'
                                    , '<div class="ct4 ulev-3 color-aaa">'
                                    , '<span>已调度</span><br>'
                                    , '<span><img src="../../static/images/icon_xiao_h.png"></span><br>'
                                    , '<span class="ulev-4">' + _schedulDate +'</span>'
                                    , '<p class="bg-e6cbb0"></p>'
                                    , ' </div>'
                                    , '<div class="ct4 ulev-3 color-aaa">'
                                    , ' <span>维修中</span><br>'
                                    , '<span><img src="../../static/images/icon_xiao_h.png"></span><br>'
                                    , '<span class="ulev-4">' + _accecpDt +'</span>'
                                    , '<p class="bg-e6cbb0"></p>'
                                    , '</div>'
                                    , '<div class="ct4 ulev-3 color-aaa">'
                                    , '<span>已完工</span><br>'
                                    , '<span><img src="../../static/images/icon_xiao_h.png"></span><br>'
                                    , ' <span class="ulev-4">' + _completDt +'</span>'
                                    , '<p class="bg-e6cbb0"></p>'
                                    , '</div>'
                                    , '<div class="ct4 ulev-3 color-aaa">'
                                    , ' <span>评价 </span><br>'
                                    , ' <span><img src="../../static/images/icon_xiao_h.png"></span><br>'
                                    , ' <span class="ulev-4">' + _endTime +'</span>'
                                    , ' </div>'
                                    , '</div>'].join("")

                                    var btnHTML = [
                                        '<a href="./evaluate.html?orderId=' + _orderId + '"><button class="button button-default button-md">投诉</button></a>'
                                        , '<a href="javascript:void(0)"><button class="button button-md btn-delete" id=' + _orderId + '>删除</button></a>'].join("");

                                    $(".content .status").html(statusHTML)
                                    $(".content .content-center").html(btnHTML)
                                    break;
                                case 1:
                                    var statusHTML = [
                                        '<div class="content4 ub">'
                                        , '<div class="ct4 ulev-3">'
                                        , '<span>待调度</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _createDt +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3">'
                                        , '<span>已调度</span><br>'
                                        , '<span><img src="../../static/images/icon_ing_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _schedulDate +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , ' </div>'
                                        , '<div class="ct4 ulev-3 color-aaa">'
                                        , ' <span>维修中</span><br>'
                                        , '<span><img src="../../static/images/icon_xiao_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _accecpDt +'</span>'
                                        , '<p class="bg-e6cbb0"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3 color-aaa">'
                                        , '<span>已完工</span><br>'
                                        , '<span><img src="../../static/images/icon_xiao_h.png"></span><br>'
                                        , ' <span class="ulev-4">' + _completDt +'</span>'
                                        , '<p class="bg-e6cbb0"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3 color-aaa">'
                                        , ' <span>评价 </span><br>'
                                        , ' <span><img src="../../static/images/icon_xiao_h.png"></span><br>'
                                        , ' <span class="ulev-4">' + _endTime +'</span>'
                                        , ' </div>'
                                        , '</div>'].join("")

                                    var btnHTML = [
                                        '<a href="./evaluate.html?orderId=' + _orderId + '"><button class="button button-default button-md">投诉</button></a>'
                                        , '<a href="javascript:void(0)"><button class="button button-md btn-cancel" id=' + _orderId + '>取消</button></a>'].join("");

                                    $status.html(statusHTML)
                                    $btnHTML.html(btnHTML)
                                    break;
                                case 2:
                                    var statusHTML = [
                                        '<div class="content4 ub">'
                                        , '<div class="ct4 ulev-3">'
                                        , '<span>待调度</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _createDt +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3">'
                                        , '<span>已调度</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _schedulDate +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , ' </div>'
                                        , '<div class="ct4 ulev-3">'
                                        , ' <span>维修中</span><br>'
                                        , '<span><img src="../../static/images/icon_ing_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _accecpDt +'</span>'
                                        , '<p class="bg-e6cbb0"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3 color-aaa">'
                                        , '<span>已完工</span><br>'
                                        , '<span><img src="../../static/images/icon_xiao_h.png"></span><br>'
                                        , ' <span class="ulev-4">' + _completDt +'</span>'
                                        , '<p class="bg-e6cbb0"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3 color-aaa">'
                                        , ' <span>评价 </span><br>'
                                        , ' <span><img src="../../static/images/icon_xiao_h.png"></span><br>'
                                        , ' <span class="ulev-4">' + _endTime +'</span>'
                                        , ' </div>'
                                        , '</div>'].join("");

                                    var btnHTML = [
                                        '<a href="./evaluate.html?orderId=' + _orderId + '"><button class="button button-default button-lg">投诉</button></a>'
                                        ].join("");

                                    $status.html(statusHTML)
                                    $btnHTML.html(btnHTML)
                                    break;
                                case 3:
                                    var statusHTML = [
                                        '<div class="content4 ub">'
                                        , '<div class="ct4 ulev-3">'
                                        , '<span>待调度</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _createDt +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3">'
                                        , '<span>已调度</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _schedulDate +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , ' </div>'
                                        , '<div class="ct4 ulev-3">'
                                        , ' <span>维修中</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _accecpDt +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3">'
                                        , '<span>已完工</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , ' <span class="ulev-4">' + _completDt +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3 color-aaa">'
                                        , ' <span>待评价</span><br>'
                                        , ' <span><img src="../../static/images/icon_xiao_h.png"></span><br>'
                                        , ' <span class="ulev-4">' + _endTime +'</span>'
                                        , ' </div>'
                                        , '</div>'].join("")

                                    var btnHTML = [
                                        '<a href="./complaint.html?orderId=' + _orderId + '"><button class="button button-default button-md">评价</button></a>'
                                        ,'<a href="./evaluate.html?orderId=' + _orderId + '"><button class="button button-default button-md">投诉</button></a>'].join("");

                                    $status.html(statusHTML)
                                    $btnHTML.html(btnHTML)
                                    break;
                                case 4:
                                    var statusHTML = [
                                        '<div class="content4 ub">'
                                        , '<div class="ct4 ulev-3">'
                                        , '<span>待调度</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _createDt +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3">'
                                        , '<span>已调度</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _schedulDate +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , ' </div>'
                                        , '<div class="ct4 ulev-3">'
                                        , ' <span>维修中</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _accecpDt +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3">'
                                        , '<span>已完工</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , ' <span class="ulev-4">' + _completDt +'</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3">'
                                        , ' <span>已评价</span><br>'
                                        , ' <span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , ' <span class="ulev-4">' + _endTime +'</span>'
                                        , ' </div>'
                                        , '</div>'].join("")

                                    $status.html(statusHTML)
                                    break;
                                default:
                                    var statusHTML = [
                                        '<div class="content4 ub">'
                                        , '<div class="ct4 ulev-3 ct-cancal">'
                                        , '<span>待调度</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _createDt + '</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , '</div>'
                                        , '<div class="ct4 ulev-3 ct-cancal">'
                                        , '<span>已调度</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _schedulDate + '</span>'
                                        , '<p class="bg-af763d"></p>'
                                        , ' </div>'
                                        , '<div class="ct4 ulev-3 ct-cancal">'
                                        , '<span>已取消</span><br>'
                                        , '<span><img src="../../static/images/icon_dui_h.png"></span><br>'
                                        , '<span class="ulev-4">' + _schedulDate + '</span>'
                                        , ' </div>'
                                    ].join("")

                                    $status.html(statusHTML)
                            } 
                          
                           /* 
                           *维修附件
                           */
                            if (_uploadList && _uploadList.length > 0){
                                var swiperHTML='';
                                for (let index = 0; index < _uploadList.length; index++) {
                                    const elementS = _uploadList[index];
                                    var _type = elementS.type;
                                    switch (_type) {
                                        case "video":
                                                $('#video').attr('src', elementS.url)
                                                swiperHTML += ['<div class="swiper-slide"  style=" height: 100px;">'
                                                    , '<img src = "../../static/images/img_shipin-ys.png" /> '
                                                , '<div class="play" > '
                                                , '<img class="imgs1 imgs21 center_center" src = "../../static/images/yybx_play.png" /> '
                                                , '</div > '
                                                , '</div >'].join("");
                                            break;
                                        case "audio":
                                            $('#audio').attr('src', elementS.url)
                                            swiperHTML += ['<div class="swiper-slide"  style=" height: 100px;">'
                                                ,'<img src = "../../static/images/yinpin.png" /> '
                                                ,'<div class="play" > '
                                                ,'<img class="imgs1 imgs21 center_center" src = "../../static/images/yybx_play.png" /> '
                                                 ,'</div > '
                                                ,'</div >'].join("");
                                            break;
                                        case "image":
                                            swiperHTML += ['<div class="swiper-slide"  style=" height: 100px;">'
                                                , '<img class="imgs1 imgs21 center_center" src = "' + elementS.url + '" /> '
                                                , '</div >'].join("");
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                $('.swiper-wrapper').html(swiperHTML);
                            }
                            /* 
                            *紧急程度
                            */
                            switch (_lavel) {
                                case 1:
                                    $('.cont #lavel').html('<span class="color-666">一般</span>')
                                    break;
                                case 2:
                                    $('.cont #lavel').html('<span class="color-yellow ">紧急</span>')
                                    break;
                                case 3:
                                    $('.cont #lavel').html('<span class="color-red">特急</span>')
                                    break;
                                default:
                                    break;
                            }
                            /* 
                            *插入列表数据 
                            */
                            var $items = $('.card-items .items-span')
                            $('.card #waitTime').html(_waitTime);
                            $items.eq(0).html(data.results.createDt);
                            $items.eq(1).html(data.results.projectName);
                            $items.eq(2).html(data.results.descs);
                            $items.eq(3).html(data.results.location);
                            $items.eq(4).html(data.results.userName);
                            $items.eq(5).html(data.results.macName);
                            $items.eq(6).html(data.results.modelNum);
                            $items.eq(7).html(data.results.repairStatusName);
                            /* 
                            *@插入传入维修单详情单号
                            *@插入传入评价详情
                            */
                            if (data.results.repairNo && data.results.repairNo != null){
                                $('#repairNo').attr('href', './repair_details.html?repairNo=' + data.results.repairNo + '&repairStatusName=' + data.results.repairStatusName)
                            }
                            if (data.results.isPointOrSue && data.results.isPointOrSue != ""){
                                $('#orderId').attr('href', './score.html?orderId=' + data.results.id)
                            }
                             /* 
                            *@是否登录
                            */
                            if (!TOKEN || TOKEN == "undefined") {
                                $btnHTML.html("");
                            }
                          
                    } else {
                        console.log(data.message);
                    }
                    }
                }
            });
        },
        /**
         * 删除单条报修单
         */
        deleteRepairList: function (orderId) {
            var data = {
                "orderId": orderId
            }
            $.ajax({
                url: ias.api.repiarDelete,
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: JSON.stringify(data).encode(),
                success: function (data) {
                    if (data.status == 200) {
                        localStorage.setItem("token", data.results.token);
                        alert("刪除成功");
                        window.history.go(-1);
                    } else {
                        console.log(data.message);
                    }
                }
            });
        },
        /**
         * 取消单条报修单
         */
        cancelRepairList: function (orderId) {
            var data = {
                "orderId": orderId
            }
            $.ajax({
                url: ias.api.repiarCancel,
                contentType: "application/json",
                dataType: "json",
                method: "POST",
                data: JSON.stringify(data).encode(),
                success: function (data) {
                    if (data.status == 200) {
                        localStorage.setItem("token", data.results.token);
                        alert("取消成功");
                        window.history.go(-1);
                    } else {
                        console.log(data.message);
                    }
                }
            });
        }
    }
}();
$(function () {
    cloud.RrDetail.init();

    $(document).on('click', '.content-center .btn-delete', function (event) {
        cloud.RrDetail.deleteRepairList(this.id);
        return false;
    });
    $(document).on('click', '.content-center .btn-cancel', function (event) {
        cloud.RrDetail.cancelRepairList(this.id);
        return false;
    });
    // swiper
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        //      autoplay: 2000,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
    });
    $(document).on('click', '.play .imgs21', function (event) {
        $(".audio").show()
        return false;
    });
    $(document).on('click', '.play .imgs22', function (event) {
        $(".video").show()
        return false;
    });
    $(document).on('click', '.remove_media', function (event) {
        $(this).parent().hide()
        return false;
    });
    
    //下拉执行的函数
    gundong(shangla, xiala)
    function xiala() {
        cloud.RrDetail.init();
    }
    function shangla() {
        console.log("上拉刷新");
    }
})