declare namespace Module1.Module2 {
  class Class1 {
  }
}

/**
 * Outer comment
 */
declare namespace Module3.Module4 {
  class Class2 {
  }
}

/**
 * Inner comment
 */
declare namespace Module5.Module6 {
  class Class3 {
  }
}

/**
 * Outer comment
 */
declare namespace Module7 {
  /**
   * Inner comment
   */
  namespace Module8 {
    class Class4 {
    }
  }
}

/**
 * Same comment
 */
declare namespace Module9.Module10 {
  class Class5 {
  }
}

/**
 * Outer comment
 */
declare namespace Module11.Module12 {
  /**
   * Inner comment
   */
  namespace Module13 {
    class Class6 {
    }
  }
}

declare namespace Module14 {
  namespace Module15 {
    class Class7 {
    }
  }
  namespace Module16 {
    class Class8 {
    }
  }
}
