declare namespace Types {
  interface OptionsInterface {
    parameters: {};
  }

  type OptionsAlias = {
    parameters: { param1: string, param2: string };
    items: [];
  }
}