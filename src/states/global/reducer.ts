export interface GlobalState {
  readonly backendUrl: string;
}

const INITIAL_STATE = {
  backendUrl: ""
};

export function global(
  state: GlobalState = INITIAL_STATE,
  _: any
): GlobalState {
  return state;
}
