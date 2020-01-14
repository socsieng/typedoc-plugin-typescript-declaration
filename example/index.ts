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

  /**
   * Different ways an animal might move
   *
   * @inline
   */
  export type MoveType = keyof {
    /**
     * Crawl like a baby
     */
    crawl: string,
    /**
     * Walk like a man
     */
    walk: string,
    /**
     * Swim like a fish
     *
     * Or a shark
     * or even a whale
     */
    swim: string,
    /**
     * Fly like a bird
     *
     * @since 2.1
     */
    fly: string,
  }

  /**
   * @inline
   */
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
