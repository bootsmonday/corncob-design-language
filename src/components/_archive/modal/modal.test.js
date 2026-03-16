// Modal Component Tests
import { CobModal } from './modal';
import '@/components/modal/modal.css';

describe('CobModal', () => {
  let modal;

  beforeEach(() => {
    modal = new CobModal();
    const backdrop = document.createElement('div');
    backdrop.className = 'cob-modal-backdrop';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'cob-modal__close';
    closeBtn.textContent = '✕';
    backdrop.appendChild(closeBtn);
    modal.appendChild(backdrop);
    document.body.appendChild(modal);
  });

  afterEach(() => {
    document.body.removeChild(modal);
  });

  test('should open modal', () => {
    modal.open();
    expect(modal.hasAttribute('open')).toBe(true);
    expect(modal.querySelector('.cob-modal-backdrop').classList.contains('--visible')).toBe(true);
  });

  test('should close modal', () => {
    modal.open();
    modal.close();
    expect(modal.hasAttribute('open')).toBe(false);
  });

  test('should close on Escape key', () => {
    modal.open();
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(modal.hasAttribute('open')).toBe(false);
  });
});
