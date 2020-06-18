define([
    'base/js/i18n'
], function(i18n) {
    
    var reload = function (IPython) {
        // overwrite action
        IPython.actions.register({
            cmd: i18n.msg._('delete cells'),
            help: i18n.msg._('delete selected cells'),
            help_index : 'ej',
            icon: 'fa-minus',
            handler : function (env) {
                env.notebook.delete_cell();
            }
        }, 'delete-cell', 'jupyter-notebook');
    }

    return {
        reload,
    };
});
   
