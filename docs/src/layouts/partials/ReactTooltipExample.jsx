import { CornTooltip, CornButton } from '@bootsmonday/corncob-design-language-react';

export default function ReactTooltipExample() {
  return (
    <CornButton type="button" className="corn-tooltip--anchor">
      Default (Top)
      <CornTooltip position="top">Default tooltip</CornTooltip>
    </CornButton>
  );
}
