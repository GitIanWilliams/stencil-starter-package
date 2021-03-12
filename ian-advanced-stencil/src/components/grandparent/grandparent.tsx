import { Component, h, Prop } from '@stencil/core';
import { store, Unsubscribe } from '@stencil/redux';

import { myStore } from '../../store/reducers';

@Component({
  tag: 'uc-comp-grandparent',
  shadow: true
})
export class CompGrandparent {
  @Prop({ mutable: true }) name: string;

  unsubscribe!: Unsubscribe;

  componentWillLoad() {

    store.setStore(myStore);

  }

  render() {
    return (
      <div>
        test
        <uc-comp-parent></uc-comp-parent>
      </div>
    );
  }
}