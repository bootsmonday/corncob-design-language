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
    expect(expandable).toHaveAttribute('open');
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

  test('forwards ref to details element', () => {
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
