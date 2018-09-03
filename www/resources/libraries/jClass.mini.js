(function () {

    JClass = function () {

        var len = arguments.length;
        var body = arguments[len - 1];
        var SuperClass = len > 1 ? arguments[0] : null;
        var hasImplementClasses = len > 2;
        var Class, SuperClassEmpty;

        if (body.constructor === Object) {
            Class = function () { };
        } else {
            Class = body.constructor;
            delete body.constructor;
        }

        if (SuperClass) {
            SuperClassEmpty = function () { };
            SuperClassEmpty.prototype = SuperClass.prototype;
            Class.prototype = new SuperClassEmpty();
            Class.prototype.constructor = Class;
            Class.Super = SuperClass;
            extend(Class, SuperClass, false);
        }

        if (hasImplementClasses)
            for (var i = 1; i < len - 1; i++)
                extend(Class.prototype, arguments[i].prototype, false);

        extendJClass(Class, body);

        return Class;

    };
    var extendJClass = extendJClass = function (Class, extension, override) {
        if (extension.STATIC) {
            extend(Class, extension.STATIC, override);
            delete extension.STATIC;
        }
        extend(Class.prototype, extension, override);
    };
    var extend = extendProperty = function (obj, extension, override) {
        var prop;
        if (override === false) {
            for (prop in extension)
                if (!(prop in obj))
                    obj[prop] = extension[prop];
        } else {
            for (prop in extension)
                obj[prop] = extension[prop];
            if (extension.toString !== Object.prototype.toString)
                obj.toString = extension.toString;
        }
    };

})();