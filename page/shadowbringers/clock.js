var app = new Vue({
    el: '#app',
    data: {
        language: 0, //0:Chinese,other: English
        ended: false,
        remain_time: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        text: {
            timer: ['倒计时', 'CountDown Timer'],
            days: ['天', 'Days'],
            hours: ['时', 'Hours'],
            minutes: ['分', 'Minutes'],
            seconds: ['秒', 'Seconds'],
            join: ['现在加入', 'JOIN NOW']
        },
        target_date: '2019-10-15 16:00:00'
    },
    created() {
        this.init();
        this.update_per_second();
    },
    computed: {
        timerText: function () {
            return this.language == 0 ? this.text.timer[0] : this.text.timer[1]
        },
        daysText: function () {
            return this.language == 0 ? this.text.days[0] : this.text.days[1]
        },
        hoursText: function () {
            return this.language == 0 ? this.text.hours[0] : this.text.hours[1]
        },
        minutesText: function () {
            return this.language == 0 ? this.text.minutes[0] : this.text.minutes[1]
        },
        secondsText: function () {
            return this.language == 0 ? this.text.seconds[0] : this.text.seconds[1]
        },
        joinText: function () {
            return this.language == 0 ? this.text.join[0] : this.text.join[1]
        }
    },
    methods: {
        init: function () {
            this.on_update_language(0);
            
        },
        update_per_second: function () {
            setInterval(() => {
                let now = new Date().getTime();
                let target = new Date(this.target_date).getTime();
                if (now > target) {
                    this.ended = true;
                    return;
                }

                let r = this.remain_time;
                let s = parseInt((target - now) / 1000);

                r.day = parseInt(s / (60 * 60 * 24));
                s -= r.day * (60 * 60 * 24);
                r.hour = parseInt(s / (60 * 60));
                s -= r.hour * (60 * 60);
                r.minute = parseInt(s / (60));
                r.second = s - r.minute * 60;
            }, 200);
        },
        on_update_language: function (language) {
            this.language = language;
            document.title = this.language == 0 ? "最终幻想14：暗影之逆焰" :"FINAL FANTASY XIV:ShadowBringers"
        },
        on_join_click: function () {
            if(this.language==0)
                window.open("http://ff.sdo.com/web8/index.html")
            else
                window.open("https://na.finalfantasyxiv.com/shadowbringers/")
        }
    },
});

