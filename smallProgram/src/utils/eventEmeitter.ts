class EventEmeitter {
  _events: any;
  _maxListeners: any;
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 1000; // 设立监听上限
  }
  add(type: string, fn: Function, only?: boolean) {
    console.log('添加事件：' + type);
    const handler = this._events.get(type);
    if (!handler || only) {
      this._events.set(type, fn);
    } else if (handler && typeof handler === 'function') {
      this._events.set(type, [handler, fn]);
    } else {
      handler.push(fn);
    }
  }
  emit(type: string, ...args: any) {
    console.log('触发时间：' + type);
    let handler;
    handler = this._events.get(type);
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        if (args.length > 0) {
          handler[i] && handler[i].apply(this, args);
        } else {
          handler[i] && handler[i].call(this);
        }
      }
    } else {
      if (args.length > 0) {
        handler && handler.apply(this, args);
      } else {
        handler && handler.call(this);
      }
    }

    return true;
  }
  remove(type: string, fn: Function) {
    const handler = this._events.get(type);
    if (handler && typeof handler === 'function') {
      this._events.delete(type, fn);
    } else {
      let postion;
      for (let i = 0; i < handler.length; i++) {
        if (handler[i] === fn) {
          postion = i;
        } else {
          postion = -1;
        }
      }
      if (postion !== -1) {
        handler.splice(postion, 1);
        if (handler.length === 1) {
          this._events.set(type, handler[0]);
        }
      } else {
        return this;
      }
    }
  }
}

export default new EventEmeitter();
