/**
    * 自定义事件
    * 
    * @author ChenWei
    */

define([
    'jquery',
    'base/js/i18n'
], function($, toolbar, i18n) {
    "use strict";

    var bindActions = function (IPython) {
    // 元素ID-对应action
    var id_actions_dict = {
        '#btn-reset-file' : 'reset-file',
        '#btn-download-file' : 'download-file',
        '#btn-save-file' : 'save-notebook',
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
    
    /**
     * 加载
     */
    var load = function (IPython) {
      bindActions(IPython);
    }

    return {
      load
    };
});
   
