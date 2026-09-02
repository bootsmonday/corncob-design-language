import { CcButton } from '@bootsmonday/corncob-design-language-react';

export default function ButtonExample() {
  return (
    <div className="corn-form">
      <div className="corn-form--row">
        <CcButton>React Primary</CcButton>
        <CcButton variant="secondary">React Secondary</CcButton>
        <CcButton variant="danger">React Danger</CcButton>
      </div>
      <form
        action={async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 400);
          });
        }}
      >
        <CcButton type="submit">Save</CcButton>
      </form>
    </div>
  );
}
