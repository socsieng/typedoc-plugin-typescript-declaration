/**
 * Tests that versions are stripped out correctly
 *
 * Note that tests run with a max version of 1.0
 */
declare namespace VersionTest {
  /**
   * @since 0.1
   */
  namespace OldModule {
    function doSomething(): void;
    /**
     * @since 1.0
     */
    function doSomething(...args: any[]): void;
  }

  /**
   * @since 1.0
   */
  namespace ExistingModule {
    /**
     * @since 1.0
     */
    function doSomething(): void;
  }
}