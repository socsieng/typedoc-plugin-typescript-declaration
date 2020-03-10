declare namespace ModuleB {
  class ClassA {
    propA: number;

    propB: number;
  }

  class ClassB {
    propB: number;

    propA: number;
  }
}

declare namespace ModuleA {
  class ClassB {
    propB: number;

    propA: number;
  }

  class ClassA {
    propA: number;

    propB: number;
  }
}