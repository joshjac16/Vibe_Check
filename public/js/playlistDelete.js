const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(event.target);
    let killSummer = confirm(
      'Are you sure you want to delete me?\n\nThis procdure is irreversible...'
    );
    if (!killSummer) {
      return;
    }
    try {
      const response = await fetch(`/api/playlist/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        const responseData = await response.json();
        alert(responseData.message || 'Failed to delete playlist');
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
      alert('An error occurred while deleting playlist');
    }
  }
};

document
  .querySelector('.btn-danger')
  .addEventListener('click', delButtonHandler);
