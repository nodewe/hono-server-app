declare module 'ws' {
  export class WebSocket extends EventTarget {
    constructor(url: string, protocols?: string | string[]);

    send(data: string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView): void;
    close(code?: number, reason?: string): void;
    
  }

  export = WebSocket;
}