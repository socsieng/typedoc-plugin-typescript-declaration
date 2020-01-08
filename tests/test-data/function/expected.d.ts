declare module test {
  /**
   * Adds two numbers together
   */
  export function add(a: number, b: number): number;
  /**
   * Adds many numbers together
   */
  export function add(a: number, ...numbers: number[]): number;
}