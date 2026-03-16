// Textarea Component Tests
import { CobTextarea } from './textarea';
import '@/components/textarea/textarea.css';

describe('CobTextarea', () => {
  let textarea;

  beforeEach(() => {
    textarea = new CobTextarea();
    const ta = document.createElement('textarea');
    textarea.appendChild(ta);
    document.body.appendChild(textarea);
  });

  afterEach(() => {
    document.body.removeChild(textarea);
  });

  test('should render textarea element', () => {
    expect(textarea.querySelector('textarea')).toBeTruthy();
  });

  test('should get textarea value', () => {
    const ta = textarea.querySelector('textarea');
    ta.value = 'test content';
    expect(textarea.getValue()).toBe('test content');
  });

  test('should set textarea value', () => {
    textarea.setValue('new content');
    const ta = textarea.querySelector('textarea');
    expect(ta.value).toBe('new content');
  });

  test('should track character count', () => {
    const ta = textarea.querySelector('textarea');
    ta.maxLength = 100;
    ta.value = 'hello';
    textarea.updateCharCount();

    const count = textarea.querySelector('.cob-textarea__char-count');
    expect(count.textContent).toContain('5/100');
  });
});
