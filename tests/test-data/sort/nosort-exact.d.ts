declare module ModuleB {
  class ClassA {
    propA: number;

    propB: number;
  }

  class ClassB {
    propB: number;

    propA: number;
  }
}

declare module ModuleA {
  class ClassB {
    propB: number;

    propA: number;
  }

  class ClassA {
    propA: number;

    propB: number;
  }
}