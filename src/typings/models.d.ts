declare interface IDvaModel<S = any, A = any> {
  namespace: string;
  state: S;
  effects?: Record<string, any>;
  reducers?: Record<string, (state: S, action: A) => S>;
  [x: string]: any;
}

declare type ActionWithPayload<P = any> = {
  type: string;
  payload: P;
};

declare type ActionKey<M extends IDvaModel = IDvaModel> =
  | keyof M['effects']
  | keyof M['reducers'];

declare type DvaEffect<P = any, R = any> = (
  action: ActionWithPayload<P>,
  io: any,
) => Generator<R, any, unknown>;

declare type io = any;

declare type DvaReducers<S = any, P = any> = (
  state: S,
  action: ActionWithPayload<P>,
) => S;

declare type DvaPayload<
  M extends IDvaModel,
  T extends ActionKey<M>,
> = M['effects'][T] extends DvaEffect<infer P, any>
  ? P
  : M['reducers'][T] extends DvaReducers<any, infer P>
  ? P
  : void;

declare type DvaDispatchAction<
  M extends IDvaModel,
  T extends ActionKey<M>,
> = DvaPayload<M, T> extends object
  ? (payload: DvaPayload<M, T>) => {
      type: T;
      payload: DvaPayload<M, T>;
    }
  : (unknown?: any) => {
      type: T;
    };

declare interface DispatchPromiseProp {
  dispatch: <A = any, R = any>(action: A) => PromiseLike<R>;
}

declare type createActionsType = <M extends IDvaModel>(
  model: M,
) => {
  [key in keyof (M['effects'] & M['reducers'])]: DvaDispatchAction<M, key>;
};
