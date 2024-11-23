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
