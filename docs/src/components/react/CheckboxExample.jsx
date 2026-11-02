import { CornCheckbox, CornCheckboxGroup } from '@bootsmonday/corncob-design-language-react';

export default function CheckboxExample() {
  return (
    <div className="corn-form">
      <CornCheckboxGroup legend="Options" name="react-example">
        <CornCheckbox>Checkbox One</CornCheckbox>
        <CornCheckbox defaultChecked>Checkbox Two</CornCheckbox>
        <CornCheckbox disabled>Disabled</CornCheckbox>
      </CornCheckboxGroup>

      <CornCheckboxGroup legend="Inline options" name="react-example-inline" inline>
        <CornCheckbox>Inline One</CornCheckbox>
        <CornCheckbox>Inline Two</CornCheckbox>
        <CornCheckbox>Inline Three</CornCheckbox>
      </CornCheckboxGroup>

      <CornCheckboxGroup legend="My Tasks" name="react-tasks">
        <CornCheckbox task defaultChecked>
          Task Complete
        </CornCheckbox>
        <CornCheckbox task>Task Incomplete</CornCheckbox>
      </CornCheckboxGroup>

      <CornCheckboxGroup legend="Partial selection" name="react-partial">
        <CornCheckbox indeterminate>Indeterminate checkbox</CornCheckbox>
      </CornCheckboxGroup>
    </div>
  );
}
