/**
 * @sortoption container
 */
declare module Module {
  module Module {
    class ClassB {
      propB: number;

      propA: number;
    }

    /**
     * @sortoption all
     */
    module ModuleB {
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

    /**
     * @sortoption leaf
     */
    module ModuleA {
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

    class ClassA {
      propA: number;

      propC: number;

      propB: number;
    }
  }

  class ClassB {
    propB: number;

    propA: number;
  }

  /**
   * @sortoption leaf
   */
  class ClassA {
    propA: number;

    propC: number;

    propB: number;
  }
}
