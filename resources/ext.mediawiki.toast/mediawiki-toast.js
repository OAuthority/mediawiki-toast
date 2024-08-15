( function () {
	'use strict';

	const check = '<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M5 13L9 17L19 7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
	const notice = '<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 18.01L12.01 17.9989" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
	const error = '<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

	/**
	 * @type {{
	 *   duration: number,
	 *   showClose: boolean,
	 *   colourful: boolean,
	 *   position: string,
	 *   type: string,
	 *   autoClose: boolean
	 *   icon: string
	 * }}
	 */
	Toast.defaults = {
		autoClose: true,
		colourful: false,
		duration: 3000,
		position: "top-right",
		showClose: true,
		type: "notice",
		icon: notice
	};

	Toast.types = {
		error: {
			icon: error
		},
		notice: {
			icon: notice
		},
		success: {
			icon: check
		}
	};

	/**
	 * Setup all of our options and their defaults
	 * @param {string} message - the message to display in the notification
	 * @param {Object} options - the options to pass
	 * @constructor
	 */
	function Toast( message, options = {} ) {

		this.options = {
			autoClose: options.autoClose ?? Toast.defaults.autoClose,
			colourful: options.colourful ?? Toast.defaults.colourful,
			duration: options.duration ?? Toast.defaults.duration,
			position: options.position ?? Toast.defaults.position,
			showClose: options.showClose ?? Toast.defaults.showClose,
			type: options.type ?? Toast.defaults.type,
			message: message ?? 'This is a toast notification!',
			icon: Toast.types[options.type]?.icon ?? Toast.defaults.icon
		};
	}


	/**
	 * Actually show the notification, with optional extras
	 * Usage: new Toast( 'This is a toast!', { type: "notice" } ).show(  )
	 */
	Toast.prototype.show = function() {
		const template = getTemplate();
		const html = template.render( this.options );

		this.$element = $( html );

		let container = $( '.mw-toast-notification-container.' + this.options.position );

		if ( !container.length ) {
			container = $( '<div class="mw-toast-notification-container ' + this.options.position + '"></div>' );
			$( 'body' ).append( container );
		}

		container.append( this.$element );

		if (  this.options.autoClose  ) {
			setTimeout( () => {
				this.hide();
			}, this.options.duration );
		}

		if (  this.options.showClose ) {
			initCloseNotif( this );
		}
	};

	/**
	 * Hide the toast ( remove it from the DOM )
	 */
	Toast.prototype.hide = function() {
		if ( this.$element ) {
			const slideDirection = getSlideDirection( this.options.position );
			const animationCSS = {};
			animationCSS[slideDirection] = '-100%';

			this.$element.animate( animationCSS, 400, () => {
				this.$element.remove();
			});
		}
	};

	/**
	 * Get the mustache template; MediaWiki will handle this internally, so just retrieve it
	 * @returns {*}
	 */
	function getTemplate() {
		return mw.template.get( 'ext.mediawiki.toast', 'notice.mustache' );
	}

	/**
	 * If we are showing the close button, delete the notification after it is clicked
	 * @param {Toast} toast
	 */
	function initCloseNotif( toast ) {
		const close = toast.$element.find( '.mw-toast-notification__close' );

		close.on('click', function( e ) {
			toast.hide();
		} );
	}

	/**
	 * Work out whether we should fade to the left or right based on the position of
	 * the toast on the screen
	 * @param {string} position
	 * @returns {string}
	 */
	function getSlideDirection( position) {
		if ( position.includes( 'left' ) ) return 'left';
		if ( position.includes( 'right' ) ) return 'right';
		return 'right';
	}

	window.Toast = Toast;

})();
