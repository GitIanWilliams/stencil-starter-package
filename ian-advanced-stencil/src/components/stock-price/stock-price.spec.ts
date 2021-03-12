import { newSpecPage } from '@stencil/core/testing';
import { StockPrice } from './stock-price';

describe('uc-stock-price', () => {
  it("has an stockSymbol prop", async () => {
    // Arrange
    const page = await newSpecPage({
      components: [StockPrice],
      html: `<div></div>`
    });

    let component = page.doc.createElement("uc-stock-price");

    // Act
    (component as any).stockSymbol = 'AAPL';
    page.root.appendChild(component);
    await page.waitForChanges();

    // Assert
    expect(page.rootInstance.stockSymbol).toBe('AAPL');
  });
});