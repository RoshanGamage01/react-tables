/**
   * Handle key down event for the direct input fields.
   * That allows the user to navigate through the table using arrow keys.
   * 
   * @param event event object that contains the keydown event
   * @param index row index
   * @param i column index
   * @returns void
   */
const handleKeyDown = (event: any, index: number, i: number) => {
    const element = event.target as HTMLInputElement;
    const isTextInput = ['text', 'password', 'search', 'tel', 'url'].includes(element.type); // NOTE - cursorPosition is not available on the email field. That's why I excluded email from this array. - Roshan
    const cursorPosition = element.selectionStart; 

    

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || 
        (event.key === 'ArrowLeft' && (!isTextInput || cursorPosition === 0)) || 
        (event.key === 'ArrowRight' && (!isTextInput || cursorPosition === element.value.length))) {

      let focus_node_id = '';

      if (event.key === 'ArrowRight') {
        focus_node_id = `${index}-${i+1}`;
      } else if (event.key === 'ArrowLeft') {
        focus_node_id = `${index}-${i-1}`;
      } else if (event.key === 'ArrowUp') {
        focus_node_id = `${index-1}-${i}`;
      } else if (event.key === 'ArrowDown') {
        focus_node_id = `${index+1}-${i}`;
      }

      const nextElement = document.getElementById(focus_node_id);

      if (nextElement) {
        nextElement.focus();
        event.preventDefault();
      }
    }
}

export default handleKeyDown;