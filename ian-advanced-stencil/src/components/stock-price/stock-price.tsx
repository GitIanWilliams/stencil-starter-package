import { Component, Listen, Element, h, State, Prop, Watch } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.scss',
  shadow: true
})
export class StockPrice {
  stockInput: HTMLInputElement;
  // previousStockSymbol: string;
  @Element() parentEl: HTMLElement;
  @State() fetchedPrice = 0;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading: boolean;

  @Prop({ mutable: true, reflect: true }) stockSymbol: string;

  @Watch('stockSymbol')
  updateFieldsFromProps(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.fetchStockPrice(this.stockSymbol);
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
    }
    // this.previousStockSymbol = this.stockSymbol;

  }

  componentWillLoad() {
    console.log(this.stockSymbol);
    console.log('component will load');
  }

  componentDidLoad() {
    if (this.stockSymbol) {
      this.updateFieldsFromProps(this.stockSymbol, '');
    }
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    // if (this.stockSymbol !== this.previousStockSymbol) {
    //   this.updateFieldsFromProps();
    // }
  }

  disconnectedCallback() {
    console.log('componentDidUnload');
  }

  @Listen('ucSymbolSelected', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if (this.stockUserInput.trim().length > 0) {
      this.stockInputValid = true;
    }
    else {
      this.stockInputValid = false;
    }
  }
  async onFetchStockPrice(event: Event) {

    event.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    // const stockSymbol = this.stockInput.value;
    this.stockSymbol = this.stockInput.value;
  }

  async fetchStockPrice(stockSymbol: string) {
    try {
      this.loading = true;
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`);
      const parsedRes = await response.json();
      if (!parsedRes['Global Quote']['05. price']) {
        throw new Error('Invalid Symbol!');
      }
      this.error = null;
      const newPrice = +parsedRes['Global Quote']['05. price'];
      this.fetchedPrice = newPrice;
      this.loading = false;
    }
    catch(err) {
      this.fetchedPrice = null;
      console.log('error fetching', err);
      this.error = err.message;
      this.loading = false;
    }
  }

  hostData() {
    return {
      class: this.error ? 'error hydrated' : 'hydrated'
    }
  }

  render() {
    let priceContent = this.stockSymbol ? '' : <p>Please enter a stock price!</p>;
    if (this.loading) {
      priceContent = <uc-spinner></uc-spinner>;
    }
    else if (this.error) {
      priceContent = <p>{this.error}</p>;
    }
    else if (this.fetchedPrice) {
      priceContent =  <p>Price: ${this.fetchedPrice}</p>;
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol"
          ref={el => this.stockInput = el}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)} />
        <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch</button>
      </form>,
      <div>
        {priceContent}
      </div>
    ];
  }
}
