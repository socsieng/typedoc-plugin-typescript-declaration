declare namespace test {
  /**
   * Adds two numbers together
   */
  function add(a: number, b: number): number;
  /**
   * Adds many numbers together
   */
  function add(a: number, ...numbers: number[]): number;
}