/**
 * 报修列表
 */

var pageNumber = 1, pageSize = 10;
$.namespace("cloud.repair");
cloud.repair = function () {
    return {
        init: function () {
            this.getRepairLists(pageNumber, pageSize);
        },
        /**
         * 获取报修单详情
         */
        getRepairLists: function (pageNumber, pageSize) {
            $.ajax({
                url: ias.api.myList+"?pageNumber="+pageNumber + "&pageSize=" + pageSize,
                contentType: "application/json",
                dataType: "json",
                method: "POST"
                , success: function (data) {
                    if (data.status == 200) {
                        localStorage.setItem("token", data.results.token);
                        console.log("获取报修列表成功");

                        var rows = data.results.rows
                            , btnHTML=''
                            , lavelHTML =''
                            , listsHTML =''
                            ,statusHTML = '';
                            if(rows && rows.length >0){
                                for (let i = 0; i < rows.length; i++) {
                                    const element = rows[i];
                                    var _projectName = element.projectName
                                        , _createDt = element.createDt
                                        , _imgUrl = element.repairUrl
                                        , _location = element.location
                                        , _status = element.status
                                        , _statusName = element.statusName
                                        , _orderId = element.id
                                        , _lavel = element.lavel;

                                       
                                    /* 
                                    *状态
                                    */
                                    switch (_status) {
                                        case 0:
                                            statusHTML = [
                                                '<span class="span1 color-yellow tx-c">' + _statusName + '</span>'
                                            ].join("");
                                        
                                            btnHTML = [
                                                '<a href="javascript:void(0)"><button class="button btn-delete ufr" id=' + _orderId + '>删除</button>'
                                                , '<a href="./evaluate.html?orderId=' + _orderId + '"><button class="button button-default ufr">投诉</button></a>'].join("");
                                            break;
                                        case 1:
                                            statusHTML = [
                                                '<span class="span1 color-427 tx-c">' + _statusName + '</span>'
                                            ].join("");    

                                            btnHTML = [
                                                '<a href="javascript:void(0)"><button class="button btn-cancel ufr" id=' + _orderId + '>取消</button>'
                                                , '<a href="./evaluate.html?orderId=' + _orderId + '"><button class="button button-default ufr">投诉</button></a>'].join("");
                                            break;
                                        case 2: 
                                            statusHTML = [
                                                '<span class="span1 color tx-c">' + _statusName + '</span>'
                                            ].join("");    

                                            btnHTML = [
                                                '<a href="./evaluate.html?orderId=' + _orderId + '"><button class="button button-default ufr">投诉</button></a>'
                                                ].join("");

                                            break;
                                        case 3:
                                            statusHTML = [
                                                '<span class="span1 color-666 tx-c">' + _statusName + '</span>'
                                            ].join("");   

                                            btnHTML = [
                                                '<a href="./evaluate.html?orderId=' + _orderId + '"><button class="button button-default ufr">投诉</button></a>'
                                                , '<a href="./complaint.html?orderId=' + _orderId + '"><button class="button button-default ufr">评价</button></a>'].join("");

                                            break;
                                        case 4:
                                            statusHTML = [
                                                '<span class="span1 color-666 tx-c">' + _statusName + '</span>'
                                            ].join("");      
                                            
                                            btnHTML = "";
                                            break;
                                        default:
                                            statusHTML = [
                                                '<span class="span1 color-aaa  tx-c">' + _statusName + '</span>'
                                            ].join("");      
                                            btnHTML = "";
                                     } 
                                /* 
                                *紧急程度
                                */
                                    switch (_lavel) {
                                        case 1:
                                            lavelHTML = '<span class="footer-lable color-666">一般</span>';
                                            break;
                                        case 2:
                                            lavelHTML = '<span class="footer-lable color-yellow ">紧急</span>';
                                            break;
                                        case 3:
                                            lavelHTML = '<span class="footer-lable color-red">特急</span>';
                                            break;
                                        default:
                                            break;
                                    }

                                    listsHTML += [
                                        '<li class="card"  data-url="./b_repair_details.html?orderId='+ _orderId +'" >'
                                        , '<div class="con">'
                                        , '<div class="ub cont">'
                                        , '<div class="ub cont1 cont11"></div>'
                                        , '<span class="span1 tx-c"></span>'
                                        , '' + statusHTML + ''
                                        , '</div>'
                                        , '<div class="ub conb ulev-4">'
                                        , '<div> <img src="'+ _imgUrl +'"  alt="维修项目图片" /></div>'
                                        , '<div class="conb2">'
                                        , '<p class="cutText">' + _createDt +'</p>'
                                        , '<p class="cutText ulev-2">' + _projectName +'</p>'
                                        , '<p class="cutText-2">' + _location +'</p>'
                                        , '</div>'
                                        , '</div>'
                                        , ' </div>'
                                        , '<div class="clearfix">'
                                        , '' + lavelHTML + ''
                                        , '' + btnHTML + ''
                                        , '</div>'
                                        , '</li>'].join("");
                                  
                                 }
                                if (pageNumber == 1) {
                                    $('.content>ul').html(listsHTML);
                                } else {
                                    $('.content>ul').append(listsHTML);
                                }
                               
                            }
                            // end
                        } else {
                            console(data.message);
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
                        cloud.repair.getRepairLists(1, 10);
                        alert("刪除成功");
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
                        cloud.repair.getRepairLists(1, 10); 
                        alert("取消成功");
                    } else {
                        console.log(data.message);
                    }
                }
            });
        }
    }
}();

$(document).ready(function () {
    cloud.repair.init();

    $(document).on('click','.card .btn-delete',function(event) {
        cloud.repair.deleteRepairList(this.id);
        return false;
    });
    $(document).on('click', '.card .btn-cancel', function (event) {
        cloud.repair.cancelRepairList(this.id);
        return false;
    });
    /*
    *@ 进入详情
    */
    $(document).on('click', '.card', function (event) {
        var _url = $(this).data('url')
        window.open(_url, '_self');
    });
     /*
    *@ 无限向下滑动加载数据
    */
    $(window).scroll(function () {
        if ((scrollTop >= (scrollHeight - windowHeight - 300)) && (end_top <= start_top)) {
            pageNumber++
            cloud.repair.getRepairLists(pageNumber, pageSize);
        }
    });
    gundong(shangla, xiala)
    //下拉执行的函数
    function xiala() {
        //alert("下拉刷新");
        pageNumber = 1;
        cloud.repair.getRepairLists(pageNumber, pageSize);
    }
    function shangla() {
        alert("上拉刷新");
    }
});