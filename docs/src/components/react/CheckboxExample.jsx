import { CcCheckbox, CcCheckboxGroup } from '@bootsmonday/corncob-design-language-react';

export default function CheckboxExample() {
  return (
    <div className="corn-form">
      <CcCheckboxGroup legend="Options" name="react-example">
        <CcCheckbox>Checkbox One</CcCheckbox>
        <CcCheckbox defaultChecked>Checkbox Two</CcCheckbox>
        <CcCheckbox disabled>Disabled</CcCheckbox>
      </CcCheckboxGroup>

      <CcCheckboxGroup legend="Inline options" name="react-example-inline" inline>
        <CcCheckbox>Inline One</CcCheckbox>
        <CcCheckbox>Inline Two</CcCheckbox>
        <CcCheckbox>Inline Three</CcCheckbox>
      </CcCheckboxGroup>

      <CcCheckboxGroup legend="My Tasks" name="react-tasks">
        <CcCheckbox task defaultChecked>
          Task Complete
        </CcCheckbox>
        <CcCheckbox task>Task Incomplete</CcCheckbox>
      </CcCheckboxGroup>

      <CcCheckboxGroup legend="Partial selection" name="react-partial">
        <CcCheckbox indeterminate>Indeterminate checkbox</CcCheckbox>
      </CcCheckboxGroup>
    </div>
  );
}
