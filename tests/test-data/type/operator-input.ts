export module test {
  export type StatusType = keyof StatusTypes;
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
   * @inline
   */
  export type DynamicType = keyof {
    /**
     * Represents the on state.
     *
     * Examples of things that can be turned on:
     *
     * - light
     * - kettle
     */
    on: string,
    /**
     * Represents the off state.
     *
     * Examples of things that can be turned off:
     *
     * - switch
     * - television
     */
    off: string,
  };

  export type Reference = "on" | "off";
}
