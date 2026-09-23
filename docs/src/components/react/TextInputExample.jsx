import { CornTextInput } from '@bootsmonday/corncob-design-language-react';

export default function TextInputExample() {
  return (
    <div className="corn-form">
      <CornTextInput label="What is your name?" placeholder="Enter Full Name..." status="Helper Text" />
      <CornTextInput size="xs" label="Compact name" placeholder="Enter Full Name..." />
      <CornTextInput label="Email" placeholder="you@example.com" status="Required" statusVariant="error" />
    </div>
  );
}
