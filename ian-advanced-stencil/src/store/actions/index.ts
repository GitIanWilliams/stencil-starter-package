export interface ChangeNameAction {
  type: 'CHANGE_NAME';
  name: string;
}

export const changeName = (name: string) => {
  return {
    type: 'CHANGE_NAME',
    name
  };
};