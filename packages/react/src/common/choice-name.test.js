import { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import { withChoiceName } from './choice-name.js';

function Choice({ name, children }) {
  return <input type="checkbox" name={name} aria-label={children} />;
}

function Group({ children }) {
  return <fieldset>{children}</fieldset>;
}

describe('withChoiceName', () => {
  test('copies name onto direct choice controls and leaves other elements alone', () => {
    render(
      <Group>
        {withChoiceName(
          [
            <Choice key="one">One</Choice>,
            <div key="wrap">
              <Choice>Nested</Choice>
            </div>,
            <Choice key="keep" name="keep">
              Keep
            </Choice>,
          ],
          'group',
          [Choice]
        )}
      </Group>
    );

    expect(screen.getByRole('checkbox', { name: 'One' })).toHaveAttribute('name', 'group');
    expect(screen.getByRole('checkbox', { name: 'Nested' })).not.toHaveAttribute('name');
    expect(screen.getByRole('checkbox', { name: 'Keep' })).toHaveAttribute('name', 'keep');
    expect(document.querySelector('div')).not.toHaveAttribute('name');
  });

  test('returns children unchanged when none match', () => {
    const child = createElement('span', { key: 'label' }, 'Label');
    const result = withChoiceName([child], 'group', [Choice]);

    expect(result).toHaveLength(1);
    expect(result[0].props.name).toBeUndefined();
  });
});
