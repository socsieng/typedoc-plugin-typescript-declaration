module test {
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
}
