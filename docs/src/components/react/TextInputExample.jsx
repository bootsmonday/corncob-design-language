import { CcTextInput } from '@bootsmonday/corncob-design-language-react';

export default function TextInputExample() {
  return (
    <div className="corn-form">
      <CcTextInput
        label="What is your name?"
        placeholder="Enter Full Name..."
        status="Helper Text"
      />
      <CcTextInput
        size="xs"
        label="Compact name"
        placeholder="Enter Full Name..."
      />
      <CcTextInput
        label="Email"
        placeholder="you@example.com"
        status="Required"
        statusVariant="error"
      />
    </div>
  );
}
