// Function to simulate the game
function simulateGame() {
    // Randomly assign goals to player 1 and player 2
    const player1Goals = Math.floor(Math.random() * 10); // 0-9 goals
    const player2Goals = Math.floor(Math.random() * 10); // 0-9 goals

    // Update the scoreboard
    document.getElementById("player1Goals").textContent = player1Goals;
    document.getElementById("player2Goals").textContent = player2Goals;

    // Display the result
    const result = player1Goals > player2Goals ? "Player 1 wins!" :
                  player2Goals > player1Goals ? "Player 2 wins!" :
                  "It's a tie!";
    
    document.getElementById("gameResult").textContent = result;

    // Optionally, store stats in localStorage
    localStorage.setItem('player1Goals', player1Goals);
    localStorage.setItem('player2Goals', player2Goals);
}

// Event listener for the "Simulate Game" button
document.getElementById("simulateGame").addEventListener("click", simulateGame);

// Load stored stats from localStorage (if any)
window.onload = function() {
    const savedPlayer1Goals = localStorage.getItem('player1Goals');
    const savedPlayer2Goals = localStorage.getItem('player2Goals');
    
    if (savedPlayer1Goals !== null && savedPlayer2Goals !== null) {
        document.getElementById("player1Goals").textContent = savedPlayer1Goals;
        document.getElementById("player2Goals").textContent = savedPlayer2Goals;
    }
};
