declare module test {
  /**
   * Adds many numbers together
   */
  function add({ numbers }: { numbers: number[] }): number;

  function addTwo(__param1: [number, number]): number;
}
