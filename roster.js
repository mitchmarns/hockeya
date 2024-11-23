window.addEventListener('DOMContentLoaded', () => {
    const teams = JSON.parse(localStorage.getItem('teams'));

    if (teams && teams.length > 0) {
        teams.forEach((team) => {
            const rosterList = document.getElementById(`${team.name.toLowerCase()}RosterList`);
            if (rosterList) {
                team.roster.forEach(player => {
                    const listItem = document.createElement('li');
                    listItem.textContent = player.name;
                    rosterList.appendChild(listItem);
                });
            }
        });
    } else {
        console.error('No teams found in localStorage');
    }
});
