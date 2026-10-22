import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornAccordion, CornExpandable, CornExpandableSummary, CornExpandableContent } from './expandable.jsx';

describe('CornExpandable', () => {
  test('renders default expandable structure with corn-expandable host', () => {
    const { container } = render(
      <CornExpandable>
        <CornExpandableSummary>Summary</CornExpandableSummary>
        <CornExpandableContent>details</CornExpandableContent>
      </CornExpandable>
    );

    expect(container.querySelector('.corn-expandable')).toBeTruthy();
    expect(container.querySelector('corn-expandable')).toBeTruthy();
    expect(container.querySelector('details')).toBeTruthy();
    expect(container.querySelector('details')).toHaveAttribute('slot', 'details');
    expect(container.querySelector('summary.corn-expandable-button')).toHaveTextContent('Summary');
    expect(container.querySelector('.corn-expandable--content')).toHaveTextContent('details');
  });

  test('passes open prop to corn-expandable host', () => {
    const { container } = render(
      <CornExpandable open>
        <CornExpandableSummary>Summary</CornExpandableSummary>
        <CornExpandableContent>details</CornExpandableContent>
      </CornExpandable>
    );

    const expandable = container.querySelector('corn-expandable');
    const details = container.querySelector('details');
    expect(expandable).toHaveAttribute('open');
    expect(details.open).toBe(true);
  });

  test('leaves open uncontrolled when the prop is omitted', () => {
    const { container } = render(
      <CornExpandable>
        <CornExpandableSummary>Summary</CornExpandableSummary>
        <CornExpandableContent>details</CornExpandableContent>
      </CornExpandable>
    );

    expect(container.querySelector('corn-expandable')).not.toHaveAttribute('open');
  });

  test('closes when open changes to false', () => {
    const { container, rerender } = render(
      <CornExpandable open>
        <CornExpandableSummary>Summary</CornExpandableSummary>
        <CornExpandableContent>details</CornExpandableContent>
      </CornExpandable>
    );

    rerender(
      <CornExpandable open={false}>
        <CornExpandableSummary>Summary</CornExpandableSummary>
        <CornExpandableContent>details</CornExpandableContent>
      </CornExpandable>
    );

    const details = container.querySelector('details');
    const content = details.querySelector('.corn-expandable--content');
    expect(container.querySelector('corn-expandable')).not.toHaveAttribute('open');
    expect(details).not.toHaveClass('corn-expandable--open');

    const event = new Event('transitionend');
    Object.defineProperty(event, 'propertyName', { value: 'grid-template-rows' });
    content.dispatchEvent(event);
    expect(details.open).toBe(false);
  });

  test('supports nested and accordion wrappers', () => {
    const { container } = render(
      <>
        <CornAccordion>
          <CornExpandable>
            <CornExpandableSummary>One</CornExpandableSummary>
            <CornExpandableContent>A</CornExpandableContent>
          </CornExpandable>
          <CornExpandable>
            <CornExpandableSummary>Two</CornExpandableSummary>
            <CornExpandableContent>B</CornExpandableContent>
          </CornExpandable>
        </CornAccordion>
        <CornExpandable className="corn-tree-view">
          <CornExpandableSummary>Parent</CornExpandableSummary>
          <CornExpandableContent>
            <CornExpandable className="corn-tree-view">
              <CornExpandableSummary>Child</CornExpandableSummary>
              <CornExpandableContent>Child details</CornExpandableContent>
            </CornExpandable>
          </CornExpandableContent>
        </CornExpandable>
      </>
    );

    expect(container.querySelector('.corn-accordion')).toBeTruthy();
    expect(screen.getByText('Child details')).toBeTruthy();
    expect(container.querySelectorAll('.corn-tree-view')).toHaveLength(2);
  });

  test('forwards ref to the corn-expandable host', () => {
    const ref = createRef();
    render(
      <CornExpandable ref={ref}>
        <CornExpandableSummary>Summary</CornExpandableSummary>
        <CornExpandableContent>details</CornExpandableContent>
      </CornExpandable>
    );

    expect(ref.current.tagName).toBe('CORN-EXPANDABLE');
  });

  test('passes name to details for accordion grouping', () => {
    const { container } = render(
      <CornExpandable name="corn-single">
        <CornExpandableSummary>Summary</CornExpandableSummary>
        <CornExpandableContent>details</CornExpandableContent>
      </CornExpandable>
    );

    expect(container.querySelector('details')).toHaveAttribute('name', 'corn-single');
  });
});
