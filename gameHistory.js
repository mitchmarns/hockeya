window.addEventListener('DOMContentLoaded', () => {
    // Get the past game results from localStorage
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

    const tableBody = document.querySelector('#gameHistoryTable tbody');
    
    // If there are past games, populate the table
    if (gameHistory.length > 0) {
        gameHistory.forEach((game, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Game ${index + 1}</td>
                <td>${game.team1Name}</td>
                <td>${game.team2Name}</td>
                <td>${game.team1Goals} - ${game.team2Goals}</td>
                <td>${game.winner}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
        row.innerHTML = "<td colspan='5'>No games recorded yet.</td>";
        tableBody.appendChild(row);
    }
});
