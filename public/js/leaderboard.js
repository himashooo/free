// public/js/leaderboard.js

fetch('/entries')  // This will hit the backend endpoint that returns all the registered entries
  .then(res => res.json())  // Parse the response into JSON
  .then(data => {
    const list = document.getElementById('leaderboard');  // Get the leaderboard container
    list.innerHTML = "";  // Clear placeholder text

    data.forEach((entry, i) => {
      const item = document.createElement('div');  // Create a new div for each player
      item.innerHTML = `
        <p><b>${i + 1}. ${entry.name}</b> (UID: ${entry.uid})</p>
        <img src="${entry.screenshot}" width="150"><hr>  <!-- Show the payment screenshot -->
      `;
      list.appendChild(item);  // Add each player item to the leaderboard
    });
  })
  .catch(error => {
    console.error("Error loading leaderboard:", error);
  });
