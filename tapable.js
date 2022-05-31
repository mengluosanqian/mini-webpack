import pkg from 'tapable'
const {
    SyncHook,
    AsyncParallelHook
} = pkg
class List {
    getRoutes() {}
}
class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(["newSpeed"]),
            brake: new SyncHook(),
            calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
        };
    }
    setSpeed(newSpeed) {
        // following call returns undefined even when you returned values
        // 调用call就是触发时间
        this.hooks.accelerate.call(newSpeed);
    }

    useNavigationSystemPromise(source, target) {
        const routesList = new List();
        return this.hooks.calculateRoutes.promise(source, target, routesList).then((res) => {
            // res is undefined for AsyncParallelHook
            console.log('useNavigationSystemPromise');
            return routesList.getRoutes();
        });
    }

    useNavigationSystemAsync(source, target, callback) {
        const routesList = new List();
        this.hooks.calculateRoutes.callAsync(source, target, routesList, err => {
            if (err) return callback(err);
            callback(null, routesList.getRoutes());
        });
    }
}
// 1. 注册事件
const car = new Car()
car.hooks.accelerate.tap("test1", (speed) => {
    console.log('accelerate',speed);
})

car.hooks.calculateRoutes.tapPromise('test 2 promise',(source,target,routesList) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('tapPromise',source,target,routesList);
            resolve()
        },0)
    })
})
// 2. 触发事件
car.setSpeed(10)
car.useNavigationSystemPromise(['1','2','3'],1)