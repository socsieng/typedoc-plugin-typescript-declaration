/**
 * This is a class called MyClass
 */
export default class MyClass {
  /**
   * This counter keeps track of the number of times the class has been instantiated
   */
  private static _counter: number = 0;

  private _instanceId: number;

  private _name!: string;

  public constructor() {
    this._instanceId = MyClass._counter++;
  }

  toString(): string {
    return this._name;
  }

  /**
   * @since 1.0
   */
  existingMethod(): string {
    return '';
  }

  /**
   * @since 2.0
   */
  newMethod(): string {
    return '';
  }

  public get instanceId(): number {
    return this._instanceId;
  }
  public set instanceId(value: number) {
    this._instanceId = value;
  }
}
