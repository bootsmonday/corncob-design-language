// Table Component JavaScript
export class CobTable extends HTMLElement {
  connectedCallback() {
    this.table = this.querySelector('table');
    const headers = this.querySelectorAll('thead th');

    headers.forEach((header, index) => {
      if (header.getAttribute('data-sortable')) {
        header.classList.add('cob-table__sortable');
        header.addEventListener('click', () => this.sort(index));
      }
    });
  }

  sort(columnIndex) {
    const tbody = this.table?.querySelector('tbody');
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isAscending = this.currentSortIndex === columnIndex ? !this.currentAscending : true;

    rows.sort((a, b) => {
      const aValue = a.cells[columnIndex].textContent.trim();
      const bValue = b.cells[columnIndex].textContent.trim();

      const comparison = aValue.localeCompare(bValue);
      return isAscending ? comparison : -comparison;
    });

    rows.forEach((row) => tbody.appendChild(row));

    this.currentSortIndex = columnIndex;
    this.currentAscending = isAscending;
  }
}

customElements.define('cob-table', CobTable);
