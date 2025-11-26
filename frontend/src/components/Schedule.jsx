import axios from "axios";
import { useEffect, useState } from "react";

function Schedule(){

    const base_url = 'https://statsapi.mlb.com/api/v1'

    const [fullArray, setFullArray] = useState("Not Received")

    const teamLogo = {'Arizona Diamondbacks': 'https://a.espncdn.com/i/teamlogos/mlb/500/ari.png', 'Athletics': 'https://a.espncdn.com/i/teamlogos/mlb/500/ath.png', 'Atlanta Braves': 'https://a.espncdn.com/i/teamlogos/mlb/500/atl.png', 'Baltimore Orioles': 'https://a.espncdn.com/i/teamlogos/mlb/500/bal.png', 'Boston Red Sox': 'https://a.espncdn.com/i/teamlogos/mlb/500/bos.png', 'Chicago Cubs': 'https://a.espncdn.com/i/teamlogos/mlb/500/chc.png', 'Chicago White Sox': 'https://a.espncdn.com/i/teamlogos/mlb/500/chw.png', 'Cincinnati Reds': 'https://a.espncdn.com/i/teamlogos/mlb/500/cin.png', 'Cleveland Guardians': 'https://a.espncdn.com/i/teamlogos/mlb/500/cle.png', 'Colorado Rockies': 'https://a.espncdn.com/i/teamlogos/mlb/500/col.png', 'Detroit Tigers': 'https://a.espncdn.com/i/teamlogos/mlb/500/det.png', 'Houston Astros': 'https://a.espncdn.com/i/teamlogos/mlb/500/hou.png', 'Kansas City Royals': 'https://a.espncdn.com/i/teamlogos/mlb/500/kc.png', 'Los Angeles Angels': 'https://a.espncdn.com/i/teamlogos/mlb/500/laa.png', 'Los Angeles Dodgers': 'https://a.espncdn.com/i/teamlogos/mlb/500/lad.png', 'Miami Marlins': 'https://a.espncdn.com/i/teamlogos/mlb/500/mia.png', 'Milwaukee Brewers': 'https://a.espncdn.com/i/teamlogos/mlb/500/mil.png', 'Minnesota Twins': 'https://a.espncdn.com/i/teamlogos/mlb/500/min.png', 'New York Mets': 'https://a.espncdn.com/i/teamlogos/mlb/500/nym.png', 'New York Yankees': 'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png', 'Philadelphia Phillies': 'https://a.espncdn.com/i/teamlogos/mlb/500/phi.png', 'Pittsburgh Pirates': 'https://a.espncdn.com/i/teamlogos/mlb/500/pit.png', 'San Diego Padres': 'https://a.espncdn.com/i/teamlogos/mlb/500/sd.png', 'San Francisco Giants': 'https://a.espncdn.com/i/teamlogos/mlb/500/sf.png', 'Seattle Mariners': 'https://a.espncdn.com/i/teamlogos/mlb/500/sea.png', 'St. Louis Cardinals': 'https://a.espncdn.com/i/teamlogos/mlb/500/stl.png', 'Tampa Bay Rays': 'https://a.espncdn.com/i/teamlogos/mlb/500/tb.png', 'Texas Rangers': 'https://a.espncdn.com/i/teamlogos/mlb/500/tex.png', 'Toronto Blue Jays': 'https://a.espncdn.com/i/teamlogos/mlb/500/tor.png', 'Washington Nationals': 'https://a.espncdn.com/i/teamlogos/mlb/500/wsh.png'}

    useEffect(() => {  
        const getScores = async () => {

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
                    scoreArray.push(response.data.dates[0].games[i])
                }
                setFullArray(scoreArray)
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getScores()
    }, [])  


    
    if(fullArray != "Not Received") {
        return(
            <>
            <div className="mb-[75px] font-serif text-5xl text-[#2d545e]">Schedule</div>
            <div className="grid md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-25 p-5 ml-[350px] mr-[350px]">
                {fullArray.map((game) => (
                    <div key={game.gameGuid} className="flex flex-col mx-auto w-[800px] h-[400px] items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-blue/3 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                        <div className="flex">
                            <h1>{game.status.detailedState}</h1>
                        </div>
                        <div className="flex gap-x-8 mt-[25px]">
                            <div class='flex flex-col items-center'>
                                <h2 class='text-2xl text-[#2d545e]'>{game.teams.home.team.name}</h2>
                                <p class='text-5xl text-[#2d545e]'>{game.teams.home.score}</p>
                                <img class="h-[125px] w-[125px] mt-[20px]" src={game.teams.home.team.name in teamLogo ? teamLogo[game.teams.home.team.name]: ''}></img>
                            </div>
                            <div class='flex flex-col items-center'>
                                <h2 class='text-2xl text-[#2d545e]'>{game.teams.away.team.name}</h2>
                                <p class='text-5xl text-[#2d545e]'>{game.teams.away.score}</p>
                                <img class="h-[125px] w-[125px] mt-[20px]" src={game.teams.away.team.name in teamLogo ? teamLogo[game.teams.away.team.name]: ''}></img>
                            </div>
                        </div>
                    </div>
                    )
                )}
            </div>

            </>
        )
    }
}

export default Schedule