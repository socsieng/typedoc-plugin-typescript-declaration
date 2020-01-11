declare class MyIndexedClass {
  method1(): void;

  /**
   * Gets a number based on the key
   */
  [key: string]: number;

  method2(): void;
}
