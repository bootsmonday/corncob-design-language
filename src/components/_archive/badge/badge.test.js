// Badge Component Tests
import { CobBadge } from './badge';
import '@/components/badge/badge.css';

describe('CobBadge', () => {
  let badge;

  beforeEach(() => {
    badge = new CobBadge();
    badge.textContent = 'Badge';
    document.body.appendChild(badge);
  });

  afterEach(() => {
    document.body.removeChild(badge);
  });

  test('should render badge element', () => {
    expect(badge.tagName).toBe('COB-BADGE');
    expect(badge.textContent).toBe('Badge');
  });

  test('should accept CSS variant classes', () => {
    badge.classList.add('cob-badge--success');
    expect(badge.classList.contains('cob-badge--success')).toBe(true);
  });
});
