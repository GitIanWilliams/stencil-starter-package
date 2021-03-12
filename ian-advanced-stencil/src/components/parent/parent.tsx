import { Component, Prop, h } from '@stencil/core';
import { store } from "@stencil/redux";

@Component({
  tag: 'uc-comp-parent',
  shadow: true
})
export class CompParent {
  @Prop({ mutable: true}) name: string;

  componentWillLoad() {

    store.mapStateToProps(this, state => {
      const {
        myState: { name }
      } = state;
      return {
        name
      };
    });
  }
  render() {
    return (
      <div>
        <span>{this.name}</span>
        <uc-comp-child></uc-comp-child>
      </div>
    );
  }
}