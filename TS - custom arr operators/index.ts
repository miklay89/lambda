/* eslint-disable no-undef */
/* eslint-disable no-self-compare */
interface Array<T> {
  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param callback A function that accepts up to three arguments.
   * The every method calls the callback function for each element in the array
   * until the callback returns a value which is coercible to the Boolean value
   * false, or until the end of the array.
   */
  all<T>(
    callback: (el: T, index?: number, array?: readonly T[]) => boolean,
  ): boolean;

  /**
   * Determines whether the specified callback function returns true for any element
   * of an array.
   * @param callback A function that accepts up to three arguments. The some method
   * calls the callback function for each element in the array until the callback
   * returns a value which is coercible to the Boolean value true, or until the end
   * of the array.
   */
  any<T>(
    callback: (el: T, index?: number, array?: readonly T[]) => boolean,
  ): boolean;

  /**
   * Returns an average value of elements in the array. If elements are not numbers
   * then returns NaN.
   */
  average(): number;

  /**
   * Returns a map containing a key as a callback1 result value and an element as a
   * value if only callback1 is passed into. In case of passing callback1 and
   * callback2 returns a map with a key as a callback1 result value and a value as
   * a callback2 result value.
   * @param callback1 A function which accepts up to three arguments. The associateBy
   * method calls the callback function for each element in the given array until the
   * end of the given array and sets the result as a key of the map afterwards.
   * @param callback2 A function which accepts up to three arguments. The associateBy
   * method calls the callback function for each element in the given array until the
   * end of the given array and sets the result as a value of the map afterwards.
   */
  associateBy<T, K, V>(
    callback1: (el: T, index?: number, array?: readonly T[]) => K,
    callback2?: (el: T, index?: number, array?: readonly T[]) => V,
  ): Map<K, V | T>;

  /**
   * Returns array which splits this array into array of arrays each not exceeding the
   * given size.
   * @param step - the number of elements to take in each array, must be positive and
   * can be greater than the number of elements in this array.
   */
  chunked<T>(step: number): T[][];

  /**
   * Returns array containing only elements from the given array,except for those that
   * satisfies the callback condition.
   * @param callback - the callback function with condition
   */
  distinctBy<T, K>(
    callback: (el: T, index?: number, array?: readonly T[]) => K,
  ): T[];

  /**
   * Returns the elements of an array that meet the condition specified in a callback
   * function.
   * @param callback - A function that accepts up to three arguments. The filter method
   * calls the predicate function one time for each element in the array.
   */
  myFilter<T>(
    callback: (el: T, index?: number, array?: readonly T[]) => boolean,
  ): T[];

  /**
   * Returns new array of numbers with elements wich multiplied by factor.
   * @param factor - any number, by default factor = 10.
   * This method only for array of numbers, otherwise it will return array of
   * NaN.
   */
  multiply(factor?: T): T[];

  /**
   * Returns array containing only elements matching the given callback.
   * @param callback - callback function that takes the index of an element and the
   * element itself and returns the result of callback evaluation on the element.
   */
  filterIndexed<T>(
    callback: (el: T, index: number, array?: readonly T[]) => boolean,
  ): T[];

  /**
   * Returns the elements of an array that dissatisfy the condition specified in a
   * callback function.
   * @param callback - A function that accepts up to three arguments. The filter method
   * calls the predicate function one time for each element in the array.
   */
  filterNot<T>(
    callback: (el: T, index?: number, array?: readonly T[]) => boolean,
  ): T[];

  /**
   * Returns the value of the first element in the array where callback is true, and
   * null otherwise.
   * @param callback - find calls callback once for each element of the array, in
   * ascending order, until it finds one where predicate returns true. If such an
   * element is found, find immediately returns that element value. Otherwise, find
   * returns null.
   */
  myFind<T>(
    callback: (el: T, index?: number, array?: readonly T[]) => boolean,
  ): T | null;

