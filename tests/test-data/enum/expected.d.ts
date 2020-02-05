/**
 * This is a test enum
 */
declare enum MyEnum {
  head,
  shoulder = "shoulder",
  knee = 2,
  toe = 5,
}

declare type MyEnumStrings = keyof typeof MyEnum;
