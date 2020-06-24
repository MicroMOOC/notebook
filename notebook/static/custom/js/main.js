define([
	'jquery',
	'base/js/namespace',
	'./customtoolbar',
	'./customactions',
	'./util/cUtils'
], function($,IPython, customtoolbar, customactions, cUtils) {

	// 自定义js入口函数
	var init = function () {
		cUtils.close_page_confrim();
		// overwrite actions
		customactions.reload(IPython);
		// overwrite 工具栏
		customtoolbar.reload(IPython);
		// 移除全屏遮盖层
		$('#load_layer').remove();
	}

	return {
		init
	}
});