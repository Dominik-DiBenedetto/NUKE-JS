/* Framework code */
(function () {
    let controllers = {};
    let addController = function (name, constructor) {
        // Store controller constructor
        controllers[name] = {
            factory: constructor,
            instances: [],
        };

        // Look for elements using the controller
        let element = document.querySelector("[nuke-controller=" + name + "]");
        if (!element) {
            return;
        }

        // Create a new instance and save it
        let ctrl = new controllers[name].factory();
        controllers[name].instances.push(ctrl);

        // Get elements bound to properties
        let bindings = {};
        Array.prototype.slice
            .call(element.querySelectorAll("[nuke-bind]"))
            .map(function (element) {
                let boundValue = element.getAttribute("nuke-bind");

                if (!bindings[boundValue]) {
                    bindings[boundValue] = {
                        boundValue: boundValue,
                        elements: [],
                    };
                }

                bindings[boundValue].elements.push(element);
            });

        let bindingVals = {};
        Array.prototype.slice
            .call(element.querySelectorAll("[nuke-bind-val]"))
            .map(function (element) {
                let boundValue = element.getAttribute("nuke-bind-val");

                if (!bindingVals[boundValue]) {
                    bindingVals[boundValue] = {
                        boundValue: boundValue,
                        elements: [],
                    };
                }

                bindingVals[boundValue].elements.push(element);
            });

        let bindingMsgs = [];
        Array.prototype.slice
          .call(element.querySelectorAll("[nuke-bind-msg]"))
          .map(function (element) {
              let boundValue = element.getAttribute("nuke-bind-msg");
              //console.log(boundValue);

              let elm = {
                  boundValue: { boundVal: boundValue, for: element },
              };

              bindingMsgs.push(elm);
          });

        console.log(ctrl)
        for (const child in ctrl) {
          console.log(child);
        }

        let proxy = new Proxy(ctrl, {
            set: function (target, prop, value) {
                let bind = bindings[prop];
                let bindVal = bindingVals[prop];
                if (bind || bindVal) {
                    if (bind) {
                        bind.elements.forEach(function (element) {
                            element.value = value;
                            element.setAttribute("value", value);
                        });
                    }
                    if (bindVal) {
                        let element = bindVal.elements[0];
                        for (i = 0; i < bindingMsgs.length; i++) {
                            let boundMsg = bindingMsgs[i];
                            let msg = "";
                            if (element == boundMsg.boundValue.for) {
                                msg = boundMsg.boundValue.boundVal;
                            }
                            if (msg !== "") {
                                element.innerText = msg + value;
                                break;
                            } else {
                                element.innerText = value;
                            }
                        }
                    }
                }
                return Reflect.set(target, prop, value);
            },
        });

        // Listen DOM element update to set the controller property
        Object.keys(bindings).forEach(function (boundValue) {
            let bind = bindings[boundValue];
            bind.elements.forEach(function (element) {
                element.addEventListener("input", function (event) {
                    proxy[bind.boundValue] = event.target.value;
                });
            });
        });

        // Fill proxy with ctrl properties
        // and return proxy, not the ctrl !
        Object.assign(proxy, ctrl);
        return proxy;
    };

    // Export framework in window
    this.NUKE = {
        controller: addController,
    };
})();
