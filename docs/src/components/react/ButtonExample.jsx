import { CornButton } from '@bootsmonday/corncob-design-language-react';

export default function ButtonExample() {
  return (
    <div className="corn-form">
      <div className="corn-form--row">
        <CornButton>React Primary</CornButton>
        <CornButton variant="secondary">React Secondary</CornButton>
        <CornButton variant="danger">React Danger</CornButton>
      </div>
      <form
        action={async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 400);
          });
        }}
      >
        <CornButton type="submit">Save</CornButton>
      </form>
    </div>
  );
}
