namespace Example {
  interface Position {
    x: number;
    y: number;
  }

  enum Diet {
    /**
     * @since 2.1
     */
    unkown = 0,
    plant = 1,
    animal = 2,
    everything = 3,
  }

  abstract class Animal {
    abstract diet: Diet;
    move(position: Position) {};
  }

  export class Bird extends Animal {
    diet = Diet.everything;
  }

  export class Fish extends Animal {
    diet = Diet.animal;
  }

  export class Horse extends Animal {
    diet = Diet.plant;
  }

  /**
   * @since 2.1
   */
  export class Farm {
    animals: Animal[] = [];
  }
}
