/*
---
description: Kiosk Scroll built on the MooTools Framework

license: MIT-style

authors:
- Thomas Kunambi
- kunambi

requires:
- core/1.2.5: [Class, Element.Event, Element.Style, Fx.Tween]
*/

var KioskScroll = new Class({
    Implements: Options,
    options: {
        width: null,
        height: null,
        duration: 5,
        transition: 200,
        clickframe: false,
        showanchors: true,
        useanchors: true,
        autostart: true,
        periodical: true
    },
    /**
    @constructor
    @this {KioskScroll}
    @throws {String} If this.element can't be found, throw error
    @param {Array} Options for behaviours of the Kiosk Scroll
    */
    initialize: function(options) {
        this.setOptions(options);
        try {
            this.element = document.id(this.options.element) || this.options.element;
            if (this.element === null) {
                throw("DOM object not found");
            }
        } catch(e) {
            alert(e);
            return;
        }
        
        this.timer = null;
        this.curr = 0;

        if (!isNaN(this.options.width)) {
            this.element.setStyle("width", this.options.width);
        }
        if (!isNaN(this.options.height)) {
            this.element.setStyle("height", this.options.height);
        }

        if (this.options.showanchors) {
            this.navigator = new Element("ul.kiosk-nav").inject(this.element);
            this.element.getElements("ul:first-child > li").each(function(obj, idx) {
                if (idx > 0) {
                    obj.setStyles({
                        "opacity": 0,
                        "display": "none"
                    });
                }
                if (this.options.clickframe) {
                    obj.setStyle("cursor", "pointer");
                    obj.addEvent("click", function(e) {
                        e.preventDefault();
                        clearTimeout(this.timer);
                        this.scrollToPane(idx+1);
                    }.bind(this));
                }
                if (this.options.useanchors) {
                    new Element("li", {
                        "class": !idx ? "active" : ""
                    }).adopt(
                        new Element("a", {
                            "html": idx + 1,
                            "href": "javascript:;"
                        }).addEvent("click", function(e) {
                            e.preventDefault();
                            clearTimeout(this.timer);
                            this.scrollToPane(idx);
                        }.bind(this))
                    ).inject(this.navigator);
                } else {
                    new Element("li", {
                        "html": idx + 1,
                        "class": !idx ? "active" : ""
                    }).inject(this.navigator);
                }    
            }.bind(this));
        }
        if (this.options.autostart) {
            this.start();
        }
    },
    start: function() {
        if (this.options.periodical) {
            this.isPlaying = true;
            this.timer = this.scrollToPane.delay(this.options.duration * 1000, this, [undefined]);
        } else {
            this.scrollToPane();
        }
    },
    stop: function() {
        if (this.isPlaying) {
            clearTimeout(this.timer);
            this.isPlaying = false;
        }
    },
    scrollToPane: function(idx) {
        if (!!idx || idx === 0) {
            this.next = (idx < this.element.getElements("ul:first-child > li").length) ? idx : 0;
        } else {
            this.next = (this.curr < this.element.getElements("ul:first-child > li").length - 1) ? this.curr+1 : 0;
        }
        this._fadeOut(true);
        if (this.isPlaying) {
            this.timer = this.scrollToPane.delay(this.options.duration * 1000, this, [undefined]);
        }
    },
    /**
    @private
    */
    _fadeOut: function(doFadeIn) {
        var obj = this.element.getElements("ul:first-child > li")[this.curr];
        new Fx.Tween(obj, {
            duration: this.options.transition,
            transition: Fx.Transitions.Sine.easeInOut,
            onComplete: function() {
                obj.setStyle("display", "none");
                if (this.options.showanchors) {
                    this.navigator.getElements("li.active").removeClass("active");
                }
                if (doFadeIn) {
                    this._fadeIn(this.next);
                }
            }.bind(this)
        }).start("opacity", 0);
    }.protect(),
    /**
    @private
    */
    _fadeIn: function(idx) {
        this.curr = idx;
        var obj = this.element.getElements("ul:first-child > li")[idx];
        obj.setStyle("display", "block");
        if (this.options.showanchors) {
            this.navigator.getElements("li")[idx].addClass("active");
        }
        new Fx.Tween(obj, {
            duration: this.options.transition,
            transition: Fx.Transitions.Sine.easeInOut
        }).start("opacity", 1);
    }
});