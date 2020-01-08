# typedoc-plugin-typescript-declaration

This is a Typedoc plugin that renders a TypeScript declaration file.

## Installation

```sh
npm install typedoc typedoc-plugin-typescript-declaration --save-dev
```

## Usage

```sh
# write declaration file
node_modules/.bin/typedoc --out docs --declarationFile docs/index.d.ts

# write declaration file for types with a max version of 1.0
node_modules/.bin/typedoc --out docs/v1.0 --declarationFile docs/v1.0/index.d.ts --maxVersion 1.0

# write declaration file for types with a max version of 2.0
node_modules/.bin/typedoc --out docs/v2.0 --declarationFile docs/v2.0/index.d.ts --maxVersion 2.0
```

## Why?

Reasons for using this plugin:

- You publish and maintain TypeScript definitions
- You have `@internal` or `@hidden` types in your documentation that you would like reflected in your type definitions
- You would like to publish multiple versions of your type definitions from a single source of truth

## Publish multiple versions

You can target multiple versions of the type definitions by using the `@since <version>` tag and suppliying a maximum version number with `--maxVersion <version>`. Any definitions tagged with a `@since` version greater than the `--maxVersion` will be filtered out.

### Example

Sample file:

```ts
export class MyClass {
  originalFunction() {}

  /**
   * @since 1.0
   */
  newFunction() {}

  /**
   * @since 2.0
   */
  newerFunction() {}
}
```

Command:

```sh
# write declaration file for types with a max version of 1.0
node_modules/.bin/typedoc --out docs/v1.0 --declarationFile docs/v1.0/index.d.ts --maxVersion 1.0

# write declaration file for types with a max version of 2.0
node_modules/.bin/typedoc --out docs/v2.0 --declarationFile docs/v2.0/index.d.ts --maxVersion 2.0
```
