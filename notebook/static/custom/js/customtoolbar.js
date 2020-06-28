/**
    * notebook功能按钮配置文件
    * 
    * @author ChenWei
    */

define([
    'jquery',
    'notebook/js/toolbar',
    'base/js/i18n'
], function($, toolbar, i18n) {
    "use strict";

    var MainToolBar = function (selector, IPython) {
      
      var options = {
          notebook: IPython.notebook,
          events: IPython.events,
          actions: IPython.actions,
      };
        toolbar.ToolBar.apply(this, [selector, options] );
        this._make();
        Object.seal(this);
    };

    MainToolBar.prototype = Object.create(toolbar.ToolBar.prototype);

    MainToolBar.prototype._make = function () {
        var grps = [
          [
            [
                'jupyter-notebook:save-notebook',
                'jupyter-notebook:insert-cell-below',
                'jupyter-notebook:delete-cell',
                'jupyter-notebook:cut-cell',
                'jupyter-notebook:copy-cell',
                'jupyter-notebook:paste-cell-below',
                'jupyter-notebook:move-cell-up',
                'jupyter-notebook:move-cell-down',
                new toolbar.Button('jupyter-notebook:reset-file', {label: '重置'}),
                new toolbar.Button('jupyter-notebook:download-file', {label: '下载'}),
            ],
            'func_btn'
          ],
          [
            [
                new toolbar.Button('jupyter-notebook:run-cell-and-select-next',{label: i18n.msg._('Run')}), // 运行选中的代码块
                // 'jupyter-notebook:interrupt-kernel', // 中断
                //  'jupyter-notebook:confirm-restart-kernel',  // 重启
                //  'jupyter-notebook:confirm-restart-kernel-and-run-all-cells', //重启并运行所有代码快
            ],
            'server_btn'
          ]
        ];
        this.construct(grps);
    };

    /**
     * 重新加载
     * @param IPython 
     */
    var reload = function (IPython) {
      // 移除已生成的工具栏按钮
      $(IPython.toolbar.selector).empty();
      // 覆盖toolbar
      IPython.toolbar = new MainToolBar('#maintoolbar-container', IPython);
    }

    return {
      reload
    };
});
   
