import { Component, h, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrls: ['./side-drawer.scss'],
  shadow: true
})
export class SideDrawer {
  @State() showContactInfo = false;
  @Prop({ reflect: true }) sidetitle: string;
  @Prop({ reflect: true }) open: boolean;

  @Method()
  async onToggleDrawer() {
    this.open = !this.open;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }
  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
            <h2>Contact Information</h2>
            <p>You can reach us via phone or email.</p>
            <ul>
              <li>Phone: 555555555</li>
              <li>E-Mail: <a href="mailto:hello">hello@email.com</a></li>
            </ul>
        </div>
      )
    }
    return  [
      <div class="backdrop" onClick={this.onToggleDrawer.bind(this)}></div>,
      <aside>
        <header><button onClick={this.onToggleDrawer.bind(this)}>X</button><h1>{this.sidetitle}</h1></header>
        <section id="tabs" class="tabs">
          <button class={this.showContactInfo ? '' : 'active'} onClick={this.onContentChange.bind(this, 'nav')}>Nav</button>
          <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    ];
  }
}