  /**
   * Returns the last element matching the given callback, or null if no such element
   * was found.
   * @param callback - the callback function with condition
   */
  findLast<T>(
    callback: (el: T, index?: number, array?: readonly T[]) => boolean,
  ): T | null;

  /**
   * Returns a single array of all elements from all arrays in the given array.
   */
  flatten<T>(): T[];

  /**
   * Accumulates value starting with initial value and applying callback function
   * from left to right to current accumulator value and each element
   * @param initVal An initial value
   * @param callback A function which accepts up to four arguments. The fold method
   * calls the callback function
   * for each element in the array until the end of the given array.
   */
  fold<T, K>(
    initVal: T,
    callback: (initVal: T, el: K, index?: number, array?: readonly T[]) => T,
  ): T;

  /**
   * Returns the first element yielding the largest value of the given function or null.
   * @param callback - the callback function with condition
   */
  maxBy<T, K>(
    callback: (el: T, index?: number, array?: readonly T[]) => K,
  ): T | null;

  /**
   * Returns the first element yielding the smallest value of the given function.
   * @param callback - the callback function with condition
   */
  minBy<T, K>(
    callback: (el: T, index?: number, array?: readonly T[]) => K,
  ): T | null;

  /**
   * Returns number of elements which satisfy the given condition in callback
   * @param callback  - the callback function with condition
   */
  count<T>(
    callback: (el: T, index?: number, array?: readonly T[]) => boolean,
  ): number;

  /**
   * Returns a map with a key as a callback value and a value as an array of
   * all elements which satisfy the callback function.
   * @param callback A function which accepts up to three arguments.
   * The groupBy method calls the callback function
   * for each element till the end of the given array.
   */
  groupBy<T, K>(
    callback: (el: T, index?: number, array?: readonly T[]) => K,
  ): Map<K, T[]>;

  /**
   * Returns a map with a key as a callback value and a value as an array of
   * all elements which satisfy the callback function.
   * @param callback1 A function which accepts up to three arguments. The
   * groupBy method calls the callback function for each element till the end
   * of the given array.
   * @param callback2 A function which accepts up to three arguments. The
   * groupBy method calls the callback function for each element till the end
   * of the given array.
   */
  groupBySec<T, K, V>(
    callback1: (el: T, index?: number, array?: readonly T[]) => K,
    callback2: (el: T, index?: number, array?: readonly T[]) => V,
  ): Map<K, V[]>;
}

// multiply()
Array.prototype.multiply = function (
  this: number[],
  factor?: number,
): number[] {
  // default multiply each element of array by 10 (factor is undefined)
  if (typeof factor === "undefined") return this.map((e) => e * 10);
  // custom multiply each element of arr by factor (factor is defined)
  return this.map((e) => e * factor);
};

// const testMultiply = [1, 2, 3, 4, 5];
// console.log(testMultiply.multiply()); // [ 10, 20, 30, 40, 50 ]
// console.log(testMultiply.multiply(5)); // [ 5, 10, 15, 20, 25 ]

// all()
Array.prototype.all = function <T>(
  callback: (el: T, index?: number, array?: T[]) => boolean,
): boolean {
  let result = true;
  for (let index = 0; index < this.length; index++) {
    // this[i] - is element of array, i - index of element, this - current array
    if (!callback(this[index], index, this)) {
      result = false;
      break;
    }
  }

  return result;
};

// const testAll = [1, 2, 3, 4, 5];
// console.log(testAll.all((e) => typeof e === "number")); // true
// console.log(testAll.all((e) => typeof e === "boolean")); // false

// any()
Array.prototype.any = function <T>(
  callback: (el: T, index?: number, array?: T[]) => boolean,
): boolean {
  let result = false;
  for (let index = 0; index < this.length; index++) {
    if (callback(this[index], index, this)) {
      result = true;
      break;
    }
  }

  return result;
};

