import { Injectable } from '@angular/core';

@Injectable()
export class DistinctUntilChangedService {

  constructor() { }

  static compare(oldItems : Object, newItems: Object): boolean {
    let newItemsKeys = Object.keys(newItems);
    let keys = Object.keys(oldItems);
    newItemsKeys.map((currentValue) => {
      if (!keys.includes(currentValue)) {
        keys.push(currentValue);
      }
    });
    let invalidValue = ['', undefined, null];
    for (let index in keys) {
      let newItem = newItems[keys[index]];
      let oldItem = oldItems[keys[index]];
      if (invalidValue.includes(newItem) || (Array.isArray(newItem) && newItem.length === 0) || (newItem instanceof Object && Object.keys(newItem).length === 0)) {
        newItem = '';
      }
      if (invalidValue.includes(oldItem) || (Array.isArray(oldItem) && oldItem.length === 0) || (oldItem instanceof Object && Object.keys(oldItem).length === 0)) {
        oldItem = '';
      }
      if (typeof newItem !== typeof oldItem) {
        return false;
      } else if (typeof newItem === 'string') {
        if (newItem.trim() !== oldItem.trim()) {
          return false;
        }
      } else if ((typeof newItem === 'number' || typeof newItem === 'boolean') && newItem !== oldItem) {
        return false;
      } else if (Array.isArray(newItem) && Array.isArray(oldItem)) {
        if (newItem.length != oldItem.length) {
          return false;
        }

        /*for (let index in newItem) {
          if (oldItem[index] == undefined) {
            return false;
          } else {
            this.compare(oldItem[index], newItem[index]);
          }
        }

        for (let index in oldItem) {
          if (newItem[index] == undefined) {
            return false;
          } else {
            this.compare(oldItem[index], newItem[index]);
          }
        }*/

        let result1 = newItem.every((currentValue) => {
          return oldItem.includes(currentValue);
        });
        let result2 = oldItem.every((currentValue) => {
          return newItem.includes(currentValue);
        });
        if (!result1 || !result2) {
          return false;
        }
      } else if (newItem instanceof Object && oldItem instanceof Object) {
        let result = this.compare(oldItem, newItem);
        if (!result) {
          return false;
        }
      } else if (newItem !== oldItem) {
        return false;
      }
    }
    return true;
  }
  //v1: orgData v2:currentData
  static compareDatas(v1: any, v2: any): boolean {
    const type1 = typeof(v1);
    const type2 = typeof(v2);
    if (type1 != type2) {
      return false;
    }
    let type = type1;
    let variableTypes = ["string", "boolean", "number", "undefined"];
    if (variableTypes.includes(type)) {
      if (type === 'string') {
        if (v1.trim() !== v2.trim()) {
          return false;
        }
      } else if(v1 != v2){
        return false;
      }
    }
    if (type === "object" && v1 === null) {
      if (v1 != v2) {
        return false;
      } else {
        return true;
      }
    }

    if (type === "object") {
      if (Array.isArray(v1) && Array.isArray(v2)) {
        //数组
        if (v1.length != v2.length) {
          return false;
        } else if (v1.length > 0) {
          for (let key in v1) {
            if (!this.compareDatas(v1[key], v2[key])) {
              return false;
            }
          }
        }
      } else {
        let keys = Object.keys(v1);
        // let tmpV1Keys = Object.keys(v1);
        // let keys = Object.keys(v2);
        // tmpV1Keys.map((currentValue) => {
        //   if (!keys.includes(currentValue)) {
        //     keys.push(currentValue);
        //   }
        // });
        for (let index in keys) {
          let v1Item = v1[keys[index]];
          let v2Item = v2[keys[index]];

          let result = this.compareDatas(v1Item, v2Item);
          if (!result) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
