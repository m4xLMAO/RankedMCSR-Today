async function fetchTodayStats() {
    const username = document.getElementById('username').value;
    if (!username) return;

    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = 'Fetching data...';

    try {
        // Only call your Vercel backend
        const response = await fetch(`https://ranked-mcsr-today.vercel.app/api/fetch-stats?username=${username}`);
        const data = await response.json();

        if (data.error) {
            statsDiv.innerHTML = `<p class="error">Error: ${data.error}</p>`;
        } else {
            const { totalEloChange, wonMatchesCount, lossMatchesCount, drawCount } = data;
            const totalMatches = wonMatchesCount + lossMatchesCount;
            const winPercentage = totalMatches ? ((wonMatchesCount / totalMatches) * 100).toFixed(2) + '%' : 'Undefined (division by zero)';

            statsDiv.innerHTML = `
                <h3>${username}'s Stats for Today</h3>
                <p><strong>Elo Change:</strong> ${totalEloChange}</p>
                <p><strong>Record:</strong> ${wonMatchesCount} Wins - ${lossMatchesCount} Losses (${winPercentage}) - ${drawCount} Draws</p>
            `;
        }
    } catch (error) {
        statsDiv.innerHTML = `<p class="error">Error: Unable to fetch data.</p>`;
    }
}
