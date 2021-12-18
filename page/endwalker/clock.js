var app = new Vue({
    el: '#app',
    modules: {
        moment
    },
    data: {
        language: 0, // 0: CN  1: EN
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
            join: ['现 在 加 入', 'JOIN NOW']
        },
        // target_date: '2022-3-16 16:00:00',
        target_date_seconds: 1647417600000
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
        value_to_text: function (x) {
            return ('00' + x).slice(-2)
        },
        update_per_second: function () {
            setInterval(() => {
                let now = moment(new Date());
                // let target = moment(this.target_date).valueOf();
                // console.log(target);
                let s = parseInt((this.target_date_seconds - now.valueOf()) / 1000);
                if (s <= 0) {
                    this.ended = true;
                    return;
                }

                day = parseInt(s / (60 * 60 * 24));
                s -= day * (60 * 60 * 24);
                hour = parseInt(s / (60 * 60));
                s -= hour * (60 * 60);
                minute = parseInt(s / (60));
                second = s - minute * 60;

                let r = this.remain_time;
                r.day = this.value_to_text(day)
                r.hour = this.value_to_text(hour)
                r.minute = this.value_to_text(minute)
                r.second = this.value_to_text(second)
            }, 200);
        },
        on_update_language: function (language) {
            this.language = language;
            document.title = this.language == 0 ? "最终幻想14：晓月之终途" : "FINAL FANTASY XIV:ENDWALKER"
        },
        on_join_click: function () {
            if (this.language == 0)
                window.open("https://ff.web.sdo.com/web8/index.html#/home")
            else
                window.open("https://na.finalfantasyxiv.com/shadowbringers/")
        }
    },
});