document.addEventListener('DOMContentLoaded', function () {
  // Get all songs
  const songs = document.querySelectorAll('.song');

  // Loop through each song
  songs.forEach((song) => {
    // Get the corresponding song title and details
    const songTitle = song.querySelector('.song-title');
    const details = song.querySelector('.details');

    // Add click event listener to each song title
    songTitle.addEventListener('click', function () {
      // Toggle the 'hidden' class of the details div for this song
      details.classList.toggle('hidden');
    });
  });
});
