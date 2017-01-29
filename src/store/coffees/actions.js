
export const coffeesActions = {
  ADD: 'ADD',
  ADD_FAILED: 'ADD_FAILED',
  ADD_SUCCEEDED: 'ADD_SUCCEEDED',

  add: _ => ({
    type: coffeesActions.ADD,
    payload: {timestamp: new Date()}
  }),

  addSucceeded: entry => ({
    type: coffeesActions.ADD_SUCCEEDED,
    payload: {entry}
  }),

  addFailed: error => ({
    type: coffeesActions.ADD_FAILED,
    payload: {error}
  })

};
