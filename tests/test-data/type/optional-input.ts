declare interface Optionals {
  myBool?: boolean;
  myString?: string;
  myNumber?: number;

  otherBool1?: true | false;
  otherBool2?: false | true;
  otherBoolUnion1?: false | string | true;
  otherBoolUnion2?: string | true | false | undefined;
}
