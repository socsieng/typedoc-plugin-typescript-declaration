/**
 * This is a test enum
 */
export enum MyEnum {
  head,
  shoulder = 'shoulder',
  knee = 2,
  toe = 5,
}

export type MyEnumStrings = keyof typeof MyEnum;
