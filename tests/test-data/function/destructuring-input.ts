export module test {
  /**
   * Adds many numbers together
   */
  function add({ numbers }: { numbers: number[]}) {
    return numbers.reduce((total, current) => total + current, 0);
  }

  function addTwo([a, b]: [number, number]) {
    return a + b;
  }
}
