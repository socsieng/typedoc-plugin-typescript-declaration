import { Application, BindOption, DeclarationOption, Options } from 'typedoc';

export function bind<K>(name: string):
  <IK extends PropertyKey>(target: ({ application: Application } | { options: Options }) & { [K2 in IK]: K }, key: IK) => void;
  export function bind<K>(name: DeclarationOption):
  <IK extends PropertyKey>(target: ({ application: Application } | { options: Options }) & { [K2 in IK]: K }, key: IK) => void;

export function bind<K>(option: string | DeclarationOption):
  <IK extends PropertyKey>(target: ({ application: Application } | { options: Options }) & { [K2 in IK]: K }, key: IK) => void {

  if (typeof option === 'string') {
    return BindOption(option);
  }
  return BindOption(option.name);
}
