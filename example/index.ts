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

  export type MoveType = keyof {
    crawl: string,
    walk: string,
    swim: string,
    fly: string,
  }

  export type AnimalProperty = keyof Animal;

  /**
   * Base class for animals
   */
  abstract class Animal {
    abstract diet: Diet;
    /**
     * Moves the animal to the desired position
     *
     * @param position Desired position
     */
    move(position: Position) {};
  }

  /**
   * A bird is a type of [[Animal]]
   */
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
