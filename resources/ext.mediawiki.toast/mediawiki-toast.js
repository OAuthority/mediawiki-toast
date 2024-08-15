( function () {
	'use strict';

	/**
	 * @type {{
	 *   duration: number,
	 *   showClose: boolean,
	 *   colourful: boolean,
	 *   position: string,
	 *   type: string,
	 *   autoClose: boolean
	 * }}
	 */
	Toast.defaults = {
		autoClose: true,
		colourful: false,
		duration: 3000,
		position: "top-right",
		showClose: true,
		type: "notice"
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
			message: message ?? 'This is a toast notification!'
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
