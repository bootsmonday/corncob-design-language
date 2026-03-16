// Tabs Component Tests
import { CobTabs } from './tabs';
import '@/components/tabs/tabs.css';

describe('CobTabs', () => {
  let tabs;

  beforeEach(() => {
    tabs = new CobTabs();
    const nav = document.createElement('div');
    nav.className = 'cob-tabs__nav';

    for (let i = 1; i <= 3; i++) {
      const button = document.createElement('button');
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', i === 1);
      button.setAttribute('aria-controls', `panel-${i}`);
      button.textContent = `Tab ${i}`;
      nav.appendChild(button);

      const panel = document.createElement('div');
      panel.id = `panel-${i}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-hidden', i !== 1);
      panel.className = 'cob-tabs__content';
      panel.textContent = `Content ${i}`;
      tabs.appendChild(panel);
    }

    tabs.insertBefore(nav, tabs.firstChild);
    document.body.appendChild(tabs);
  });

  afterEach(() => {
    document.body.removeChild(tabs);
  });

  test('should select tab on click', () => {
    const buttons = tabs.querySelectorAll('[role="tab"]');
    buttons[1].click();

    expect(buttons[1].getAttribute('aria-selected')).toBe('true');
    expect(buttons[0].getAttribute('aria-selected')).toBe('false');
  });

  test('should show corresponding panel', () => {
    const buttons = tabs.querySelectorAll('[role="tab"]');
    const panels = tabs.querySelectorAll('[role="tabpanel"]');

    buttons[2].click();

    expect(panels[2].getAttribute('aria-hidden')).toBe('false');
    expect(panels[0].getAttribute('aria-hidden')).toBe('true');
  });
});
