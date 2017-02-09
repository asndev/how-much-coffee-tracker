export const coffeesActions = {
  ADD: 'ADD',
  ADD_FAILED: 'ADD_FAILED',
  ADD_SUCCEEDED: 'ADD_SUCCEEDED',
  UPDATE_LIST: 'UPDATE_LIST',
  REMOVE: 'REMOVE',
  REMOVE_SUCCEEDED: 'REMOVE_SUCCEEDED',
  REMOVE_FAILED: 'REMOVED_FAILED',
  add: () => ({
    type: coffeesActions.ADD,
    payload: { timestamp: new Date() }
  }),
  addSucceeded: () => ({
    type: coffeesActions.ADD_SUCCEEDED
  }),
  addFailed: error => ({
    type: coffeesActions.ADD_FAILED,
    payload: { error }
  }),
  remove: id => ({
    type: coffeesActions.REMOVE,
    payload: { id }
  }),
  removeSucceeded: () => ({
    type: coffeesActions.REMOVE_SUCCEEDED
  }),
  removeFailed: error => ({
    type: coffeesActions.REMOVE_FAILED,
    payload: { error }
  }),
  updateList: list => ({
    type: coffeesActions.UPDATE_LIST,
    payload: list
  })
};
