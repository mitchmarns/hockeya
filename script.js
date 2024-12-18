// Teams and players data
const teams = [
    {
        name: "Rangers",
        roster: [
            { name: "Player 1", goals: 0, assists: [], penalties: [] },
            { name: "Player 2", goals: 0, assists: [], penalties: [] },
            { name: "Player 3", goals: 0, assists: [], penalties: [] },
            { name: "Player 4", goals: 0, assists: [], penalties: [] },
            { name: "Player 5", goals: 0, assists: [], penalties: [] }
        ]
    },
    {
        name: "Devils",
        roster: [
            { name: "Player 1", goals: 0, assists: [], penalties: [] },
            { name: "Player 2", goals: 0, assists: [], penalties: [] },
            { name: "Player 3", goals: 0, assists: [], penalties: [] },
            { name: "Player 4", goals: 0, assists: [], penalties: [] },
            { name: "Player 5", goals: 0, assists: [], penalties: [] }
        ]
    },
    {
        name: "Sabres",
        roster: [
            { name: "Player 1", goals: 0, assists: [], penalties: [] },
            { name: "Player 2", goals: 0, assists: [], penalties: [] },
            { name: "Player 3", goals: 0, assists: [], penalties: [] },
            { name: "Player 4", goals: 0, assists: [], penalties: [] },
            { name: "Player 5", goals: 0, assists: [], penalties: [] }
        ]
    },
    {
        name: "Islanders",
        roster: [
            { name: "Player 1", goals: 0, assists: [], penalties: [] },
            { name: "Player 2", goals: 0, assists: [], penalties: [] },
            { name: "Player 3", goals: 0, assists: [], penalties: [] },
            { name: "Player 4", goals: 0, assists: [], penalties: [] },
            { name: "Player 5", goals: 0, assists: [], penalties: [] }
        ]
    }
];


// Simulate a game between two teams
document.getElementById("simulateGame").addEventListener("click", simulateGame);

function simulateGame() {
    const team1Select = document.getElementById("team1Select");
    const team2Select = document.getElementById("team2Select");

    const team1Index = parseInt(team1Select.value);
    const team2Index = parseInt(team2Select.value);

    if (team1Index === team2Index) {
        alert("Please select two different teams.");
        return;
    }

    const team1 = teams[team1Index];
    const team2 = teams[team2Index];

    // Simulate game logic...
    document.getElementById("team1Name").textContent = `Team 1: ${team1.name}`;
    document.getElementById("team2Name").textContent = `Team 2: ${team2.name}`;
    document.getElementById("gameResult").textContent = "Game simulation complete!";
}

    // Simulate penalties
    simulatePenalties(team1);
    simulatePenalties(team2);

    // Simulate goals for each player and assign assists
    simulateGoals(team1);
    simulateGoals(team2);

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

    // Display Penalties and Assists
    displayStats(team1, team2);
}

// Simulate penalties for a team
function simulatePenalties(team) {
    team.roster.forEach(player => {
        if (Math.random() < 0.2) {
            const penaltyType = Math.random() < 0.5 ? "Minor" : "Major";
            const penaltyTime = penaltyType === "Minor" ? 2 : 5;
            player.penalties.push(`${penaltyType} (${penaltyTime} mins)`);
        }
    });
}

// Simulate goals and assists for a team
function simulateGoals(team) {
    team.roster.forEach(player => {
        if (Math.random() < 0.5) {
            player.goals += 1;

            const numAssists = Math.floor(Math.random() * 2) + 1; // 1 or 2 assists
            const availableAssistants = team.roster.filter(p => p !== player);  // Exclude the scorer

            for (let i = 0; i < numAssists; i++) {
                const randomAssistPlayer = availableAssistants[Math.floor(Math.random() * availableAssistants.length)];
                if (!player.assists.includes(randomAssistPlayer.name)) {
                    player.assists.push(randomAssistPlayer.name);
                }
            }
        }
    });
}

// Inside the simulateGame function

const gameResult = {
    team1Name: team1.name,
    team2Name: team2.name,
    team1Goals: team1Goals,
    team2Goals: team2Goals,
    winner: result, // 'Team 1 wins!', 'Team 2 wins!', or 'It's a tie!'
};

// Get existing game history from localStorage
const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

// Add the new game to the history
gameHistory.push(gameResult);

// Save updated history back to localStorage
localStorage.setItem('gameHistory', JSON.stringify(gameHistory));

// Display penalties and assists in the UI
function displayStats(team1, team2) {
    displayPenalties(team1, "team1");
    displayPenalties(team2, "team2");

    displayAssists(team1, "team1");
    displayAssists(team2, "team2");
}

// Display penalties for each team
function displayPenalties(team, teamName) {
    const penaltiesContainer = document.getElementById(`${teamName}Penalties`);
    penaltiesContainer.innerHTML = `<h4>${team.name} Penalties:</h4>`;

    team.roster.forEach(player => {
        if (player.penalties.length > 0) {
            const penaltyList = player.penalties.map(penalty => `<li>${penalty}</li>`).join('');
            penaltiesContainer.innerHTML += `<p>${player.name}: <ul>${penaltyList}</ul></p>`;
        }
    });
}

// Display assists for each team
function displayAssists(team, teamName) {
    const assistsContainer = document.getElementById(`${teamName}Assists`);
    assistsContainer.innerHTML = `<h4>${team.name} Assists:</h4>`;

    team.roster.forEach(player => {
        if (player.assists.length > 0) {
            const assistsList = player.assists.map(assist => `<li>${assist}</li>`).join('');
            assistsContainer.innerHTML += `<p>${player.name}: <ul>${assistsList}</ul></p>`;
        }
    });
}

// Event listener for simulating the game
document.getElementById("simulateGame").addEventListener("click", simulateGame);


}
