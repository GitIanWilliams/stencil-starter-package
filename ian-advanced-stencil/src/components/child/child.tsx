import { Component, h } from '@stencil/core';
import { store, Action } from "@stencil/redux";
import { changeName } from "../../store/actions";

@Component({
  tag: 'uc-comp-child',
  shadow: true
})
export class CompChild {
  name: string;
  changeName: Action;
  textInput: HTMLInputElement;
  componentWillLoad() {

    store.mapDispatchToProps(this, {
      changeName
    });
  }

  onUserInput() {
    this.changeName(this.textInput.value);
  }

  render() {
    return (
      <div>
        <input id="text-input"
          ref={el => this.textInput = el}
          onInput={this.onUserInput.bind(this)} />
      </div>
    );
  }
}