import React from 'react';
import ReactDOM from 'react-dom/client';
import { CornFooter, CornFooterIntro, CornFooterContent, CornFooterSection, CornFooterSocial, CornFooterCopyright, CornLink } from '../../index.js';

const NAV_SECTIONS = [
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press'],
  },
  {
    title: 'Support',
    links: ['Contact Us', 'FAQs', 'Help Center'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
];

const SOCIAL_LINKS = [
  { label: 'X', icon: 'twitter-x' },
  { label: 'Instagram', icon: 'instagram' },
  { label: 'LinkedIn', icon: 'linkedin' },
  { label: 'GitHub', icon: 'github' },
];

function SocialIcon({ icon }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="corn-icon" aria-hidden="true">
      <use href={`/node_modules/bootstrap-icons/bootstrap-icons.svg#${icon}`}></use>
    </svg>
  );
}

function DemoRouterLink({ to, children, ...props }) {
  return (
    <a {...props} href={to} data-router-link="true">
      {children}
    </a>
  );
}

const root = ReactDOM.createRoot(document.getElementById('test-stickersheet'));
root.render(
  <div className="footer-demo">
    <h2>Corn Footer</h2>
    <CornFooter>
      <CornFooterIntro>The footer is the last section of a page, and typically contains information about the company, links to important pages, and social media links.</CornFooterIntro>

      <CornFooterContent>
        {NAV_SECTIONS.map((section) => (
          <CornFooterSection key={section.title} title={section.title}>
            <ul>
              {section.links.map((label) => (
                <li key={label}>
                  <CornLink as={DemoRouterLink} to="#" className="corn-link">
                    {label}
                  </CornLink>
                </li>
              ))}
            </ul>
          </CornFooterSection>
        ))}
      </CornFooterContent>

      <CornFooterSocial>
        {SOCIAL_LINKS.map((item) => (
          <CornLink key={item.label} href="#" aria-label={item.label}>
            <SocialIcon icon={item.icon} />
          </CornLink>
        ))}
      </CornFooterSocial>

      <CornFooterCopyright>&copy; 2026 Your Company. All rights reserved.</CornFooterCopyright>
    </CornFooter>
  </div>
);
