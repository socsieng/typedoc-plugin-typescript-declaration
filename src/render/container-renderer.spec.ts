import { Comment, DeclarationReflection, IntrinsicType, ParameterReflection, ReflectionFlag, ReflectionKind, SignatureReflection } from 'typedoc/dist/lib/models';
import ContainerRenderer from './container-renderer';

it('should render basic class', () => {
  const renderer = new ContainerRenderer('class');
  const node = new DeclarationReflection('MyClass', ReflectionKind.Class);

  node.comment = new Comment('Signature short text');

  expect(renderer.render(node)).toEqual(`/**
 * Signature short text
 */
declare class MyClass {
}`
  );
});

it('should render basic class without comment', () => {
  const renderer = new ContainerRenderer('class');
  const node = new DeclarationReflection('MyClass', ReflectionKind.Class);

  expect(renderer.render(node)).toEqual(`declare class MyClass {
}`
  );
});

it('should render inherited class', () => {
  const renderer = new ContainerRenderer('class');
  const node = new DeclarationReflection('MyClass', ReflectionKind.Class);

  node.comment = new Comment('Signature short text');
  node.extendedTypes = [
    new IntrinsicType('Object'),
  ];

  expect(renderer.render(node)).toEqual(`/**
 * Signature short text
 */
declare class MyClass extends Object {
}`
  );
});

it('should render multiple inherited class', () => {
  const renderer = new ContainerRenderer('class');
  const node = new DeclarationReflection('MyClass', ReflectionKind.Class);

  node.comment = new Comment('Signature short text');
  node.extendedTypes = [
    new IntrinsicType('Object'),
    new IntrinsicType('Other'),
    new IntrinsicType('Another'),
  ];

  expect(renderer.render(node)).toEqual(`/**
 * Signature short text
 */
declare class MyClass extends Object implements Other, Another {
}`
  );
});

it('should render class with method', () => {
  const renderer = new ContainerRenderer('class');
  const node = new DeclarationReflection('MyClass', ReflectionKind.Class);

  node.comment = new Comment('Signature short text');

  const method = new DeclarationReflection('create', ReflectionKind.Method, node);
  node.children = [
    method,
  ];

  const sig = new SignatureReflection('create', ReflectionKind.CallSignature, method);
  method.signatures = [
    sig,
  ];

  const param = new ParameterReflection('name', ReflectionKind.Parameter, sig);
  sig.parameters = [
    param,
  ];

  sig.type = new IntrinsicType('void');

  param.type = new IntrinsicType('string');

  expect(renderer.render(node)).toEqual(`/**
 * Signature short text
 */
declare class MyClass {
  create(name: string): void;
}`
  );
});

it('should render class with method with comment', () => {
  const renderer = new ContainerRenderer('class');
  const node = new DeclarationReflection('MyClass', ReflectionKind.Class);

  node.comment = new Comment('Signature short text');

  const method = new DeclarationReflection('create', ReflectionKind.Method, node);
  node.children = [
    method,
  ];
  method.comment = new Comment('Short method comment');

  const sig = new SignatureReflection('create', ReflectionKind.CallSignature, method);
  method.signatures = [
    sig,
  ];
  sig.comment = new Comment('Short method comment');

  const param = new ParameterReflection('name', ReflectionKind.Parameter, sig);
  sig.parameters = [
    param,
  ];

  sig.type = new IntrinsicType('void');

  param.type = new IntrinsicType('string');

  expect(renderer.render(node)).toEqual(`/**
 * Signature short text
 */
declare class MyClass {
  /**
   * Short method comment
   */
  create(name: string): void;
}`
  );
});

it('should render class with method overloads', () => {
  const renderer = new ContainerRenderer('class');
  const node = new DeclarationReflection('MyClass', ReflectionKind.Class);

  const method = new DeclarationReflection('create', ReflectionKind.Method, node);
  node.children = [
    method,
  ];

  const sig1 = new SignatureReflection('create', ReflectionKind.CallSignature, method);
  const param1 = new ParameterReflection('name', ReflectionKind.Parameter, sig1);
  sig1.parameters = [
    param1,
  ];
  sig1.type = new IntrinsicType('void');
  param1.type = new IntrinsicType('string');

  const sig2 = new SignatureReflection('create', ReflectionKind.CallSignature, method);
  const param2 = new ParameterReflection('num', ReflectionKind.Parameter, sig1);
  sig2.parameters = [
    param2,
  ];
  sig2.type = new IntrinsicType('any');
  param2.type = new IntrinsicType('number');

  method.signatures = [
    sig1,
    sig2,
  ];

  expect(renderer.render(node)).toEqual(`declare class MyClass {
  create(name: string): void;
  create(num: number): any;
}`
  );
});

it('should render class with constructor', () => {
  const renderer = new ContainerRenderer('class');
  const node = new DeclarationReflection('MyClass', ReflectionKind.Class);

  const method = new DeclarationReflection('constructor', ReflectionKind.Constructor, node);
  node.children = [
    method,
  ];

  const sig1 = new SignatureReflection('new MyClass', ReflectionKind.ConstructorSignature, method);
  const param1 = new ParameterReflection('name', ReflectionKind.Parameter, sig1);
  sig1.parameters = [
    param1,
  ];
  sig1.type = new IntrinsicType('void');
  param1.type = new IntrinsicType('string');

  method.signatures = [
    sig1,
  ];

  expect(renderer.render(node)).toEqual(`declare class MyClass {
  constructor(name: string);
}`
  );
});

it('should render class with private constructor', () => {
  const renderer = new ContainerRenderer('class');
  const node = new DeclarationReflection('MyClass', ReflectionKind.Class);

  const method = new DeclarationReflection('constructor', ReflectionKind.Constructor, node);
  node.children = [
    method,
  ];
  method.flags.setFlag(ReflectionFlag.Private, true);

  const sig1 = new SignatureReflection('new MyClass', ReflectionKind.ConstructorSignature, method);
  const param1 = new ParameterReflection('name', ReflectionKind.Parameter, sig1);
  sig1.parameters = [
    param1,
  ];
  sig1.flags.setFlag(ReflectionFlag.Private, true);
  sig1.type = new IntrinsicType('void');
  param1.type = new IntrinsicType('string');

  method.signatures = [
    sig1,
  ];

  expect(renderer.render(node)).toEqual(`declare class MyClass {
  private constructor(name: string);
}`
  );
});
