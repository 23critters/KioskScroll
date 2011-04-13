/*
---
description: Kiosk Scroll Pane built on the MooTools Framework

license: MIT-style

authors:
- Thomas Kunambi
- kunambi

requires:
- core/1.3: [Class, Element.Event, Element.Style, Fx.Tween, KioskScroll]
*/

var KioskScrollPane = new Class({
    Extends: KioskScroll,
    fadeComplete: function(idx) {
        var obj = this.element.getElements("ul:first-child > li")[this.next],
            oA = obj.getElement("a"),
            sBGUrl = oA.getStyle("background-image"),
            iStart = this.rand(4),
            sStart = "",
            sProtocol = document.location.protocol,
            fxImg = new Fx.Tween(oA, {
                duration: this.options.duration * 1000
            }),
            sImg = "";

        switch(Browser.name) {
            case "firefox":
                sImg = oA.getStyle("background-image").substring(sBGUrl.indexOf('"')+1, sBGUrl.lastIndexOf('"'));
            break;
            default:
                sImg = oA.getStyle("background-image").substring(sBGUrl.lastIndexOf(sProtocol), sBGUrl.lastIndexOf('.')+4);
            break;
        }

        var oImg = new Element("img", {
            "src": sImg
        });
        
        switch(iStart) {
            case 1:
                sStart = "0px 0px";
                oA.setStyle("background-position", sStart);
            break;
            case 2:
                sStart = "0px " + Number.from(oA.getSize().y - oImg.height) + "px";
                oA.setStyle("background-position", sStart);
            break;
            case 3:
                sStart = Number.from(oA.getSize().x - oImg.width) + "px 0px";
                oA.setStyle("background-position", sStart);
            break;
            default:
                sStart = Number.from(oA.getSize().x - oImg.width) + "px " + Number.from(oA.getSize().y - oImg.height) + "px";
                oA.setStyle("background-position", sStart);
            break;
        }

        var aBG = oA.getStyle("background-position").split(" "),
            sBG = aBG.map(function(val, idx) {
                if (idx == 0) {
                    return val = (val.toInt() == 0)?-Math.abs(oImg.width - oA.getSize().x):0;
                } else {
                    return val = (val.toInt() == 0)?-Math.abs(oImg.height - oA.getSize().y):0;
                }
            }).join(" ");

        fxImg.start("background-position", sStart, sBG);
    },
    rand: function(max) {
        return Math.floor(Math.random()* max + 1);
    }
});