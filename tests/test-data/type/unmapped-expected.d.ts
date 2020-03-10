declare namespace Unmapped {
  class NotHidden {
    hidden: unknown;
    notHidden: NotHidden;
    newClass: unknown;
    child: unknown;
    doStuff1<T extends NotHidden | OtherClass>(param: T): void;
    doStuff2<T extends unknown & NotHidden & OtherClass>(param: T): void;
  }

  class OtherClass {
    [key: number]: unknown;
  }

  type Union1 = NotHidden;
  type Intersection1 = unknown & NotHidden;

  type Union2 = NotHidden | string;
  type Intersection2 = unknown & NotHidden & object;

  type IndexedAccess = unknown;

  function doSomething1(): unknown;
  function doSomething2(): unknown | undefined;
  function doSomething3(param: unknown): void;
  function doSomething4(param?: unknown): void;
  function doSomething5(param: unknown | undefined): void;
  function doSomething6(): unknown[];
  function doSomething7(): Array<unknown>;
  function doSomething8(): Array<NotHidden>;
  function doSomething9(): Array<unknown | undefined>;
  function doSomething10(): Array<unknown | null>;
  function doSomething11(): Array<unknown & NotHidden>;
  function doSomething12<T extends unknown>(): void;
  function doSomething13<T extends unknown>(): void;
  function doSomething14<T>(param: T): T extends unknown ? true : false;
  function doSomething15(param: any): param is unknown;
  function doSomething16(param: { [key: string]: unknown }): void;
  function doSomething17(): [unknown | undefined, unknown];
  function doSomething18(param: {}): [unknown | undefined, unknown];
  function doSomething19(): unknown | undefined | null;
  function doSomething20(): undefined | null | unknown;
}