// Table Component Tests
import { CobTable } from './table';
import '@/components/table/table.css';

describe('CobTable', () => {
  let table;

  beforeEach(() => {
    table = new CobTable();
    const t = document.createElement('table');
    t.className = 'cob-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = 'Name';
    th1.setAttribute('data-sortable', '');
    headerRow.appendChild(th1);
    thead.appendChild(headerRow);
    t.appendChild(thead);

    const tbody = document.createElement('tbody');
    ['Alice', 'Bob', 'Charlie'].forEach((name) => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.textContent = name;
      row.appendChild(cell);
      tbody.appendChild(row);
    });
    t.appendChild(tbody);

    table.appendChild(t);
    document.body.appendChild(table);
  });

  afterEach(() => {
    document.body.removeChild(table);
  });

  test('should render table', () => {
    expect(table.querySelector('table')).toBeTruthy();
  });

  test('should sort table by column', () => {
    table.sort(0);
    const firstRow = table.querySelector('tbody tr');
    expect(firstRow.textContent).toContain('Alice');
  });
});
