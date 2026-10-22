import { render, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { CornSelect, CornSelectOption } from './select.jsx';

describe('CornSelect', () => {
  test('renders a styled wrapper with label linkage', () => {
    render(
      <CornSelect id="flavor-select" label="Flavor" name="flavor" placeholder="Choose one" size="sm">
        <CornSelectOption value="vanilla">Vanilla</CornSelectOption>
        <CornSelectOption value="chocolate">Chocolate</CornSelectOption>
      </CornSelect>
    );

    const wrapper = document.getElementById('flavor-select')?.closest('.corn-select');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('corn-select', 'corn-select--sm');

    const select = document.getElementById('flavor-select');
    const label = document.querySelector('label[for="flavor-select"]');

    expect(select).toHaveAttribute('id', 'flavor-select');
    expect(select).toHaveAttribute('name', 'flavor');
    expect(select).toHaveAttribute('placeholder', 'Choose one');
    expect(label).toHaveTextContent('Flavor');
    expect(label).toHaveAttribute('for', 'flavor-select');
  });

  test('renders to static markup without browser APIs during server-side rendering', () => {
    const html = renderToString(
      <CornSelect id="server-select" label="Server" size="lg">
        <CornSelectOption value="one">One</CornSelectOption>
        <CornSelectOption value="two">Two</CornSelectOption>
      </CornSelect>
    );

    expect(html).toContain('corn-select');
    expect(html).toContain('id="server-select"');
    expect(html).toContain('Server');
    expect(html).toContain('One');
    expect(html).toContain('corn-select--lg');
  });

  test('updates displayed placeholder text when placeholder prop changes after mount', async () => {
    const { rerender } = render(
      <CornSelect id="placeholder-select" label="Placeholder" placeholder="Choose one">
        <CornSelectOption value="one">One</CornSelectOption>
        <CornSelectOption value="two">Two</CornSelectOption>
      </CornSelect>
    );

    const select = document.getElementById('placeholder-select');

    await waitFor(() => {
      expect(select).toHaveAttribute('placeholder', 'Choose one');
      expect(select.querySelector('.select-content')).toHaveTextContent('Choose one');
    });

    rerender(
      <CornSelect id="placeholder-select" label="Placeholder" placeholder="Pick an option">
        <CornSelectOption value="one">One</CornSelectOption>
        <CornSelectOption value="two">Two</CornSelectOption>
      </CornSelect>
    );

    await waitFor(() => {
      expect(select).toHaveAttribute('placeholder', 'Pick an option');
      expect(select.querySelector('.select-content')).toHaveTextContent('Pick an option');
    });
  });

  test('re-renders internal option UI when multiple prop changes after mount', async () => {
    const { rerender } = render(
      <CornSelect id="multiple-select" label="Multiple">
        <CornSelectOption value="one">One</CornSelectOption>
        <CornSelectOption value="two">Two</CornSelectOption>
      </CornSelect>
    );

    const select = document.getElementById('multiple-select');

    await waitFor(() => {
      expect(select).not.toHaveAttribute('multiple');
      expect(select.querySelectorAll('input[type="checkbox"]').length).toBe(2);
    });

    const firstCheckboxBefore = select.querySelector('input[type="checkbox"]');

    rerender(
      <CornSelect id="multiple-select" label="Multiple" multiple>
        <CornSelectOption value="one">One</CornSelectOption>
        <CornSelectOption value="two">Two</CornSelectOption>
      </CornSelect>
    );

    await waitFor(() => {
      expect(select).toHaveAttribute('multiple');
      expect(select.querySelectorAll('input[type="checkbox"]').length).toBe(2);
      expect(select.querySelector('input[type="checkbox"]')).not.toBe(firstCheckboxBefore);
    });
  });
});
