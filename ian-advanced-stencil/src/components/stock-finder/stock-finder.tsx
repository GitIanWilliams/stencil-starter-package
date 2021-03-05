import { Component, h, Event, State, EventEmitter } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';
@Component({
  tag: 'uc-stock-finder',
  styleUrl: './stock-finder.scss',
  shadow: true
})
export class StockFinder {
  stockNameInput: HTMLInputElement;
  @State() searchResults: { symbol: string, name: string}[] = [];
  @Event({ bubbles: true, composed: true }) ucSymbolSelected: EventEmitter<string>;
  @State() loading: boolean;

  async onFindStocks(event: Event) {
    event.preventDefault();
    try {
      this.loading = true;
      const stockName = this.stockNameInput.value;
      const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`);
      const stockResults = await response.json();
      this.searchResults = stockResults.bestMatches.map((match) => ({
        symbol: match['1. symbol'],
        name: match['2. name']
      }));
      this.loading = false;
    }
    catch(err) {
      this.loading = false;
      console.log('error finding stocks', err);
    }
  }

  onSelectSymbol(symbol: string) {
    this.ucSymbolSelected.emit(symbol);
  }
  render() {
    let searchContent = '';
    if (this.loading) {
      searchContent = <uc-spinner></uc-spinner>;
    }
    else {
      searchContent = <ul>
        {this.searchResults.map((result) => {
          return <li onClick={this.onSelectSymbol.bind(this, result.symbol)}><strong>{result.symbol}</strong> - {result.name}</li>
        })}
      </ul>;
    }
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input id="stock-name"
          ref={el => this.stockNameInput = el}
           />
        <button type="submit">Find</button>
      </form>,
      searchContent
    ];
  }
}