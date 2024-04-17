import { useLocalObservable } from 'mobx-react-lite';

export type LocalVm = HasMethodOnRender<unknown>;
export type VmType<T, P = unknown> = new (props: P) => T;

type HasMethodOnRender<P> = { onRender(props?: P): void };
type ParameterlessFactory<T> = () => T;
type Factory = <T, P = unknown>(
  type: VmType<T, P>,
  props: P,
) => ParameterlessFactory<T>;

const getVmFactory: Factory = <T, P = unknown>(
  type: VmType<T, P>,
  props: P,
): ParameterlessFactory<T> => {
  return () => new type(props);
};

export const useLocalVm = <
  T extends HasMethodOnRender<Partial<P>>,
  P = unknown,
>(
  type: VmType<T, P>,
  props?: P,
) => {
  const vmFactory = props
    ? getVmFactory(type, props)
    : getVmFactory(type as VmType<T>, {});
  const observableVm = useLocalObservable(vmFactory);
  observableVm.onRender();

  return observableVm;
};
