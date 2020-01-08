/**
 * This is a class called MyClass
 */
declare class MyClass {
  /**
   * This counter keeps track of the number of times the class has been instantiated
   */
  private static _counter: number;

  private _instanceId: number;

  public constructor();

  toString(): string;

  /**
   * @since 1.0
   */
  existingMethod(): string;

  public get instanceId(): number;
  public set instanceId(value: number);
}