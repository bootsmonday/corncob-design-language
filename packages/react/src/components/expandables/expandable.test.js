import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornAccordion, CornExpandable } from './expandable.jsx';

describe('CornExpandable', () => {
  test('renders default expandable structure with corn-expandable host', () => {
    const { container } = render(<CornExpandable summary="Summary">details</CornExpandable>);

    expect(container.querySelector('.corn-expandable')).toBeTruthy();
    expect(container.querySelector('corn-expandable')).toBeTruthy();
    expect(container.querySelector('details')).toBeTruthy();
    expect(container.querySelector('details')).toHaveAttribute('slot', 'details');
    expect(container.querySelector('summary.corn-expandable-button')).toHaveTextContent('Summary');
    expect(container.querySelector('.corn-expandable--content')).toHaveTextContent('details');
  });

  test('passes open prop to corn-expandable host', () => {
    const { container } = render(
      <CornExpandable summary="Summary" open>
        details
      </CornExpandable>
    );

    const expandable = container.querySelector('corn-expandable');
    expect(expandable).toHaveAttribute('open');
  });

  test('supports nested and accordion wrappers', () => {
    const { container } = render(
      <>
        <CornAccordion>
          <CornExpandable summary="One">A</CornExpandable>
          <CornExpandable summary="Two">B</CornExpandable>
        </CornAccordion>
        <CornExpandable className="corn-tree-view" summary="Parent" iconPosition="start">
          <CornExpandable className="corn-tree-view" summary="Child" iconPosition="start">
            Child details
          </CornExpandable>
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
      <CornExpandable ref={ref} summary="Summary">
        details
      </CornExpandable>
    );

    expect(ref.current.tagName).toBe('CORN-EXPANDABLE');
  });

  test('passes name to details for accordion grouping', () => {
    const { container } = render(
      <CornExpandable name="corn-single" summary="Summary">
        details
      </CornExpandable>
    );

    expect(container.querySelector('details')).toHaveAttribute('name', 'corn-single');
  });
});
