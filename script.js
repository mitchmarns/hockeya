// Teams and players
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

// Display teams and rosters in HTML
function displayTeams() {
    teams.forEach((team, index) => {
        const teamRoster = document.getElementById(`team${index + 1}-roster`);
        team.roster.forEach(player => {
            const li = document.createElement('li');
            li.textContent = `${player.name} - Goals: ${player.goals}`;
            teamRoster.appendChild(li);
        });
    });
}

// Simulate a game between two teams
function simulateGame() {
    // Randomize goals for each player (between 0 and 3 goals)
    teams.forEach(team => {
        team.roster.forEach(player => {
            player.goals = Math.floor(Math.random() * 4); // 0-3 goals per player
        });
    });

    // Update the scoreboard
    updateScoreboard();

    // Display winner or tie
    const teamGoals = teams.map(team => team.roster.reduce((acc, player) => acc + player.goals, 0));
    let result;
    const maxGoals = Math.max(...teamGoals);
    const winningTeams = teams.filter((team, index) => teamGoals[index] === maxGoals);
    if (winningTeams.length === 1) {
        result = `${winningTeams[0].name} wins!`;
    } else {
        result = "It's a tie!";
    }

    document.getElementById("gameResult").textContent = result;

    // Save stats to localStorage (optional)
    localStorage.setItem('teams', JSON.stringify(teams));
}

// Update the scoreboard
function updateScoreboard() {
    teams.forEach((team, index) => {
        const teamGoals = team.roster.reduce((acc, player) => acc + player.goals, 0);
        document.getElementById(`team${index + 1}Goals`).textContent = teamGoals;
    });
}

// On page load, display teams and load saved data
window.onload = function() {
    displayTeams();
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) {
        teams.length = 0; // Clear the teams array
        Object.assign(teams, JSON.parse(savedTeams)); // Load saved data
    }
};

// Event listener for the "Simulate Game" button
document.getElementById("simulateGame").addEventListener("click", simulateGame);
