export namespace test {
  /**
   * Adds two numbers together
   */
  export function add(a: number, b: number): number;
  /**
   * Adds many numbers together
   */
  export function add(a: number, ...numbers: number[]): number;
  export function add(...numbers: number[]) {
    return numbers.reduce((total, current) => total + current, 0);
  }
}
