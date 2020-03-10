declare namespace Unmapped {
  /**
   * @hidden
  */
  class Hidden {
  }

  /**
   * @since 2.0
  */
  class NewClass {
  }

  class NotHidden extends Hidden {
    hidden: Hidden;
    notHidden: NotHidden;
    newClass: NewClass;
    child: NewModule.MyChild;
    doStuff1<T extends Hidden | NotHidden | OtherClass>(param: T): void;
    doStuff2<T extends Hidden & NotHidden & OtherClass>(param: T): void;
  }

  class OtherClass {
    [key: number]: Hidden;
  }

  /**
   * @since 2.0
   */
  namespace NewModule {
    type MyChild = "good" | "bad";
  }

  type Union1 = Hidden | NotHidden;
  type Intersection1 = Hidden & NotHidden;

  type Union2 = Hidden | NotHidden | string;
  type Intersection2 = Hidden & NotHidden & object;

  type IndexedAccess = Hidden["toString"];

  function doSomething1(): Hidden;
  function doSomething2(): Hidden | undefined;
  function doSomething3(param: Hidden): void;
  function doSomething4(param?: Hidden): void;
  function doSomething5(param: Hidden | undefined): void;
  function doSomething6(): Hidden[];
  function doSomething7(): Array<Hidden>;
  function doSomething8(): Array<Hidden | NotHidden>;
  function doSomething9(): Array<Hidden | undefined>;
  function doSomething10(): Array<Hidden | null>;
  function doSomething11(): Array<Hidden & NotHidden>;
  function doSomething12<T extends Hidden>(): void;
  function doSomething13<T extends keyof Hidden>(): void;
  function doSomething14<T>(param: T): T extends Hidden ? true : false;
  function doSomething15(param: any): param is Hidden;
  function doSomething16(param: { [key: string]: Hidden }): void;
  function doSomething17(): [Hidden | undefined, Hidden];
  function doSomething18(param: {}): [Hidden | undefined, Hidden];
  function doSomething19(): Hidden | undefined | null;
  function doSomething20(): Hidden | undefined | null | unknown;
}