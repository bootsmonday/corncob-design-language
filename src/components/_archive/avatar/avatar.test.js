// Avatar Component Tests
import { CobAvatar } from './avatar';
import '@/components/avatar/avatar.css';

describe('CobAvatar', () => {
  let avatar;

  beforeEach(() => {
    avatar = new CobAvatar();
    document.body.appendChild(avatar);
  });

  afterEach(() => {
    document.body.removeChild(avatar);
  });

  test('should render avatar with initials', () => {
    avatar.setAttribute('initials', 'JD');
    expect(avatar.textContent).toContain('JD');
  });

  test('should render avatar with image', () => {
    avatar.setAttribute('src', 'avatar.jpg');
    const img = avatar.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('avatar.jpg');
  });

  test('should update on attribute change', () => {
    avatar.setAttribute('initials', 'AB');
    expect(avatar.textContent).toContain('AB');

    avatar.setAttribute('initials', 'CD');
    expect(avatar.textContent).toContain('CD');
  });
});