// const testAny = [1, 2, 3, 4, true, "Oleg", { admin: true }];
// console.log(testAny.any((e) => typeof e === "object")); // true
// console.log(testAny.any((e) => typeof e === "undefined")); // false

// average()
Array.prototype.average = function (this: number[]): number {
  let sum = 0;
  let average = 0;
  for (let index = 0; index < this.length; index++) {
    sum += this[index];
    if (index === this.length - 1) average = sum / this.length;
  }
  return average;
};

// const testAverage = [10, 15, 30, 45, 17];
// console.log(testAverage.average()); // 23,4

// chunked()
Array.prototype.chunked = function <T>(step: number): T[][] {
  const arr = [...this];
  if (step > arr.length) return arr;
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr.splice(0, step));
    if (arr.length < step && arr.length !== 0) result.push(arr);
  }
  return result;
};

// const testChunked = [
//   "one",
//   "two",
//   "three",
//   "four",
//   "five",
//   "six",
//   "seven",
//   "eight",
//   "nine",
//   "ten",
// ];

// console.log(testChunked.chunked(3)); // [["one", "two", "three"], ["four", "five", "six"], ["seven", "eight", "nine"], ["ten"]]
// console.log(testChunked.chunked(11)); // ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]

// distinctBy()
Array.prototype.distinctBy = function <T, K>(
  callback: (el: T, index?: number, array?: readonly T[] | undefined) => K,
): T[] {
  const map = new Map<K, boolean>();
  const result: T[] = [];
  this.forEach((element) => {
    const key = callback(element);
    if (!map.get(key)) {
      result.push(element);
      map.set(key, true);
    }
  });
  return result;
};

// const testDistinctBy = ["a", "A", "b", "B", "A", "a", "A", "c", "C"];
// console.log(testDistinctBy.distinctBy((e: string) => e.toUpperCase()));

// myFilter()
Array.prototype.myFilter = function <T>(
  callback: (
    el: T,
    index?: number,
    array?: readonly T[] | undefined,
  ) => boolean,
): T[] {
  const resultArr: T[] = [];
  for (let index = 0; index < this.length; index++) {
    // this[i] - is element of array, i - index of element, this - current array
    if (callback(this[index], index, this)) {
      resultArr.push(this[index]);
    }
  }
  return resultArr;
};

// const retsMyFilter = [{ oleg: true }, 1, "string", true, undefined];
// console.log(retsMyFilter.myFilter((e) => typeof e === "boolean")); // [ true ]
// console.log(retsMyFilter.myFilter((e) => typeof e === "number")); // [ 1 ]
// console.log(retsMyFilter.myFilter((e) => typeof e === "object")); // [ { oleg: true } ]

