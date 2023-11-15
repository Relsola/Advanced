// 这会在一个副作用就要运行之前被设置
// 我们会在后面处理它
let activeEffect;

function track(target, key) {
    if (activeEffect) {
        const effects = getSubscribersForProperty(target, key)
        effects.add(activeEffect)
    }
};

function trigger(target, key) {
    const effects = getSubscribersForProperty(target, key)
    effects.forEach((effect) => effect())
};

function reactive(obj) {
    return new Proxy(obj, {
        get(target, key) {
            track(target, key)
            return target[key]
        },
        set(target, key, value) {
            target[key] = value
            trigger(target, key)
        }
    })
};

function ref(value) {
    const refObject = {
        get value() {
            track(refObject, 'value')
            return value
        },
        set value(newValue) {
            value = newValue
            trigger(refObject, 'value')
        }
    }
    return refObject
};


function whenDepsChange(update) {
    const effect = () => {
        activeEffect = effect
        update()
        activeEffect = null
    }
    effect()
};
