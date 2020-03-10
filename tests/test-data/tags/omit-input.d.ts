declare namespace TagsTest {
  /**
   * @stuff
   */
  function hasTagThatShouldBeRemoved(): void;

  /**
   * Comment
   *
   * @stuff
   */
 function hasTagWithCommentThatShouldBeRemoved(): void;

  /**
   * Comment
   *
   * @other
   * @stuff
   */
  function hasOtherTagWithCommentThatShouldBeRemoved(): void;
}