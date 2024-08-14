(function () {

	Toast.defaults = {
		autoClose: true,
		colourful: false,
		duration: 3000,
		position: "top-right",
		showClose: true,
		type: "notice"
	}

	function Toast(message, options = {}) {
		this.options = {};
		this.options.autoClose = options.autoClose ?? Toast.defaults.autoClose;
		this.options.colourful = options.colourful ?? Toast.defaults.colourful;
		this.options.duration = options.duration ?? Toast.defaults.duration;
		this.options.position = options.position ?? Toast.defaults.position;
		this.options.showClose = options.showClose ?? Toast.defaults.showClose;
		this.options.type = options.type ?? Toast.defaults.type;
		this.options.message = message ?? 'This is a toast notification!';
	}

	Toast.prototype.show = function() {
		const template = getTemplate();
		const html = template.render( this.options );
	}

	function getTemplate() {
		return mw.template.get('ext.mediawiki.toast', 'notice.mustache');
	}

	window.Toast = Toast;

})();
