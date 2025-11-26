import axios from "axios";

const base_url = 'https://statsapi.mlb.com/api/v1'

export const getScores = async () => {

    const scoreArray = []

    try {
        const response = await axios.get(`${base_url}/schedule`, {
            params: {
                "sportId": 1,
                "startDate": "07/25/2025",
                "endDate": "07/25/2025",
            }
        });
        for(const i in response.data.dates[0].games) {
            scoreArray.push(response.data.dates[0].games[i].teams)
        }
    } catch (error) {
        console.log('Error:', error)
    }

    return(
        <>
        {scoreArray.map((game) => (
            <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                <h2 key={game.home.team.name}></h2>
                <p key={game.home.score}></p>
                <h2 key={game.away.team.name}></h2>
                <p key={game.away.score}></p>
            </div>
        )
        )}

        </>
    )


}