import { CornPopover, CornPopoverContent, CornPopoverTrigger } from '@bootsmonday/corncob-design-language-react';

export default function ReactPopoverExample() {
  return (
    <CornPopover id="popover-simple-react" position="top">
      <CornPopoverTrigger>Open simple popover</CornPopoverTrigger>
      <CornPopoverContent>
        <p>Simple content that matches the component pattern used elsewhere.</p>
      </CornPopoverContent>
    </CornPopover>
  );
}
