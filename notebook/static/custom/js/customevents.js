/**
    * 自定义事件
    * 
    * @author ChenWei
    */

define([
    'jquery',
    'base/js/events',
    'base/js/i18n'
], function($, events, i18n) {
    "use strict";

    var bind_actions = function (IPython) {
    // 元素ID-对应action
    var id_actions_dict = {
        '.btn-reset-file' : 'reset-file',
        '.btn-download-file' : 'download-file',
        '.btn-save-file' : 'save-notebook',
        '.btn-run-all' : 'run-all-cells',
      };
      for(var idx in id_actions_dict){
              if (!id_actions_dict.hasOwnProperty(idx)){
                  continue;
              }
              var id_act = 'jupyter-notebook:' + id_actions_dict[idx];
              if(!IPython.actions.exists(id_act)){
                  console.warn('actions', id_act, 'does not exist, still binding it in case it will be defined later...');
              }
              // Immediately-Invoked Function Expression cause JS.
              (function(IPython, id_act, idx){
                  $(idx).click(function(event){
                    IPython.actions.call(id_act, event);
                  });
              })(IPython, id_act, idx);
      }
    }

    var bind_notify_events = function (IPython) {
      events.on('notebook_save_failed.Notebook', function () {
          set_run_tips('(保存失败~!)', 'error');
      });
      events.on('set_dirty.Notebook', function (event, data) {
        if (data.value) {
          set_run_tips('未保存改变');
      } else {
        set_run_tips('保存成功', 'success', 3 * 1000);
      }
      });
  }

  var set_run_tips = function (msg, cssName, hideTIme) {
    var element =  $('div.run-tips');
    element.show();
    if (cssName) {
      element.addClass(cssName);
    } else {
      element.removeClass('error');
      element.removeClass('success');
    }
    element.text(msg);
    if (hideTIme) {
        setTimeout(function() {
          element.hide();
        }, hideTIme);
    }
}
    
    /**
     * 加载
     */
    var load = function (IPython) {
      bind_actions(IPython);
      bind_notify_events(IPython);
    }

    return {
      load
    };
});
   
