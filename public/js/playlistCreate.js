// Defines an array to store temporary playlist items
let temporaryPlaylist = [];
let readyToCreatePlaylist = [];
class Song {
  constructor(title, artist, album, rating) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.rating = rating;
  }
}
let selectedValue = 0;

// Function that adds a song to a temporary playlist
const addSongToTemporaryPlaylist = (event) => {
  event.preventDefault();

  // Gets the selected song from the dropdown
  const selectedSong = document.querySelector('#playlist-songs').value.trim();

  // Adds the selected song to the temporary playlist array
  temporaryPlaylist.push(selectedSong);
  const array = selectedSong.split('-');
  readyToCreatePlaylist.push(
    new Song(array[0].trim(), array[1].trim(), array[2].trim(), array[3].trim())
  );

  // Displays the selected song in a list on the page
  const playlistDisplay = document.querySelector('#temporary-playlist');
  const listItem = document.createElement('li');
  listItem.textContent = selectedSong;
  playlistDisplay.appendChild(listItem);
};

// Function that handles clicking on stars to rate the playlist
const handleRatingClick = (event) => {
  const stars = document.querySelectorAll('.star');
  selectedValue = parseInt(event.target.getAttribute('data-value'));

  // Remove 'active' class from all stars
  stars.forEach((star) => star.classList.remove('active'));

  // Add 'active' class to stars up to the clicked star
  for (let i = 0; i < selectedValue; i++) {
    console.log(selectedValue);
    stars[i].classList.add('active');
  }

  // Store the selected rating value in a hidden input field
  document.querySelector('#playlist-rating-input').value = selectedValue;
};

// Attach click event listeners to stars
document.querySelectorAll('.star').forEach((star) => {
  star.addEventListener('click', handleRatingClick);
});

// Function to add playlist to the database
const newFormHandler = async (event) => {
  event.preventDefault();
  // Gets the title of the playlist from the input field
  const title = document.querySelector('#playlist-title').value.trim();
  const rating = selectedValue;
  // Checks if the title and temporary playlist are not empty
  if (title && rating) {
    // Sends the playlist title and temporary playlist to the server
    try {
      const response = await fetch(`/api/playlist`, {
        method: 'POST',
        body: JSON.stringify({ title, rating }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        for (let i = 0; i < readyToCreatePlaylist.length; i++) {
          songPost(readyToCreatePlaylist[i], data.id);
        }

        document.location.replace('/');
      } else {
        alert('Failed to create playlist');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  }
};

const songPost = async (jams, id) => {
  console.log(jams);
  const song = jams.title;
  const artist = jams.artist;
  const album = jams.album;
  const rating = jams.rating;
  const res = await fetch(`/api/song/${id}`, {
    method: 'POST',
    body: JSON.stringify({ song, artist, album, rating }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Attachs event listener to the "Add Song" button
document
  .getElementById('add-song-btn')
  .addEventListener('click', addSongToTemporaryPlaylist);

// Attach event listener to the form submit event
document
  .querySelector('.new-playlist-form')
  .addEventListener('submit', newFormHandler);
