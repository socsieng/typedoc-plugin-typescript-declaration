declare module Module1 {
  module Module2 {
    class Class1 {
    }
  }
}

/**
 * Outer comment
 */
declare module Module3 {
  module Module4 {
    class Class2 {
    }
  }
}

declare module Module5 {
  /**
   * Inner comment
   */
  module Module6 {
    class Class3 {
    }
  }
}

/**
 * Outer comment
 */
declare module Module7 {
  /**
   * Inner comment
   */
  module Module8 {
    class Class4 {
    }
  }
}

/**
 * Same comment
 */
declare module Module9 {
  /**
   * Same comment
   */
  module Module10 {
    class Class5 {
    }
  }
}

/**
 * Outer comment
 */
declare module Module11 {
  module Module12 {
    /**
     * Inner comment
     */
    module Module13 {
      class Class6 {
      }
    }
  }
}

declare module Module14 {
  module Module15 {
    class Class7 {
    }
  }
  module Module16 {
    class Class8 {
    }
  }
}
