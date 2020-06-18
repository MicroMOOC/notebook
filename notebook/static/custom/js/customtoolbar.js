define([
    'jquery',
    'require',
    'notebook/js/toolbar',
    'notebook/js/celltoolbar',
    'base/js/i18n'
], function($, requirejs, toolbar, celltoolbar, i18n) {
    "use strict";

    var MainToolBar = function (selector, IPython) {
      // 移除已生成的工具栏按钮
      $(IPython.toolbar.selector).empty();
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
            ],
            'func_btn'
          ],
          [
            [
                new toolbar.Button('jupyter-notebook:run-cell-and-select-next',{label: i18n.msg._('Run')}),
                // 'jupyter-notebook:interrupt-kernel',
                //  'jupyter-notebook:confirm-restart-kernel',
                //  'jupyter-notebook:confirm-restart-kernel-and-run-all-cells',
            ],
            'server_btn'
          ]
        ];
        this.construct(grps);
    };

    var reload = function (IPython) {
      IPython.toolbar = new MainToolBar('#maintoolbar-container', IPython);
    }

    return {
      reload
    };
});
   