// filterIndexed()
Array.prototype.filterIndexed = function <T>(
  callback: (el: T, index: number, array?: readonly T[] | undefined) => boolean,
): T[] {
  const result: T[] | undefined = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// const testFilterIndexed = [
//   "Oleg",
//   "Grisha",
//   "Valdemar",
//   "Mishel",
//   "Dracula",
//   "Neo",
// ];
// console.log(
//   testFilterIndexed.filterIndexed(
//     (element: string, idx: number) => idx > 1 && element.length > 4,
//   ),
// ); // [ "Valdemar", "Mishel", "Dracula" ]
// console.log(
//   testFilterIndexed.filterIndexed(
//     (element: string, idx: number) => idx > 1 && element.length < 4,
//   ),
// ); // ["Neo"]

// filterNot()
Array.prototype.filterNot = function <T>(
  callback: (
    el: T,
    index?: number,
    array?: readonly T[] | undefined,
  ) => boolean,
): T[] {
  const resultArr: T[] = [];
  for (let index = 0; index < this.length; index++) {
    // this[i] - is element of array, i - index of element, this - current array
    if (!callback(this[index], index, this)) {
      resultArr.push(this[index]);
    }
  }
  return resultArr;
};

// const testFilterNot = [1, 2, 4, "string", true, { admin: false }];
// console.log(testFilterNot.filterNot((e) => typeof e === "number")); // [ 'string', true, { admin: false } ]
// console.log(testFilterNot.filterNot((e) => typeof e === "object")); // [ 1, 2, 4, 'string', true ]
// console.log(testFilterNot.filterNot((e) => typeof e === "boolean")); // [ 1, 2, 4, 'string', { admin: false } ]

// myFind()
Array.prototype.myFind = function <T>(
  callback: (
    el: T,
    index?: number,
    array?: readonly T[] | undefined,
  ) => boolean,
): T | null {
  let result;
  for (let index = 0; index < this.length; index++) {
    if (callback(this[index], index, this)) {
      result = this[index];
      break;
    } else {
      result = null;
    }
  }
  return result;
};

// const testMyFind = [1, 2, 3, 4, "string", { admin: false }];
// console.log(testMyFind.myFind((e) => typeof e === "number")); // 1
// console.log(testMyFind.myFind((e) => typeof e === "boolean")); // null

// findLast()
Array.prototype.findLast = function <T>(
  callback: (
    el: T,
    index?: number,
    array?: readonly T[] | undefined,
  ) => boolean,
): T | null {
  let result;
  for (let index = 0; index < this.length; index++) {
    if (callback(this[index], index, this)) {
      result = this[index];
    }
  }
  if (!result) result = null;
  return result;
};

// const testFindLast = [1, 2, 3, 4, "string", { admin: false }];
// console.log(testFindLast.findLast((e) => typeof e === "number")); // 4
// console.log(testFindLast.findLast((e) => typeof e === "boolean")); // null

// flatten()
Array.prototype.flatten = function <T>(): T[] {
  const result: T[] = [];
  this.forEach((element) => {
    if (Array.isArray(element)) {
      result.push(...element);
    } else {
      result.push(element);
    }
  });
  return result;
};

// const testFlatten = ["12", [1, 2], true, { oleg: "da" }];
// console.log(testFlatten.flatten()); // [ '12', 1, 2, true, { oleg: 'da' } ]

// fold()
Array.prototype.fold = function <T, K>(
  initVal: T,
  callback: (
    initVal: T,
    el: K,
    index?: number,
    array?: readonly T[] | undefined,
  ) => T,
): T {
  let acc = initVal;

  for (let i = 0; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }

  return acc;
};

// const testFold = [
//   { name: "Alice", age: 13 },
//   { name: "Klara", age: 17 },
//   { name: "Oleg", age: 22 },
//   { name: "Guliver", age: 25 },
//   { name: "Lina", age: 31 },
//   { name: "Bogdan", age: 33 },
// ];

// console.log(
//   testFold.fold(0, (init, e: { name: string; age: number }) => init + e.age),
// ); // 141

// maxBy()
Array.prototype.maxBy = function <T, K>(
  callback: (el: T, index?: number, array?: readonly T[] | undefined) => K,
): T | null {
  let result: T | null = null;

  this.forEach((element) => {
    if (result !== null && callback(element) > callback(result)) {
      result = element;
    }
    if (result === null && callback(element)) result = element;
  });

  return result;
};

// const testMaxBy = [
//   { name: "Alice", age: 13 },
//   { name: "Klara", age: 17 },
//   { name: "Oleg", age: 22 },
//   { name: "Guliver", age: 25 },
//   { name: "Lina", age: 31 },
//   { name: "Bogdan", age: 33 },
// ];
// console.log(testMaxBy.maxBy((e) => e.age)); // { name: 'Bogdan', age: 33 }
// console.log(testMaxBy.maxBy((e) => e.name.length)); // { name: 'Guliver', age: 25 }

// minBy()
Array.prototype.minBy = function <T, K>(
  callback: (el: T, index?: number, array?: readonly T[] | undefined) => K,
): T | null {
  let result: T | null = null;

  this.forEach((element) => {
    if (result !== null && callback(element) < callback(result)) {
      result = element;
    }
    if (result === null && callback(element)) result = element;
  });

  return result;
};

// const testMinBy = [
//   { name: "Alice", age: 13 },
//   { name: "Klara", age: 17 },
//   { name: "Oleg", age: 22 },
//   { name: "Guliver", age: 25 },
//   { name: "Lina", age: 31 },
//   { name: "Bogdan", age: 33 },
// ];
// console.log(testMinBy.minBy((e) => e.age)); // { name: 'Alice', age: 13 }
// console.log(testMinBy.minBy((e) => e.name.length)); // { name: 'Oleg', age: 22 }

// count()
Array.prototype.count = function <T>(
  callback: (
    el: T,
    index?: number,
    array?: readonly T[] | undefined,
  ) => boolean,
): number {
  let result = 0;
  for (let index = 0; index < this.length; index++) {
    if (callback(this[index], index, this)) {
      result++;
    }
  }
  return result;
};

// const testCount = ["12", [1, 2], true, { oleg: "da" }];
// console.log(testCount.count((e) => typeof e === "boolean")); // 1

// groupBy()
Array.prototype.groupBy = function <T, K>(
  callback: (el: T, index?: number, array?: readonly T[] | undefined) => K,
): Map<K, T[]> {
  const result: Map<K, T[]> = new Map();
  for (let i = 0; i < this.length; i++) {
    const key = callback(this[i], i, this);
    const value = result.get(key);
    if (value) value.push(this[i]);
    if (!value) result.set(key, [this[i]]);
  }
  return result;
};

// const testGroupBy = ["a", "abc", "ab", "def", "abcd"];
// console.log(testGroupBy.groupBy((el: string) => el.length)); // Map(4) { 1 => [ 'a' ], 3 => [ 'abc', 'def' ], 2 => [ 'ab' ], 4 => [ 'abcd' ] }

// groupBySec()
Array.prototype.groupBySec = function <T, K, V>(
  callback1: (el: T, index?: number, array?: readonly T[] | undefined) => K,
  callback2: (el: T, index?: number, array?: readonly T[] | undefined) => V,
): Map<K, V[]> {
  const result: Map<K, V[]> = new Map();
  for (let i = 0; i < this.length; i++) {
    const key = callback1(this[i], i, this);
    const value = result.get(key);
    if (value) value.push(callback2(this[i], i, this));
    if (!value) result.set(key, [callback2(this[i], i, this)]);
  }
  return result;
};

// const testgroupBySec = [
//   { name: "Alice", role: "admin", isAdult: true },
//   { name: "Kile", role: "user", isAdult: false },
//   { name: "Mikaella", role: "admin", isAdult: false },
//   { name: "Boris", role: "admin", isAdult: true },
//   { name: "Zod", role: "user", isAdult: true },
//   { name: "Zendeya", role: "user", isAdult: false },
// ];

// console.log(
//   testgroupBySec.groupBySec(
//     (e: { name: string; role: string; isAdult: boolean }) =>
//       e.isAdult && e.role === "admin",
//     (e: { name: string; role: string; isAdult: boolean }) => e.name,
//   ),
// ); // Map(2) { true => [ 'Alice', 'Boris' ], false => [ 'Kile', 'Mikaella', 'Zod', 'Zendeya' ] }

// associateBy()
Array.prototype.associateBy = function <T, K, V>(
  callback1: (el: T, index?: number, array?: readonly T[] | undefined) => K,
  callback2?:
    | ((el: T, index?: number, array?: readonly T[] | undefined) => V)
    | undefined,
): Map<K, T | V> {
  const result: Map<K, T | V> = new Map();
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

console.log(
  testAssociateBy.associateBy(
    (e: { name: string; surname: string }) => e.name,
    (e: { name: string; surname: string }) => e.surname,
  ),
); // Map(4) { 'Jane' => 'Foster', 'Tommas' => 'Anderson', 'Tor' => 'Odinson', 'Toni' => 'Stark' }
