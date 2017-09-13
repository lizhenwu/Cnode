export default function(value) {
    let nowTime = new Date(),
        lastTime = new Date(value);
    let year = nowTime.getFullYear() - lastTime.getFullYear(),
        month = nowTime.getMonth() - lastTime.getMonth(),
        day = nowTime.getDay() - lastTime.getDay(),
        hour = nowTime.getHours() - lastTime.getHours(),
        minute = nowTime.getMinutes() - lastTime.getMinutes(),
        second = nowTime.getSeconds() - lastTime.getSeconds();
    if(year > 0) {
        return `${year}年前`;
    }else if(month>0) {
        return `${month}月前`;
    }else if(day>0) {
        return `${day}天前`;
    }else if(hour>0) {
        return `${hour}小时前`;
    }else if(minute>0) {
        return `${minute}分钟前`;
    }else {
        return `${second}秒前`;
    }
}