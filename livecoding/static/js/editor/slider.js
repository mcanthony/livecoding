var slider = (function () {

	// constants
	var borderWidth        = 2;
	var lineHeight         = 19;
	// var miniColorsSelector = '.miniColors-selector';
	var startingBarWidth   = 300;
	var triangleHeight     = 5;
	var triangleWidth      = 12;

	// dom elements
	var ball;
	var bar;
	var filler;
	var handle;
	var marker;
	// var miniColorsTrigger;
	var slider;
	var triangle;

	function init() {

		// initialize dom elements
		ball               = $('#ball');
		bar                = $('#bar');
		filler             = $('#filler');
		handle             = $('#handle');
		marker             = $('#marker');
		// miniColorsTrigger  = $('.miniColors-trigger');
		slider             = $('#slider');
		triangle           = $('#triangle');

		// set the handle's default width
		handle.width(startingBarWidth);

		// set the bar's border width and default width
		bar.css('border-width', borderWidth);
		bar.width(startingBarWidth);

		// set the triangle
		triangle.css('border-width', [triangleHeight, triangleWidth, 0, triangleWidth].join('px '));

	}

	function resetSlider() {

		// hide the slider
		slider.hide();

		// reset filler width
		filler.width(0);

		// reset bar width
		bar.width(startingBarWidth);

	}

	function resetBar(markerCenter) {

		bar.width(startingBarWidth);
		bar.css('left', markerCenter - startingBarWidth/2 - borderWidth);
		filler.removeClass('filler-edge-left');
		filler.removeClass('filler-edge-right');

	}

	function isVisible() {
		return slider.is(':visible');
	}

	function show(x, y) {

		slider.show();

		marker.css('left', x);

		// center handle on token
		handle.css('left', x - handle.width()/2);

		// center bar above token
		bar.css('left', x - bar.width()/2 - borderWidth);
		bar.css('top', y - lineHeight);

		// center triangle on token
		triangle.css('left', x - triangleWidth);
		triangle.css('top', bar.offset().top + bar.height() + borderWidth * 2);

		ball.offset({top: filler.offset().top});

	}

	function initHandle() {

		handle.draggable({

			// only allow dragging along the x-axis
			axis: 'x',
			
			drag: function(ui, event) {

				var position = event.position.left + handle.width()/2;
				var markerCenter = marker.offset().left;
				var offset = position - markerCenter;
				var newNumber;

				// calculate the new number based on the original number
				// plus the dragging offset
// ------------ TODO: external reference here ----------------------------------------------------------------------
 				newNumber = aigua.originalNumber.value.modifyBy(offset);

				// replace the selection with the new number
// ------------ TODO: external reference here ----------------------------------------------------------------------
				aigua.codeMirror.replaceSelection(String(newNumber) + aigua.originalNumber.suffix);

				// is the dragging cursor to the right of the marker?
				if (offset > 0) {

					// if the left bar got stuck, reset the bar width and position
					if (markerCenter - bar.offset().left - borderWidth > startingBarWidth/2) {
						resetBar(markerCenter);
					}

					// set the filler width and position
					filler.width(offset);
					filler.css('left', startingBarWidth/2);

					// are we dragging past the initial bar width?
					if (offset > startingBarWidth/2 - 6) {

						// set bar right edge to dragging position
						bar.width(position - bar.offset().left + 5);
					}

					// reset the width, since fast drags won't trigger a drag call every pixel.
					else {
						resetBar(markerCenter);

						// show the ball
						ball.show();
					}

				// is the dragging cursor to the left of the marker?
				} else if (offset < 0) {

					// set the filler width
					filler.width(-offset);

					// adjust the filler position
					filler.css('left', startingBarWidth/2 - -offset + borderWidth/2);

					// are we dragging past the initial bar width?
					if (-offset > startingBarWidth/2 - 6) {

						// adjust the filler position
						filler.css('left', borderWidth/2 + 7);

						// set bar left edge to dragging position
						bar.width(-offset + startingBarWidth/2 + 7);
						bar.css('left', position - borderWidth - 7);
					}

					// reset the width, since fast drags won't trigger a drag call every pixel.
					else {
						resetBar(markerCenter);

						// show the ball
						ball.show();
					}

				// are we at the middle?
				} else {
					filler.width(0);
				}
			}
		});

	}

	return {
		init: init,
		resetBar: resetBar,
		initHandle: initHandle,
		isVisible: isVisible,
		show: show,
		resetSlider: resetSlider
	};

}());








































