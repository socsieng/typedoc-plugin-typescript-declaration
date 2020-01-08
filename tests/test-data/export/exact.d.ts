/**
 * Export test
 */
declare module ExportTest {
  export class ExportedClass {
    private doSomethingPrivate(): void;

    public doSomethingPublic(): void;
  }

  class NotExportedClass {
    private doSomethingPrivate(): void;

    public doSomethingPublic(): void;
  }

  export type ExportType = "exported" | "not exported";

  export type ExportOptions = {
    isExported: boolean;
    shouldExport: () => boolean;
  }
}
