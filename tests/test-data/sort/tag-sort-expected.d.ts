/**
 * @sortoption container
 */
declare module Module {
  /**
   * @sortoption leaf
   */
  class ClassA {
    propA: number;

    propB: number;

    propC: number;
  }

  class ClassB {
    propB: number;

    propA: number;
  }

  module Module {
    class ClassA {
      propA: number;

      propC: number;

      propB: number;
    }

    class ClassB {
      propB: number;

      propA: number;
    }

    /**
     * @sortoption leaf
     */
    module ModuleA {
      class ClassB {
        propA: number;

        propB: number;
      }

      class ClassA {
        propA: number;

        propB: number;

        propC: number;
      }
    }

    /**
     * @sortoption all
     */
    module ModuleB {
      class ClassA {
        propA: number;

        propB: number;

        propC: number;
      }

      class ClassB {
        propA: number;

        propB: number;
      }
    }

    /**
     * @sortoption none
     */
    module ModuleC {
      class ClassB {
        propB: number;

        propA: number;
      }

      class ClassA {
        propA: number;

        propC: number;

        propB: number;
      }
    }
  }
}