// var slider = slider || {}; 

// slider = {};

// slider.borderWidth        = 2;
// slider.lineHeight         = 19;
// slider.miniColorsSelector = '.miniColors-selector';
// slider.startingBarWidth   = 300;
// slider.triangleHeight     = 5;
// slider.triangleWidth      = 12;

// slider.init = function() {

// 	// set various dom elements
// 	slider.ball               = $('#ball');
// 	slider.bar                = $('#bar');
// 	slider.filler             = $('#filler');
// 	slider.handle             = $('#handle');
// 	slider.marker             = $('#marker');
// 	slider.miniColorsTrigger  = $('.miniColors-trigger');
// 	slider.slider             = $('#slider');
// 	slider.triangle           = $('#triangle');

// 	// set the handle's default width
// 	slider.handle.width(slider.startingBarWidth);

// 	// set the bar's border width and default width
// 	slider.bar.css('border-width', slider.borderWidth);
// 	slider.bar.width(slider.startingBarWidth);

// 	// set the triangle
// 	slider.triangle.css('border-width',
// 		[slider.triangleHeight, slider.triangleWidth, 0, slider.triangleWidth].join('px '));
// };

// slider.resetBar = function(markerCenter) {
// 	slider.bar.width(slider.startingBarWidth);
// 	slider.bar.css('left', markerCenter - slider.startingBarWidth/2 - slider.borderWidth);
// 	slider.filler.removeClass('filler-edge-left');
// 	slider.filler.removeClass('filler-edge-right');
// };

// slider.initHandle = function() {

// 	slider.handle.draggable({

// 		// only allow dragging along the x-axis
// 		axis: 'x',
		
// 		drag: function(ui, event) {

// 			var position = event.position.left + slider.handle.width()/2;
// 			var markerCenter = slider.marker.offset().left;
// 			var offset = position - markerCenter;
// 			var newNumber;

// 			// calculate the new number based on the original number
// 			// plus the dragging offset
// 			newNumber = aigua.originalNumber.value.modifyBy(offset);

// 			// replace the selection with the new number
// 			aigua.codeMirror.replaceSelection(String(newNumber) + aigua.originalNumber.suffix);

// 			// is the dragging cursor to the right of the marker?
// 			if (offset > 0) {

// 				// if the left bar got stuck, reset the bar width and position
// 				if (markerCenter - slider.bar.offset().left - slider.borderWidth > slider.startingBarWidth/2) {
// 					slider.resetBar(markerCenter);
// 				}

// 				// set the filler width and position
// 				slider.filler.width(offset);
// 				slider.filler.css('left', slider.startingBarWidth/2);

// 				// are we dragging past the initial bar width?
// 				if (offset > slider.startingBarWidth/2 - 6) {

// 					// set bar right edge to dragging position
// 					slider.bar.width(position - slider.bar.offset().left + 5);
// 				}

// 				// reset the width, since fast drags won't trigger a drag call every pixel.
// 				else {
// 					slider.resetBar(markerCenter);

// 					// show the ball
// 					slider.ball.show();
// 				}

// 			// is the dragging cursor to the left of the marker?
// 			} else if (offset < 0) {

// 				// set the filler width
// 				slider.filler.width(-offset);

// 				// adjust the filler position
// 				slider.filler.css('left', slider.startingBarWidth/2 - -offset + slider.borderWidth/2);

// 				// are we dragging past the initial bar width?
// 				if (-offset > slider.startingBarWidth/2 - 6) {

// 					// adjust the filler position
// 					slider.filler.css('left', slider.borderWidth/2 + 7);

// 					// set bar left edge to dragging position
// 					slider.bar.width(-offset + slider.startingBarWidth/2 + 7);
// 					slider.bar.css('left', position - slider.borderWidth - 7);
// 				}

// 				// reset the width, since fast drags won't trigger a drag call every pixel.
// 				else {
// 					slider.resetBar(markerCenter);

// 					// show the ball
// 					slider.ball.show();
// 				}

// 			// are we at the middle?
// 			} else {
// 				slider.filler.width(0);
// 			}
// 		}
// 	});

// }
