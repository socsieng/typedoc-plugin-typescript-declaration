declare module test {
  /**
   * @keys [[StatusTypes.success|`success`]], [[StatusTypes.failure|`failure`]]
   */
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
   *
   * @keys `on`, `off`
   */
  type DynamicType = "on" | "off";

  /**
   * Should leave these keys tag alone
   *
   * @keys on | off
   * | ON | OFF
   */
  type LeaveThisAlone = keyof {
    /**
     * Turns stuff on
     */
    on: string,
    /**
     * Turns stuff off
     */
    off: string,
  };

  type Reference = "on" | "off";
}
