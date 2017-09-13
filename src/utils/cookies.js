const MAX_AGE = 7*24*3600;

export const getCookies = function() {
    let cookies = window.document.cookie;
    if(cookies) {
        cookies = cookies.split(';') //空的字符串作此操作返回的数组不是空的
        let cookieObj = {};
        for(let i = 0; i<cookies.length; i++) {
            let keyValue = cookies[i].split('=');
            cookieObj[keyValue[0].trim()] = keyValue[1].trim();
        }
        return cookieObj;
    }else {
        return false;
    }
}

export const setCookie = function(name,value) {
    let domain = window.location.hostname; 
    window.document.cookie = `${name}=${value};max-age=${MAX_AGE};domain=${domain}`;
}
export const deleteCookies = function() {
    let cookies = getCookies();
    for(let i = 0;i < Object.keys(cookies).length; i++) {
        window.document.cookie += ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}