export module test {
  /**
   * Adds two numbers together
   */
  function add(a: number, b: number): number;
  /**
   * Adds many numbers together
   */
  function add(a: number, ...numbers: number[]): number;
  function add(...numbers: number[]) {
    return numbers.reduce((total, current) => total + current, 0);
  }
}
