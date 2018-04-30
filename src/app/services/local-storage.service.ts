import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

interface ICache {
	[ key: string ]: any
}

@Injectable()
export class LocalStorageService {
  //缓存
  private cache: ICache;
  //本地储存的key前缀
  private keyPrefix: string;

  public itemSource = new Subject<any>();
  public item$ = this.itemSource.asObservable();

  constructor() {
    this.cache = Object.create( null );
    this.keyPrefix = "storage-";
    window.addEventListener("storage", this.handleStorageEvent);
  }

  //处理storage事件
  private handleStorageEvent = ( event: StorageEvent ) : void => {
	//若储存在storage中的key以非keyPrefix作为前缀，则选择忽略
	if (!event.key.startsWith(this.keyPrefix)) {
		return;
	}
		//更新内存中cache的值
	if ( event.newValue === null ) {
		delete(this.cache[event.key]);
	} else {
		this.cache[event.key] = JSON.parse(event.newValue);
	}
  }
	
	//格式化key
  private normalizeKey(key: string) : string {
	 return this.keyPrefix + key;
  }
  
  //设置item
  public setItem(key: string, value: any) : void {
	let normalizeKey = this.normalizeKey( key );

	//将值储存在cache和storage中
	this.cache[normalizeKey] = value;
	localStorage.setItem(normalizeKey, JSON.stringify(value));
  }

  //获取item
  public getItem(key: string) : any {
	let normalizeKey = this.normalizeKey(key);
	//若获取的item在cache中就直接返回
	if (normalizeKey in this.cache) {
		return(this.cache[normalizeKey]);
	}
	//若不在cache中，则从storage中获取此item
	return this.cache[normalizeKey] = JSON.parse(localStorage.getItem(normalizeKey));
  }

  //清除item
  public clearItem(key: string) {
	let normalizeKey = this.normalizeKey(key);
	this.cache[normalizeKey] = null;
	localStorage.removeItem(normalizeKey);
  }
}
