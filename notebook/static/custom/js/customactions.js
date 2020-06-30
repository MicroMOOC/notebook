/**
    * notebook 新增/覆盖 action
    * 
    * @author ChenWei
    */

define([
    'jquery',
    'base/js/dialog',
    'base/js/i18n',
    './util/cUtils',
    'base/js/utils',
], function($, dialog, i18n, cUtils, utils) {

    // 自定义actions
    var custom_actions = {
        'delete-cell':{
            cmd: i18n.msg._('delete cells'),
            // hover提示文字
            help: i18n.msg._('delete selected cells'),
            help_index : 'ej',
             // 功能按钮图标，font-awesome
             icon: 'fa-minus',
             // 处理
            handler : function (env) {
                env.notebook.delete_cell();
            }
        },
        'run-selected-cell':{
            help: 'run selected cell',
            help_index : 'ej',
            handler : function (env) {
                env.notebook.execute_selected_cell();
            }
        },
        'reset-file':{
            help: '重置所有代码',
             icon: 'fa-undo',
            handler : function (env) {
                // dialog
                dialog.modal({
                    title : '重置代码',
                    body : '此操作不可恢复，确定要重置当前所有代码？',
                    default_button: "Cancel",
                    buttons : {
                        Cancel: {},
                        OK : {
                            class: "btn-danger",
                            click: function() {
                                // 从cookie中取出NBGitpuller拉取地址
                                var nbgitpullerUrl = cUtils.get_cookie('nbpuller-url');
                                if (!nbgitpullerUrl) {
                                    alert('重置失败，请尝试刷新当前页面');
                                    return;
                                }
                                // 删除当前文件
                                env.notebook.contents.delete(env.notebook.notebook_path).then(function() {
                                    // 页面重载，重新拉取模板文件
                                    location.replace(decodeURIComponent(nbgitpullerUrl));
                                }).catch(function(e) {
                                    alert('重置失败，请稍后尝试');
                                });
                            }
                        }
                    }
                });
                // end dialog
            }
        },
        'download-file':{
            help: '下载 (.py)',
             icon: 'fa-cloud-download ',
            handler : function (env) {
                var notebook_path = utils.encode_uri_components(env.notebook.notebook_path);
                // see notebook/static/notebook/js/menubar.js   133 line
                var format = 'script', download = true;
                var url = utils.url_path_join(
                    env.notebook.base_url,
                    'nbconvert',
                    format,
                    notebook_path
                ) + "?download=" + download.toString();
                // open download url
                var w = window.open('', IPython._target);
                if (IPython.notebook.dirty && IPython.notebook.writable) {
                    IPython.notebook.save_notebook().then(function() {
                        w.location = url;
                    });
                } else {
                    w.location = url;
                }
            }
        },
    };

    /**
     * 重新加载
     * @param  IPython 
     */
    var reload = function (IPython) {
        // 注册action
        for(k in custom_actions){
            if(custom_actions.hasOwnProperty(k)){
                IPython.actions.register(custom_actions[k], k, 'jupyter-notebook' );
            }
        }
    }

    return {
        reload,
    };
});
   
