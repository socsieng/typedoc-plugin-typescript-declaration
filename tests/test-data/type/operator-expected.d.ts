declare module test {
  type StatusType = keyof StatusTypes;

  type StatusTypes = {
    /**
     * Success
     */
    success: string;
    /**
     * Failure
     */
    failure: string;
  }

  /**
   * Options:
   *
   * - `on`:
   *   Represents the on state.
   *
   *   Examples of things that can be turned on:
   *
   *   - light
   *   - kettle
   *
   * - `off`:
   *   Represents the off state.
   *
   *   Examples of things that can be turned off:
   *
   *   - switch
   *   - television
   */
  type DynamicType = "on" | "off";

  type Reference = "on" | "off";
}
