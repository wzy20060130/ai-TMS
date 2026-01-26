// src/global.d.ts
import type { AxiosInstance } from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    // 声明全局 $http 的类型
    $http: AxiosInstance;
  }
}

// 必须导出空对象，否则 TS 会报错
export {};
