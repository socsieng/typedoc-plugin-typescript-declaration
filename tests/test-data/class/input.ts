/**
 * This is a class called MyClass
 */
export default class MyClass {
  /**
   * This counter keeps track of the number of times the class has been instantiated
   */
  private static _counter: number = 0;

  private _instanceId: number;

  public constructor() {
    this._instanceId = MyClass._counter++;
  }

  toString(): string {
    return '';
  }

  public get instanceId(): number {
    return this._instanceId;
  }
  public set instanceId(value: number) {
    this._instanceId = value;
  }
}
