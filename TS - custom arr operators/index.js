"use strict";
Array.prototype.multiply = function (factor) {
    if (typeof factor === "undefined")
        return this.map((e) => e * 10);
    return this.map((e) => e * factor);
};
Array.prototype.all = function (callback) {
    let result = true;
    for (let index = 0; index < this.length; index++) {
        if (!callback(this[index], index, this)) {
            result = false;
            break;
        }
    }
    return result;
};
Array.prototype.any = function (callback) {
    let result = false;
    for (let index = 0; index < this.length; index++) {
        if (callback(this[index], index, this)) {
            result = true;
            break;
        }
    }
    return result;
};
Array.prototype.average = function () {
    let sum = 0;
    let average = 0;
    for (let index = 0; index < this.length; index++) {
        sum += this[index];
        if (index === this.length - 1)
            average = sum / this.length;
    }
    return average;
};
Array.prototype.chunked = function (step) {
    const arr = [...this];
    if (step > arr.length)
        return arr;
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr.splice(0, step));
        if (arr.length < step && arr.length !== 0)
            result.push(arr);
    }
    return result;
};
Array.prototype.distinctBy = function (callback) {
    const map = new Map();
    const result = [];
    this.forEach((element) => {
        const key = callback(element);
        if (!map.get(key)) {
            result.push(element);
            map.set(key, true);
        }
    });
    return result;
};
Array.prototype.myFilter = function (callback) {
    const resultArr = [];
    for (let index = 0; index < this.length; index++) {
        if (callback(this[index], index, this)) {
            resultArr.push(this[index]);
        }
    }
    return resultArr;
};
Array.prototype.filterIndexed = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};
Array.prototype.filterNot = function (callback) {
    const resultArr = [];
    for (let index = 0; index < this.length; index++) {
        if (!callback(this[index], index, this)) {
            resultArr.push(this[index]);
        }
    }
    return resultArr;
};
Array.prototype.myFind = function (callback) {
    let result;
    for (let index = 0; index < this.length; index++) {
        if (callback(this[index], index, this)) {
            result = this[index];
            break;
        }
        else {
            result = null;
        }
    }
    return result;
};
Array.prototype.findLast = function (callback) {
    let result;
    for (let index = 0; index < this.length; index++) {
        if (callback(this[index], index, this)) {
            result = this[index];
        }
    }
    if (!result)
        result = null;
    return result;
};
Array.prototype.flatten = function () {
    const result = [];
    this.forEach((element) => {
        if (Array.isArray(element)) {
            result.push(...element);
        }
        else {
            result.push(element);
        }
    });
    return result;
};
Array.prototype.fold = function (initVal, callback) {
    let acc = initVal;
    for (let i = 0; i < this.length; i++) {
        acc = callback(acc, this[i], i, this);
    }
    return acc;
};
Array.prototype.maxBy = function (callback) {
    let result = null;
    this.forEach((element) => {
        if (result !== null && callback(element) > callback(result)) {
            result = element;
        }
        if (result === null && callback(element))
            result = element;
    });
    return result;
};
Array.prototype.minBy = function (callback) {
    let result = null;
    this.forEach((element) => {
        if (result !== null && callback(element) < callback(result)) {
            result = element;
        }
        if (result === null && callback(element))
            result = element;
    });
    return result;
};
Array.prototype.count = function (callback) {
    let result = 0;
    for (let index = 0; index < this.length; index++) {
        if (callback(this[index], index, this)) {
            result++;
        }
    }
    return result;
};
Array.prototype.groupBy = function (callback) {
    const result = new Map();
    for (let i = 0; i < this.length; i++) {
        const key = callback(this[i], i, this);
        const value = result.get(key);
        if (value)
            value.push(this[i]);
        if (!value)
            result.set(key, [this[i]]);
    }
    return result;
};
Array.prototype.groupBySec = function (callback1, callback2) {
    const result = new Map();
    for (let i = 0; i < this.length; i++) {
        const key = callback1(this[i], i, this);
        const value = result.get(key);
        if (value)
            value.push(callback2(this[i], i, this));
        if (!value)
            result.set(key, [callback2(this[i], i, this)]);
    }
    return result;
};
Array.prototype.associateBy = function (callback1, callback2) {
    const result = new Map();
    if (callback1 && !callback2) {
        for (let i = 0; i < this.length; i++) {
            result.set(callback1(this[i], i, this), this[i]);
        }
    }
    if (callback1 && callback2) {
        for (let i = 0; i < this.length; i++) {
            result.set(callback1(this[i], i, this), callback2(this[i], i, this));
        }
    }
    return result;
};
const testAssociateBy = [
    { name: "Jane", surname: "Foster" },
    { name: "Tommas", surname: "Anderson" },
    { name: "Tor", surname: "Odinson" },
    { name: "Toni", surname: "Stark" },
];
console.log(testAssociateBy.associateBy((e) => e.name, (e) => e.surname));
