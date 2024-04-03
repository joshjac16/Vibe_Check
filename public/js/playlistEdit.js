let titleElement, bodyElement;

// Edit playlist button
const editButtonHandler = (event) => {
  event.preventDefault();

  const playlistElement = document.querySelector('#playlist');

  titleElement = playlistElement.querySelector('#playlist-title');
  bodyElement = playlistElement.querySelector('#playlist-songs');

  const currentTitle = titleElement.textContent.trim();
  const currentBody = bodyElement.textContent.trim();

  titleElement.innerHTML = `<input type="text" class="playlist-title-input" value="" placeholder="${currentTitle}">`;
  bodyElement.innerHTML = `<textarea class="playlist-body-input" placeholder="${currentBody}"></textarea>`;

  const editButton = document.querySelector('.btn-warning');
  editButton.textContent = 'Submit';
  editButton.removeEventListener('click', editButtonHandler);
  editButton.addEventListener('click', submitButtonHandler);
};

const submitButtonHandler = async (event) => {
  const title = titleElement.querySelector('.post-title-input').value.trim();
  const body = bodyElement.querySelector('.post-body-input').value.trim();
  console.log(title);
  console.log(body);
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    try {
      console.log('Request body:', { title, body });
      const response = await fetch(`/api/playlist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ title, body }),
      });

      if (response.ok) {
        document.location.replace(`/playlist/${id}`);
      } else {
        const responseData = await response.json();
        alert(responseData.message || 'Failed to edit playlist');
      }
    } catch (error) {
      console.log('Error editing playlist:', error);
      alert('An error occurred while editing playlist');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/api/playlist/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/user');
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

const editButton = document.querySelector('.btn-warning');
editButton.addEventListener('click', editButtonHandler);

document
  .querySelector('.btn-danger')
  .addEventListener('click', delButtonHandler);
