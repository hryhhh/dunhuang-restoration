/**
 * @file cache.ts
 * @description
 * 本文件提供了一个用于浏览器 sessionStorage 和 localStorage 的缓存工具。
 * 主要作用是存储和管理应用程序中的数据，以便在页面刷新或关闭后仍能保持数据的持久性。
 * 它封装了常见的操作，如设置、获取、设置JSON对象、获取JSON对象以及移除缓存项。
 * 同时，它提供了类型安全和错误处理机制。
 *
 * 主要导出两个对象：
 * - `session`: 用于操作 sessionStorage。
 * - `local`: 用于操作 localStorage。
 *
 * 每个缓存对象都实现了 StorageCache 接口，包含以下方法：
 * - `set(key: string, value: string)`: 设置缓存项。
 * - `get(key: string)`: 获取缓存项。
 * - `setJSON<T = any>(key: string, jsonValue: T)`: 设置JSON对象缓存项。
 * - `getJSON<T = any>(key: string)`: 获取JSON对象缓存项。
 */

interface StorageCache {
  set(key: string, value: string): void;
  get(key: string): string | null;
  setJSON<T = any>(key: string, jsonValue: T): void;
  getJSON<T = any>(key: string): T | null;
  remove(key: string): void;
}

const sessionCache: StorageCache = {
  set(key: string, value: string): void {
    if (!sessionStorage) {
      console.warn('SessionStorage is not available.');
      return;
    }
    if (key != null && value != null) {
      sessionStorage.setItem(key, value);
    }
  },
  get(key: string): string | null {
    if (!sessionStorage) {
      console.warn('SessionStorage is not available.');
      return null;
    }
    if (key == null) {
      return null;
    }
    return sessionStorage.getItem(key);
  },
  setJSON<T = any>(key: string, jsonValue: T): void {
    if (jsonValue != null) {
      try {
        this.set(key, JSON.stringify(jsonValue));
      } catch (error) {
        console.error(`Error stringifying JSON for sessionStorage with key "${key}":`, error);
      }
    }
  },
  getJSON<T = any>(key: string): T | null {
    const value = this.get(key);
    if (value != null) {
      try {
        return JSON.parse(value) as T;
      } catch (error) {
        console.error(`Error parsing JSON from sessionStorage with key "${key}":`, error);
        return null;
      }
    }
    return null;
  },
  remove(key: string): void {
    if (!sessionStorage) {
      console.warn('SessionStorage is not available.');
      return;
    }
    sessionStorage.removeItem(key);
  },
};

const localCache: StorageCache = {
  set(key: string, value: string): void {
    if (!localStorage) {
      console.warn('LocalStorage is not available.');
      return;
    }
    if (key != null && value != null) {
      localStorage.setItem(key, value);
    }
  },
  get(key: string): string | null {
    if (!localStorage) {
      console.warn('LocalStorage is not available.');
      return null;
    }
    if (key == null) {
      return null;
    }
    return localStorage.getItem(key);
  },
  setJSON<T = any>(key: string, jsonValue: T): void {
    if (jsonValue != null) {
      try {
        this.set(key, JSON.stringify(jsonValue));
      } catch (error) {
        console.error(`Error stringifying JSON for localStorage with key "${key}":`, error);
      }
    }
  },
  getJSON<T = any>(key: string): T | null {
    const value = this.get(key);
    if (value != null) {
      try {
        return JSON.parse(value) as T;
      } catch (error) {
        console.error(`Error parsing JSON from localStorage with key "${key}":`, error);
        return null;
      }
    }
    return null;
  },
  remove(key: string): void {
    if (!localStorage) {
      console.warn('LocalStorage is not available.');
      return;
    }
    localStorage.removeItem(key);
  },
};

export default {
  /**
   * 会话级缓存
   */
  session: sessionCache,
  /**
   * 本地缓存
   */
  local: localCache,
};
