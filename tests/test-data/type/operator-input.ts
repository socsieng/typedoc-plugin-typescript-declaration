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
    on: string,
    off: string,
  };

  /**
   * Should leave these keys tag alone
   *
   * @keys on | off
   * | ON | OFF
   */
  export type LeaveThisAlone = keyof {
    /**
     * Turns stuff on
     */
    on: string,
    /**
     * Turns stuff off
     */
    off: string,
  };

  export type Reference = "on" | "off";
}
