declare namespace TagsTest {
  function hasTagThatShouldBeRemoved(): void;

  /**
   * Comment
   */
  function hasTagWithCommentThatShouldBeRemoved(): void;

  /**
   * Comment
   *
   * @other
   */
  function hasOtherTagWithCommentThatShouldBeRemoved(): void;
}