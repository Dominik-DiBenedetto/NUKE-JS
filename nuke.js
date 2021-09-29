(function(){

    const render = function(component, parent){
        parent.innerHTML = component
    }

    const forloop = function(startNum=0, condition, dependency, content){
        let c
        switch (condition) {
            case ">":
                c = ""
                for(let i=0; i>dependency; i++){
                    c += content(i)
                }
                return c
        
            case ">=":
                c = ""
                for(let i=startNum; i>=dependency; i++){
                    c += content(i)
                }  
                return c

            case "<":
                c = ""
                for(let i=startNum; i<dependency; i++){
                    c += content(i)
                }
                return c
        
            case "<=":
                c = ""
                for(let i=startNum; i<=dependency; i++){
                    c += content(i)
                }  
                return c
        }
        
    }

    class If{
        constructor(condition, content){
            this.condition = condition
            this.content = content
        }

        if(){
            if (this.condition){
                return this.content()
            } else {
                return ""
            }
        }

        else(Else){
            if (!this.condition){
                return Else()
            } else {
                return this.content()
            }
        }
    }

    let useEffectDependecies = {}
    let effect

    let observed = {};
    const targetProxy = new Proxy(observed, {
    set: function (target, key, value) {
        if (useEffectDependecies[key]){
            useEffectDependecies[key] = value
            effect.run()
        }
        target[key] = value;
        return true;
    }
    });

    class useEffectClass{
        constructor (func, dependencies){
            useEffectDependecies = dependencies
            this.dependencies = dependencies
            this.func = func
        }

        run(){
            return this.func(this.dependencies)
        }
    }

    const useEffect = (func, dependencies) => {
        e = new useEffectClass(func, dependencies)
        effect = e
    }

    
    this.NUKE = {
        render: render,
        refresh: render,
        for: forloop,
        check: If,
        Observe: targetProxy,
        useEffect: useEffect

    }
})()
