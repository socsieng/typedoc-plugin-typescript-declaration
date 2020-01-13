declare module "background-http" {
  /**
   * Encapsulates some information for background http transfers.
   */
  interface Task {
    /**
     * Subscribe for a general event by name.
     *
     * @event
     *
     * @param event The name of the event to subscribe for.
     * @param handler The handler called when the event occure.
     */
    on(event: string, handler: (e: observable.EventData) => void): void;
    /**
     * Subscribe for error notifications.
     *
     * @param event The name of the event to subscribe for.
     * @param handler A handler that will receive the error details
     */
    on(event: "error", handler: (e: ErrorEventData) => void): void;
    /**
     * Subscribe for progress notifications.
     *
     * @param event The name of the event to subscribe for.
     * @param handler A handler that will receive a progress event with the current and expected total bytes
     */
    on(event: "progress", handler: (e: ProgressEventData) => void): void;
    /**
     * Subscribe for success notification.
     *
     * @param event The name of the event to subscribe for.
     * @param handler A function that will be called with general event data upon successful completion
     */
    on(event: "complete", handler: (e: observable.EventData) => void): void;
  }
}