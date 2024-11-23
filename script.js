// Teams and players data
const teams = [
    {
        name: "The Sharks",
        roster: [
            { name: "Player 1", goals: 0, assists: [], penalties: [] },
            { name: "Player 2", goals: 0, assists: [], penalties: [] },
            { name: "Player 3", goals: 0, assists: [], penalties: [] },
            { name: "Player 4", goals: 0, assists: [], penalties: [] },
            { name: "Player 5", goals: 0, assists: [], penalties: [] }
        ]
    },
    {
        name: "The Eagles",
        roster: [
            { name: "Player 1", goals: 0, assists: [], penalties: [] },
            { name: "Player 2", goals: 0, assists: [], penalties: [] },
            { name: "Player 3", goals: 0, assists: [], penalties: [] },
            { name: "Player 4", goals: 0, assists: [], penalties: [] },
            { name: "Player 5", goals: 0, assists: [], penalties: [] }
        ]
    },
    {
        name: "The Wolves",
        roster: [
            { name: "Player 1", goals: 0, assists: [], penalties: [] },
            { name: "Player 2", goals: 0, assists: [], penalties: [] },
            { name: "Player 3", goals: 0, assists: [], penalties: [] },
            { name: "Player 4", goals: 0, assists: [], penalties: [] },
            { name: "Player 5", goals: 0, assists: [], penalties: [] }
        ]
    },
    {
        name: "The Bears",
        roster: [
            { name: "Player 1", goals: 0, assists: [], penalties: [] },
            { name: "Player 2", goals: 0, assists: [], penalties: [] },
            { name: "Player 3", goals: 0, assists: [], penalties: [] },
            { name: "Player 4", goals: 0, assists: [], penalties: [] },
            { name: "Player 5", goals: 0, assists: [], penalties: [] }
        ]
    }
];

// Display teams and rosters in HTML (for the main page)
function displayTeams() {
    const team1Select = document.getElementById('team1Select');
    const team2Select = document.getElementById('team2Select');

    teams.forEach((team, index) => {
        // Populate dropdowns with team names
        const option1 = document.createElement('option');
        option1.value = index;
        option1.textContent = team.name;
        team1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = index;
        option2.textContent = team.name;
        team2Select.appendChild(option2);
    });
}

// Display team rosters on the roster page
function displayRosters() {
    // Loop through each team and populate the roster list
    teams.forEach((team, index) => {
        const teamRosterElement = document.getElementById(`${team.name.replace(" ", "").toLowerCase()}Roster`);
        const ul = teamRosterElement.querySelector('ul');
        
        team.roster.forEach(player => {
            const li = document.createElement('li');
            li.textContent = player.name;
            ul.appendChild(li);
        });
    });
}

//simulate the game
// Simulate a game between two teams
function simulateGame() {
    // Get selected teams from dropdowns
    const team1Index = parseInt(document.getElementById("team1Select").value);
    const team2Index = parseInt(document.getElementById("team2Select").value);

    const team1 = teams[team1Index];
    const team2 = teams[team2Index];

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
        // Randomly assign a penalty (minor or major)
        if (Math.random() < 0.2) {  // 20% chance of getting a penalty
            const penaltyType = Math.random() < 0.5 ? "Minor" : "Major";
            const penaltyTime = penaltyType === "Minor" ? 2 : 5; // 2 minutes or 5 minutes
            player.penalties.push(`${penaltyType} (${penaltyTime} mins)`);
        }
    });
}

// Simulate goals and assists for a team
function simulateGoals(team) {
    team.roster.forEach(player => {
        // 50% chance for each player to score a goal
        if (Math.random() < 0.5) {
            player.goals += 1;

            // Select random players for assists (up to 2 players for each goal)
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

// Display penalties and assists in the UI
function displayStats(team1, team2) {
    // Display penalties for both teams
    displayPenalties(team1, "team1");
    displayPenalties(team2, "team2");

    // Display assists for both teams
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

// On page load, check the current page
window.onload = function() {
    const currentPage = window.location.pathname.split("/").pop();
    
    if (currentPage === "roster.html") {
        // If the user is on the roster page, display the rosters
        displayRosters();
    } else {
        // Otherwise, display the teams for game simulation
        displayTeams();
    }

    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) {
        Object.assign(teams, JSON.parse(savedTeams)); // Load saved data
    }
};

// Event listener for the "Simulate Game" button
document.getElementById("simulateGame")?.addEventListener("click", simulateGame);
