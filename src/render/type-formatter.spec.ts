import { ArrayType, ConditionalType, IndexedAccessType, IntrinsicType, PredicateType, ReferenceType, TypeOperatorType, TypeParameterType, UnionType } from 'typedoc/dist/lib/models';
import TypeFormatter from './type-formatter';

it('should format intrinsic type', () => {
  const type = new IntrinsicType('string');
  expect(TypeFormatter.format(type)).toEqual('string');
});

it('should format reference type', () => {
  const type = new ReferenceType('string', 0);
  expect(TypeFormatter.format(type)).toEqual('string');
});

it('should format reference type with generics', () => {
  const type = new ReferenceType('Array', 0);
  type.typeArguments = [
    new IntrinsicType('string'),
  ];
  expect(TypeFormatter.format(type)).toEqual('Array<string>');
});

it('should format union type', () => {
  const type = new UnionType([
    new IntrinsicType('string'),
    new IntrinsicType('number'),
  ]);
  expect(TypeFormatter.format(type)).toEqual('string | number');
});

it('should format generics with union type', () => {
  const type = new ReferenceType('Array', 0);
  type.typeArguments = [
    new UnionType([
      new IntrinsicType('string'),
      new IntrinsicType('number'),
    ]),
  ];
  expect(TypeFormatter.format(type)).toEqual('Array<string | number>');
});

it('should format array type', () => {
  const type = new ArrayType(new IntrinsicType('string'));
  expect(TypeFormatter.format(type)).toEqual('string[]');
});

it('should format type operator type', () => {
  const type = new TypeOperatorType(new IntrinsicType('MyClass'));
  expect(TypeFormatter.format(type)).toEqual('keyof MyClass');
});

it('should format conditional type', () => {
  const type = new ConditionalType(
    new IntrinsicType('T'), // check type
    new IntrinsicType('object'), // extends type
    new IntrinsicType('string'), // true type
    new IntrinsicType('number'), // false type
  );
  expect(TypeFormatter.format(type)).toEqual('T extends object ? string : number');
});

it('should format indexed access type', () => {
  const type = new IndexedAccessType(
    new IntrinsicType('object'), // object type
    new IntrinsicType('string'), // index type
  );
  expect(TypeFormatter.format(type)).toEqual('{ [key: string]: object }');
});

it('should format predecate type', () => {
  const type = new PredicateType('param', true, new IntrinsicType('string'));
  expect(TypeFormatter.format(type)).toEqual('param is string');
});

it('should format type parameter type', () => {
  const type = new TypeParameterType('T');
  type.constraint = new ReferenceType('MyClass', 0);
  expect(TypeFormatter.format(type)).toEqual('T extends MyClass');
});
