// Main Entry Point - Imports & Registers All Components

// Import Tokens
import 'modern-normalize/modern-normalize.css';
import './tokens/colors.css';
import './tokens/typography.css';
import './tokens/spacing.css';
import './tokens/shadows.css';
import './tokens/sizes.css';
import './tokens/borders.css';
import './tokens/animations.css';
import './tokens/forms.css';
import './tokens/status.css';

// Import Components - CSS
import './components/panels/panel.css';
import './components/links/link.css';
import './components/buttons/button.css';
import './components/text-inputs/text-input.css';
import './components/tooltips/tooltip.css';
import './components/messages/message.css';
import './components/popovers/popover.css';
import './components/checkboxes/checkbox.css';
import './components/radio-buttons/radio-button.css';
import './components/toast/toast.css';
import './components/expandables/expandable.css';
import './components/panel-menus/panel-menu.css';
import './components/button-bars/button-bar.css';
import './components/headers/header.css';
import './components/footers/footer.css';
// Import Base Styles
import './common/dark.css';
import './common/forms.css';
import './common/page.css';
import './common/grid.css';

// import './components/_archive/input/input.css';
// import './components/_archive/textarea/textarea.css';
// import './components/_archive/select/select.css';
// import './components/_archive/checkbox/checkbox.css';
// import './components/_archive/radio/radio.css';
// import './components/_archive/toggle/toggle.css';
// import './components/_archive/card/card.css';
// import './components/_archive/modal/modal.css';
// import './components/_archive/tabs/tabs.css';
// import './components/_archive/table/table.css';
// import './components/_archive/tooltip/tooltip.css';
// import './components/_archive/alert/alert.css';
// import './components/_archive/badge/badge.css';
// import './components/_archive/avatar/avatar.css';

import './components/toast/toast.js';
import './components/tooltips/tooltip.js';
import './components/expandables/expandable.js';
// // Import Components - JavaScript
// import './components/buttons/button.js';
// import './components/_archive/input/input.js';
// import './components/_archive/textarea/textarea.js';
// import './components/_archive/select/select.js';
// import './components/_archive/checkbox/checkbox.js';
// import './components/_archive/radio/radio.js';
// import './components/_archive/toggle/toggle.js';
// import './components/_archive/card/card.js';
// import './components/_archive/modal/modal.js';
// import './components/_archive/tabs/tabs.js';
// import './components/_archive/table/table.js';
// import './components/_archive/tooltip/tooltip.js';
// import './components/_archive/alert/alert.js';
// import './components/_archive/badge/badge.js';
// import './components/_archive/avatar/avatar.js';

// // Re-export all components for package consumers
export {
  CornCopyButton,
  CornTooltip,
  CornExpandable,
  CornPopover,
  CornButtonBar,
} from './components/index.js';
// export {
//   CobButton,
//   CobInput,
//   CobTextarea,
//   CobSelect,
//   CobCheckbox,
//   CobRadio,
//   CobToggle,
//   CobCard,
//   CobModal,
//   CobTabs,
//   CobTable,
//   CobTooltip,
//   CobAlert,
//   CobBadge,
//   CobAvatar,
// } from './components/index.js';
