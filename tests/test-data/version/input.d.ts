/**
 * Tests that versions are stripped out correctly
 *
 * Note that tests run with a max version of 1.0
 */
declare module VersionTest {
  /**
   * @since 0.1
   */
  module OldModule {
    function doSomething(): void;
    /**
     * @since 1.0
     */
    function doSomething(...args: any[]): void;
  }

  /**
   * @since 1.0
   */
  module ExistingModule {
    /**
     * @since 1.0
     */
    function doSomething(): void;
    /**
     * @since 1.1
     */
    function doSomething(...args: any[]): void;

    /**
     * @since 1.1
     */
    function doSomethingElse(): void;
  }

  /**
   * @since 1.1
   */
  module NewModule {
    function doSomething(): void;
  }

  /**
   * @since 1.1
   */
  type Modes = "on" | "off";

  /**
   * @since 1.1
   */
  class MyClass {
  }
}