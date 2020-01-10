import { Comment, CommentTag, ParameterReflection, ReflectionKind, SignatureReflection } from 'typedoc/dist/lib/models';
import CommentRenderer from './comment-renderer';

it('should render short text only', () => {
  const renderer = new CommentRenderer();
  const node = new SignatureReflection('method', ReflectionKind.CallSignature);

  node.comment = new Comment('Signature short text');

  expect(renderer.render(node)).toEqual(`/**
 * Signature short text
 */`
  );
});

it('should short and long text', () => {
  const renderer = new CommentRenderer();
  const node = new SignatureReflection('method', ReflectionKind.CallSignature);

  node.comment = new Comment('Signature short text', 'Long text for signature');

  expect(renderer.render(node)).toEqual(`/**
 * Signature short text
 *
 * Long text for signature
 */`
  );
});

it('should short and long text with parameters', () => {
  const renderer = new CommentRenderer();
  const node = new SignatureReflection('method', ReflectionKind.CallSignature);

  node.comment = new Comment('Signature short text', 'Long text for signature');
  node.parameters = [
    new ParameterReflection('param1', ReflectionKind.Parameter),
    new ParameterReflection('param2', ReflectionKind.Parameter),
  ];

  node.parameters[1].comment = new Comment('', 'Parameter description');

  expect(renderer.render(node)).toEqual(`/**
 * Signature short text
 *
 * Long text for signature
 *
 * @param param2 Parameter description
 */`
  );
});

it('should short and long text with parameter and text', () => {
  const renderer = new CommentRenderer();
  const node = new SignatureReflection('method', ReflectionKind.CallSignature);

  node.comment = new Comment('Signature short text', 'Long text for signature');
  const param = new ParameterReflection('param1', ReflectionKind.Parameter);
  param.comment = new Comment('', 'Param 1 comment');
  node.parameters = [param];

  expect(renderer.render(node)).toEqual(`/**
 * Signature short text
 *
 * Long text for signature
 *
 * @param param1 Param 1 comment
 */`
  );
});

it('should short and long text with parameters and tags', () => {
  const renderer = new CommentRenderer();
  const node = new SignatureReflection('method', ReflectionKind.CallSignature);

  node.comment = new Comment('Signature short text', 'Long text for signature');
  node.comment.tags = [
    new CommentTag('since', '', '1.0'),
  ];
  const param = new ParameterReflection('param1', ReflectionKind.Parameter);
  param.comment = new Comment('', 'Param 1 comment');
  node.parameters = [param];

  expect(renderer.render(node)).toEqual(`/**
 * Signature short text
 *
 * Long text for signature
 *
 * @param param1 Param 1 comment
 *
 * @since 1.0
 */`
  );
});
