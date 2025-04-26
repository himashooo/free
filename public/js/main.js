// Set countdown to tomorrow at 9 PM
const now = new Date();
let targetDate;

// If it's already past 9 PM today, set the target to 9 PM tomorrow
if (now.getHours() >= 21) {
  targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 21, 0, 0); // 21 = 9 PM
} else {
  targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0); // 21 = 9 PM
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "🚨 Match Started!";
    return;
  }

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    `⏳ Time left: ${hours}h ${minutes}m ${seconds}s`;
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call
