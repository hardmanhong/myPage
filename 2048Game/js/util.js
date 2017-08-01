;
(function() {
    util = {
        hasClass: function(el, cls) {
            return -1 < (" " + el.className + " ").indexOf(" " + cls + " ");
        },
        addClass: function(el, cls) {
            !this.hasClass(el, cls) && (el.className += " " + cls);
        },
        removeClass: function(el, cls) {
            if (this.hasClass(el, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                el.className = el.className.replace(reg, " ");
            }
        },
        replaceClass: function(el, oldCls, newCls) {
            if (this.hasClass(el, oldCls)) {
                var reg = new RegExp(oldCls);
                el.className = el.className.replace(reg, newCls);
            }
        },
        clearClass: function(el) {
            el.className = "";
        },
        getElement: function(selector,el) {
            var se = selector.substr(1);
            var el = el || document;
            var firstStr = selector.substr(0, 1);
            switch (firstStr) {
            	case "#":
                    return el.getElementById(se);
                    break;
                case ".":
                    return el.getElementsByClassName(se);
                    break;
                default:
                    return el.getElementsByTagName(selector);
                    break;
            }
        }
    }
    // window.util = util;
}());