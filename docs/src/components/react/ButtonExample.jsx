import { CcButton } from '@bootsmonday/corncob-design-language-react';

export default function ButtonExample() {
  return (
    <div className="corn-form--row">
      <CcButton>React Primary</CcButton>
      <CcButton variant="secondary">React Secondary</CcButton>
      <CcButton variant="danger">React Danger</CcButton>
    </div>
  );
}
