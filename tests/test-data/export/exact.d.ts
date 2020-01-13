/**
 * Export test
 */
declare module ExportTest {
  class ExportedClass {
    private doSomethingPrivate(): void;

    public doSomethingPublic(): void;
  }

  class NotExportedClass {
    private doSomethingPrivate(): void;

    public doSomethingPublic(): void;
  }

  type ExportType = "exported" | "not exported";

  type ExportOptions = {
    isExported: boolean;
    shouldExport: () => boolean;
  }
}
