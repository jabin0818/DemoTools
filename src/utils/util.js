// import tool from 'easy-dom-util';
import initStore from '@/store';
import { Notes } from '@/utils/piano/constant'
// export let $ = tool;

export function base64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function isUndf(v) {
    return typeof v === 'undefined';
}

export function isObject(v) {
    return typeof v === 'object';
}

export function getWindowSize() {
    return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };
}

export function random(a, b) {
    return (a + Math.round(Math.random() * (b - a)));
};

export function isPC() {
    return !(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent));
}

let toastTimer = null;

export function toast(text) {
    clearTimeout(toastTimer);
    initStore().commit('ui/setToast', text);
    toastTimer = setTimeout(() => {
        initStore().commit('ui/setToast', '');
    }, 3000);
}

export const isNoteNameValid = (noteName) => {
    return Notes.some(n => {
        return n.name == noteName
    })
}
/**
 * rgba(153, 5, 5, 1)转 { r: 153, g: 5, b: 5, a: 1 }
 * rgba处理函数
 * @params {*} string/Array => obj/Array
 */
export const colorObj = (str) => {
    let obj = {};
    let arr = [];
    if (str) {
        if (Object.prototype.toString.call(str) === "[object Array]") { //判断数据类型
            for (let key in str) {
                let strArr = [];
                let strObj = {};
                strArr = str[key]
                    .split("(")[1]
                    .split(")")[0]
                    .split(","); // 将rgba分割成数组
                strObj.r = Number(strArr[0].trim());
                strObj.g = Number(strArr[1].trim());
                strObj.b = Number(strArr[2].trim());
                strObj.a = Number(strArr[3].trim());
                arr.push(strObj);
            }
            return arr;
        } else {
            arr = str
                .split("(")[1]
                .split(")")[0]
                .split(",");
            if (arr.length == 4) {
                obj.r = Number(arr[0].trim());
                obj.g = Number(arr[1].trim());
                obj.b = Number(arr[2].trim());
                obj.a = Number(arr[3].trim());
            } else {
                return str; // 传参有误处理
            }
        }
        return obj;
    } else {
        return str; // 传null处理
    }
};


/**
 * { r: 153, g: 5, b: 5, a: 1 } 转 rgba(153, 5, 5, 1)
 * [{ r: 153, g: 5, b: 5, a: 1 },{ r: 153, g: 5, b: 5, a: 1 }] 转 ['rgba(153, 5, 5, 1)','rgba(153, 5, 5, 1)']
 * rgba处理函数
 * @params {*} obj => str
 */
export const colorStr = (obj) => {
    let arr = [];
    if (obj) {
        if (Object.prototype.toString.call(obj) === "[object Array]") {
            for (let key in obj) {
                arr.push(`rgba(${obj[key].r},${obj[key].g},${obj[key].b},${obj[key].a})`)
            }
            return arr;
        } else {
            return `rgba(${obj.r},${obj.g},${obj.b},${obj.a})`;
        }
    } else {
        return obj;
    }
};