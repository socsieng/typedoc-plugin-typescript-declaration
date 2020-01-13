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
   * @keys `on`, `off`
   */
  type DynamicType = keyof {
    on: string,
    off: string,
  };

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
}
