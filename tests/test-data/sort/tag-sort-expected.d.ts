/**
 * @sortoption container
 */
declare namespace Module {
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

  namespace Module {
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
    namespace ModuleA {
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
    namespace ModuleB {
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
  }
}
