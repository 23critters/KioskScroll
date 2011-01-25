Kiosk Scroll
===========

Kiosk Scroll is a nifty widget that allows you to create a kiosk window with rich content any where on the web page. Very handy when wanting to show custom made banners in a small space.


How to use
----------

Javascript snippet to initialize the class:

window.addEvent("domready", function() {
	var KS = new KioskScroll({
		element: document.getElement("div.kioskscroll")
	});
});


Javascript snippet to stop the animation:

	KS.stop();


HTML snippet:

<div class="kioskscroll">
	<ul>
		<li>First frame</li>
		<li>Second frame</li>
	</ul>
</div>


Options
-----------------

    element: (string||object) reference to div dom element container. if passing a string, supply it's id
    width: (integer) width of the container | default: null
    height: (integer) height of the container | default: null
    duration: (integer) amount of seconds each frame is visible | default 5 seconds,
    transition: (integer) amount of miliseconds of the opacity transition | default: 200 miliseconds
        NB! It is highly recommended that the duration is at least twice as long than the transition
    clickframe: (boolean) wether the actual frame is clickable in order to navigate to next frame | default: false
    showanchors: (boolean) wether the numerated anchors are visible | default: true
    useanchors: (boolean) wether the numerated anchors are clickable | default: true
        NB! this value will only take effect if "showanchors" is set to "true"
    autostart: (boolean) wether the transition effect should autostart or not | default: true


Methods
-----------------

The following methods are availible publicly:

    start: executes scrollToPane
    stop: halts the animation callback and clears the timer
    scrollToPane: show a specific frame | default: shows the next frame

Private functions:

    _fadeOut: fades out the current frame
    _fadeIn: fades in the next frame



Notes
-----------------

Version 1.0 RC1

    * Major overhaul, perhaps ready for a release!
    * Updated code to work with MooTools 1.3
    * Fixed bug with the implementation of the options "useanchors" and "clickframe", the timer should be properly reset when activly chosing another frame

Version 0.7

    * Updated HTML in order to allow more instances of the KioskScroll without breaking XHTML Strict (using class instead of id)
    * Removed width & height from CSS, added option width (string|integer) and height (string|integer) instead. | default: 200

Version 0.6.2

    * Updated the documentation
    * Renamed the class
    * Renamed the fadeIn and fadeOut functions to show they're private

Version 0.6

    * Added option clickframe (boolean) wether the actual frame is clickable in order to navigate to next frame | default: false

Version 0.5

    * Added toElement method
    * Changed the variable name container to element for consistency 

Version 0.4

    * index.html has been translated into English
    * Added option showframes (boolean) wether the numerated anchors are visible or not | default: true
    * Added option useanchors (boolean) wether the numerated anchors are clickable | default: true
          o NB! this value will only take effect if "showframes" is set to "true" 

Version 0.3

    * Redid some of the logic
    * Removed the :last-child selector since IE7/8 doesn't support it
    * Moved all the CSS to an external file 

Version 0.2

    * Removed the local copy of mootools-1.2.3-core.js
    * index.html now loads MooTools? 1.2.3 from googleapis.com
    * Added option autostart (boolean) wether the transition effect should autostart or not | default: true
    * Now you're able to jump to any frame by clicking the corresponding anchor
    * Added some HTML-attributes 

Version 0.1

    * First version 