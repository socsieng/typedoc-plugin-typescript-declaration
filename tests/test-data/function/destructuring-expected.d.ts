declare module test {
  /**
   * Adds many numbers together
   */
  export function add({ numbers }: { numbers: number[] }): number;

  export function addTwo(__param1: [number, number]): number;
}
