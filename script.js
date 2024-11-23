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
function simulateGame() {
    const team1Index = parseInt(document.getElementById("team1Select").value);
    const team2Index = parseInt(document.getElementById("team2Select").value);

    const team1 = teams[team1Index];
    const team2 = teams[team2Index];

    simulatePenalties(team1);
    simulatePenalties(team2);
    simulateGoals(team1);
    simulateGoals(team2);

    const team1Goals = team1.roster.reduce((acc, player) => acc + player.goals, 0);
    const team2Goals = team2.roster.reduce((acc, player) => acc + player.goals, 0);

    document.getElementById("team1Goals").textContent = team1Goals;
    document.getElementById("team2Goals").textContent = team2Goals;
    document.getElementById("team1Name").textContent = `Team 1: ${team1.name}`;
    document.getElementById("team2Name").textContent = `Team 2: ${team2.name}`;

    let result;
    if (team1Goals > team2Goals) {
        result = `${team1.name} wins!`;
    } else if (team2Goals > team1Goals) {
        result = `${team2.name} wins!`;
    } else {
        result = "It's a tie!";
    }

    document.getElementById("gameResult").textContent = result;

    localStorage.setItem('teams', JSON.stringify(teams));

    displayStats(team1, team2);
}

function simulatePenalties(team) {
    team.roster.forEach(player => {
        if (Math.random() < 0.2) {
            const penaltyType = Math.random() < 0.5 ? "Minor" : "Major";
            const penaltyTime = penaltyType === "Minor" ? 2 : 5;
            player.penalties.push(`${penaltyType} (${penaltyTime} mins)`);
        }
    });
}

function simulateGoals(team) {
    team.roster.forEach(player => {
        if (Math.random() < 0.5) {
            player.goals += 1;

            const numAssists = Math.floor(Math.random() * 2) + 1;
            const availableAssistants = team.roster.filter(p => p !== player);

            for (let i = 0; i < numAssists; i++) {
                const randomAssistPlayer = availableAssistants[Math.floor(Math.random() * availableAssistants.length)];
                if (!player.assists.includes(randomAssistPlayer.name)) {
                    player.assists.push(randomAssistPlayer.name);
                }
            }
        }
    });
}

function displayStats(team1, team2) {
    displayPenalties(team1, "team1");
    displayPenalties(team2, "team2");
    displayAssists(team1, "team1");
    displayAssists(team2, "team2");
}

function displayPenalties(team, teamName) {
    const penaltiesContainer = document.getElementById(`${teamName}Penalties`);
    penaltiesContainer.innerHTML = `<h4>${team.name} Penalties:</h4>`;
    team.roster.forEach(player => {
        if (player.penalties.length > 0) {
            const penaltyList = player.penalties.map(penalty => `<li>${penalty}</li>`).join('');
            penaltiesContainer.innerHTML += `<p>${player.name}: <ul>${penaltyList}</ulHere's the complete code with the updated team names (Rangers, Devils, Sabres, Islanders). Please make sure that you have two HTML files (`index.html` and `roster.html`), and the JavaScript file (`script.js`) is included.

### **index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hockey Game Simulator</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .team-selection { margin-bottom: 20px; }
        #gameStats { margin-top: 20px; }
        h3 { margin-top: 10px; }
        ul { list-style-type: none; padding: 0; }
        li { padding: 2px 0; }
    </style>
</head>
<body>

    <h1>Hockey Game Simulator</h1>

    <div class="team-selection">
        <label for="team1Select">Select Team 1: </label>
        <select id="team1Select"></select>
        
        <label for="team2Select">Select Team 2: </label>
        <select id="team2Select"></select>
        
        <button id="simulateGame">Simulate Game</button>
    </div>

    <h3 id="team1Name"></h3>
    <h3 id="team2Name"></h3>

    <div>
        <p><strong>Score:</strong></p>
        <p>Team 1: <span id="team1Goals">0</span></p>
        <p>Team 2: <span id="team2Goals">0</span></p>
    </div>

    <p id="gameResult"></p>

    <div id="gameStats">
        <div id="team1Penalties"></div>
        <div id="team1Assists"></div>
        <div id="team2Penalties"></div>
        <div id="team2Assists"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
