declare module CommentsTest {
  /**
   * This is the comment's short text
   *
   * And this is the long text which contains paragraphs.
   *
   * This is the other paragraph
   */
  export class MyClass {
    property: string;

    /**
     * abcdefg
     *
     * @param param description about the param here
     * which goes over multiple lines
     *
     * and includes paragraphs
     *
     * and paragraphs
     */
    doSomething(param: any): void;
  }
}