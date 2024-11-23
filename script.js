// Teams and players data
const teams = [
    {
        name: "The Sharks",
        roster: [
            { name: "Player 1", goals: 0 },
            { name: "Player 2", goals: 0 },
            { name: "Player 3", goals: 0 },
            { name: "Player 4", goals: 0 },
            { name: "Player 5", goals: 0 }
        ]
    },
    {
        name: "The Eagles",
        roster: [
            { name: "Player 1", goals: 0 },
            { name: "Player 2", goals: 0 },
            { name: "Player 3", goals: 0 },
            { name: "Player 4", goals: 0 },
            { name: "Player 5", goals: 0 }
        ]
    },
    {
        name: "The Wolves",
        roster: [
            { name: "Player 1", goals: 0 },
            { name: "Player 2", goals: 0 },
            { name: "Player 3", goals: 0 },
            { name: "Player 4", goals: 0 },
            { name: "Player 5", goals: 0 }
        ]
    },
    {
        name: "The Bears",
        roster: [
            { name: "Player 1", goals: 0 },
            { name: "Player 2", goals: 0 },
            { name: "Player 3", goals: 0 },
            { name: "Player 4", goals: 0 },
            { name: "Player 5", goals: 0 }
        ]
    }
];

// Simulate a game between two teams
function simulateGame() {
    // Get selected teams from dropdowns
    const team1Index = parseInt(document.getElementById("team1Select").value);
    const team2Index = parseInt(document.getElementById("team2Select").value);

    const team1 = teams[team1Index];
    const team2 = teams[team2Index];

    // Simulate goals for each player (0-1 goals per player)
    team1.roster.forEach(player => {
        player.goals = Math.floor(Math.random() * 2); // 0 or 1 goal per player
    });
    team2.roster.forEach(player => {
        player.goals = Math.floor(Math.random() * 2); // 0 or 1 goal per player
    });

    // Calculate total goals for each team
    const team1Goals = team1.roster.reduce((acc, player) => acc + player.goals, 0);
    const team2Goals = team2.roster.reduce((acc, player) => acc + player.goals, 0);

    // Update the scoreboard
    document.getElementById("team1Goals").textContent = team1Goals;
    document.getElementById("team2Goals").textContent = team2Goals;

    // Display the team names
    document.getElementById("team1Name").textContent = `Team 1: ${team1.name}`;
    document.getElementById("team2Name").textContent = `Team 2: ${team2.name}`;

    // Determine winner or tie
    let result;
    if (team1Goals > team2Goals) {
        result = `${team1.name} wins!`;
    } else if (team2Goals > team1Goals) {
        result = `${team2.name} wins!`;
    } else {
        result = "It's a tie!";
    }

    document.getElementById("gameResult").textContent = result;

    // Optionally, save the stats to localStorage
    localStorage.setItem('teams', JSON.stringify(teams));
}

// On page load, display the teams and rosters (if needed)
window.onload = function() {
    displayTeams();
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) {
        // Load saved data from localStorage
        Object.assign(teams, JSON.parse(savedTeams));
    }
};

// Event listener for the "Simulate Game" button
document.getElementById("simulateGame").addEventListener("click", simulateGame);
