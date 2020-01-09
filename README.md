# typedoc-plugin-typescript-declaration

[![Build Status](https://travis-ci.org/socsieng/typedoc-plugin-typescript-declaration.svg?branch=master)](https://travis-ci.org/socsieng/typedoc-plugin-typescript-declaration)

This is a Typedoc plugin that renders a TypeScript declaration file.

## Installation

```sh
npm install typedoc typedoc-plugin-typescript-declaration --save-dev
```

## Usage

Used as a plugin with Typedoc:

```sh
# generate Typedoc documentation as well as the type declaration
node_modules/.bin/typedoc --out docs --declarationFile docs/index.d.ts

# generate type declaration file without Typedoc documentation (omit --out, or inclue --declarationOnly)
node_modules/.bin/typedoc --declarationFile docs/index.d.ts

# generate type declaration file for a specific file
# node_modules/.bin/typedoc --declarationFile <output-file> [file]
node_modules/.bin/typedoc --declarationFile docs/index.d.ts src/index.ts

# write declaration file for types with a max version of 1.0
node_modules/.bin/typedoc --out docs/v1.0 --declarationFile docs/v1.0/index.d.ts --maxVersion 1.0

# write declaration file for types with a max version of 2.0
node_modules/.bin/typedoc --out docs/v2.0 --declarationFile docs/v2.0/index.d.ts --maxVersion 2.0
```

Used as a stand alone cli (works with the same options above):

```sh
# using npx
npx typedoc-plugin-typescript-declaration --declarationFile index.d.ts

# optionally install this package globally
npm install --global typedoc-plugin-typescript-declaration

# generate type declaration file with max version 2.0
node_modules/.bin/typedoc-declaration --declarationFile index.d.ts --maxVersion 2.0
# when installed globally
typedoc-declaration --declarationFile index.d.ts --maxVersion 2.0
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
node_modules/.bin/typedoc --declarationFile docs/v1.0/index.d.ts --maxVersion 1.0

# write declaration file for types with a max version of 2.0
node_modules/.bin/typedoc --declarationFile docs/v2.0/index.d.ts --maxVersion 2.0
```
