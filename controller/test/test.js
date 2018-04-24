class Test {
    constructor() {
        this.time = 0;
        this.demo = this.demo.bind(this);
    }
    demo(req, res, next) {
        const timming = setInterval(() => {
            console.log(this.time)
            this.time++;
            if (this.time == 10) {
                res.send("计时结束。。")
                clearInterval(timming);
            }
        }, 1000)
    }
}

export default new Test();