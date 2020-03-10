/**
 * @sortoption container
 */
declare namespace Module {
  namespace Module {
    class ClassB {
      propB: number;

      propA: number;
    }

    /**
     * @sortoption all
     */
    namespace ModuleB {
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
    namespace ModuleA {
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
    namespace ModuleC {
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
