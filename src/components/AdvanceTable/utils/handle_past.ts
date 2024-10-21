  /**
   * Handle pasted data that is copied from an external source. 
   * Like Excel, Google Sheets, etc.
   * 
   * @param event event object that contains the pasted data
   * @param index row index
   * @param i cpolumn index
   * @returns void
   */
  const handlePast = (event: any, index: number, i: number) => {
    event.preventDefault();

    const clipboardData = event.clipboardData || window.clipboardData; 
    const pastedData = clipboardData.getData('Text');
    const rows = pastedData.split('\n').map((row: any) => row.split('\t'));

    for(const rowIndex in rows){
        const row = rows[rowIndex];
        for(const cellIndex in row) {
            
            const cell = row[cellIndex];
            
            const targetId = `${index + parseInt(rowIndex)}-${i + parseInt(cellIndex)}`;
            const targetElement: HTMLInputElement = document.getElementById(targetId) as HTMLInputElement;

            if (targetElement) {
                targetElement.value = cell;

                const inputEvent = new Event('input', { bubbles: false });
                targetElement.dispatchEvent(inputEvent);
            }
        }
        
    }
  }

export default handlePast;