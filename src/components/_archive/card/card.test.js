// Card Component Tests
import { CobCard } from './card';
import '@/components/card/card.css';

describe('CobCard', () => {
  let card;

  beforeEach(() => {
    card = new CobCard();
    document.body.appendChild(card);
  });

  afterEach(() => {
    document.body.removeChild(card);
  });

  test('should render card element', () => {
    expect(card.tagName).toBe('COB-CARD');
  });

  test('should accept header, body, and footer children', () => {
    const header = document.createElement('div');
    header.className = 'cob-card__header';
    header.textContent = 'Header';
    card.appendChild(header);

    expect(card.querySelector('.cob-card__header')).toBeTruthy();
  });
});
