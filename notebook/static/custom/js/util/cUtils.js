/**
 * 工具
 */

define([
    'jquery',
], function($){
    "use strict";

    // 关闭离开页面弹出的里离开询问提示框
    var close_page_confrim = function () {
        $(window).unbind('beforeunload');
        window.onbeforeunload = null;
    }

    // 读取cookie
    var get_cookie = function (name) {
        var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
        return r ? r[1] : undefined;
    }
    

    return {
        close_page_confrim,
        get_cookie,
    };
}); 
