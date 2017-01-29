
export const coffeesActions = {
  ADD: 'ADD',
  ADD_FAILED: 'ADD_FAILED',
  ADD_SUCCEEDED: 'ADD_SUCCEEDED',
  UPDATE_LIST: 'UPDATE_LIST',

  add: _ => ({
    type: coffeesActions.ADD,
    payload: {timestamp: new Date()}
  }),

  addSucceeded: entry => ({
    type: coffeesActions.ADD_SUCCEEDED
  }),

  addFailed: error => ({
    type: coffeesActions.ADD_FAILED,
    payload: {error}
  }),

  updateList: list => ({
    type: coffeesActions.UPDATE_LIST,
    payload: list
  })

};
