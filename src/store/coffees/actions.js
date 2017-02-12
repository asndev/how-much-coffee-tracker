export const coffeesActions = {
  ADD: 'ADD',
  ADD_FAILED: 'ADD_FAILED',
  ADD_SUCCEEDED: 'ADD_SUCCEEDED',
  ADD_SPECIFIC: 'ADD_SPECIFIC',
  UPDATE_LIST: 'UPDATE_LIST',
  REMOVE: 'REMOVE',
  REMOVE_SUCCEEDED: 'REMOVE_SUCCEEDED',
  REMOVE_FAILED: 'REMOVED_FAILED',
  add: () => ({
    type: coffeesActions.ADD,
    payload: { timestamp: new Date() }
  }),
  addSpecific: date => ({
    type: coffeesActions.ADD,
    payload: { timestamp: date }
  }),
  addSucceeded: timestamp => ({
    type: coffeesActions.ADD_SUCCEEDED,
    payload: { timestamp }
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
