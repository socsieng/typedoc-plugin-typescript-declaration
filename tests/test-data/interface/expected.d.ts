/**
 * Options interface
 */
interface Options {
  onClick?: (event?: Event) => void;

  /**
   * @default "red"
   */
  color?: "red" | "green" | "blue" | string;

  /**
   * @default "long"
   */
  type: "long" | "short";
}