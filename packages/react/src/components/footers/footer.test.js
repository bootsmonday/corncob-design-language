import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { CornFooter, CornFooterIntro, CornFooterContent, CornFooterSection, CornFooterSocial, CornFooterCopyright } from './footer.jsx';

describe('CornFooter', () => {
  test('renders canonical footer structure classes', () => {
    const { container } = render(
      <CornFooter>
        <CornFooterIntro>Intro</CornFooterIntro>
        <CornFooterContent>
          <CornFooterSection title="Company">
            <ul>
              <li>Item</li>
            </ul>
          </CornFooterSection>
        </CornFooterContent>
        <CornFooterSocial>
          <a href="#" className="corn-link" aria-label="X">
            X
          </a>
        </CornFooterSocial>
        <CornFooterCopyright>Copyright</CornFooterCopyright>
      </CornFooter>
    );

    expect(container.querySelector('footer.corn-footer')).toBeTruthy();
    expect(container.querySelector('.corn-footer--intro')).toHaveTextContent('Intro');
    expect(container.querySelector('.corn-footer--content')).toBeTruthy();
    expect(container.querySelector('.corn-footer--content--section h3')).toHaveTextContent('Company');
    expect(container.querySelector('.corn-footer--social')).toBeTruthy();
    expect(container.querySelector('.corn-footer--copyright')).toHaveTextContent('Copyright');
  });

  test('supports custom section host element', () => {
    const { container } = render(
      <CornFooter>
        <CornFooterContent>
          <CornFooterSection as="section" title="Support" data-testid="support-section">
            <ul>
              <li>FAQs</li>
            </ul>
          </CornFooterSection>
        </CornFooterContent>
      </CornFooter>
    );

    const section = screen.getByTestId('support-section');
    expect(section.tagName).toBe('SECTION');
    expect(section).toHaveClass('corn-footer--content--section');
    expect(container.querySelector('h3')).toHaveTextContent('Support');
  });

  test('forwards ref to footer root', () => {
    const ref = createRef();

    render(
      <CornFooter ref={ref}>
        <CornFooterCopyright>Copy</CornFooterCopyright>
      </CornFooter>
    );

    expect(ref.current).toBe(screen.getByText('Copy').closest('.corn-footer'));
  });
});
