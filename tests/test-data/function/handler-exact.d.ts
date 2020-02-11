declare module Handlers {
  type MyUncommentedHandler = (foo: any) => any;

  /**
   * My comment
   */
  type MyCommentedHandler =
    /**
     * Handler comment
     *
     * @param foo can be anything
     */
    (foo: any) => any;
}