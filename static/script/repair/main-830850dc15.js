/**
 * main.js
 */
$.namespace("cloud.main");
cloud.main = function () {
    return {
        init: function () {

        },
         /**
         * @description 获取search参数
         * @param url
         * @returns ret (json对象)
         */
        toQueryParams: function () {
            var search = this.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/);//提取location.search中'?'后面的部分
            if (!search) {
                return {};
            }
            //获取?后面所有的内容
            var searchStr = search[0];
            var searchHash = searchStr.split('&');

            var ret = {};
            for (var i = 0, len = searchHash.length; i < len; i++) { //这里可以调用each方法
                var pair = searchHash[i];
                if ((pair = pair.split('='))[0]) {
                    var key = decodeURIComponent(pair.shift());
                    var value = pair.length > 1 ? pair.join('=') : pair[0];

                    if (value != undefined) {
                        value = decodeURIComponent(value);
                    }
                    if (key in ret) {
                        if (ret[key].constructor != Array) {
                            ret[key] = [ret[key]];
                        }
                        ret[key].push(value);
                    } else {
                        ret[key] = value;
                    }
                }
            }
            return ret;
        },
        /**
         * 
         */
        setmain: function () {

        }
    }
}();

$(document).ready(function () {
    // 下拉列表
    $(document).on('click','.card-items.card-items-parent' , function (event) {
        var flag = $(this).find('.icon');
        if (!flag.hasClass('icon-down') ){
            flag.addClass('icon-down')
        }else(
            flag.removeClass('icon-down')
        )
        $(this).parent().find('.card-items-chlid.card-items-parent-chlid').toggle();
        return false;
    });
});