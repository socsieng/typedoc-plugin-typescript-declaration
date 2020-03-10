export namespace test {
  /**
   * Adds many numbers together
   */
  export function add({ numbers }: { numbers: number[]}) {
    return numbers.reduce((total, current) => total + current, 0);
  }

  export function addTwo([a, b]: [number, number]) {
    return a + b;
  }
}
