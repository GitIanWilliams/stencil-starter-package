export interface MyState {
  name: string;
}

const defaultState = {
  name: 'Ian'
}

export const myState = (state: MyState = defaultState, {type, ...changes}) => {
  switch(type) {
    case 'CHANGE_NAME': {
      return {
        ...state,
        name: changes.name
      };
    }
    default: {
      return state;
    }
  }
}