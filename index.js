window.addEventListener("load", _ => {
    setInterval(_ => refreshTime(), 500)
    refreshTime()
})
const refreshTime = _ => {
    let create_time = Math.round(new Date(Date.UTC(2005, 12, 27, 5, 45, 0)).getTime() / 1000);
    let timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
    let currentTime = secondToDate(timestamp - create_time);
    document.getElementById('time').innerText = currentTime[0] + '年' + currentTime[1] + '天' + currentTime[2] + '小时' + currentTime[3] + '分钟' + currentTime[4] + '秒';
}
const secondToDate = second => {
    if (!second) {
        return 0;
    }
    var time = [0, 0, 0, 0, 0];
    if (second >= 365 * 24 * 3600) {
        time[0] = Math.floor(second / (365 * 24 * 3600));
        second %= 365 * 24 * 3600;
    }
    if (second >= 24 * 3600) {
        time[1] = Math.floor(second / (24 * 3600));
        second %= 24 * 3600;
    }
    if (second >= 3600) {
        time[2] = Math.floor(second / 3600);
        second %= 3600;
    }
    if (second >= 60) {
        time[3] = Math.floor(second / 60);
        second %= 60;
    }
    if (second > 0) {
        time[4] = second;
    }
    return time;
}
