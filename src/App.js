import React, {useState, useEffect} from 'react';
import './App.css';

import StarIcon from './svg/star_border';
import ForkIcon from './svg/fork';
import UsersIcon from './svg/2-users';

function App() {
    const [user, setUser] = useState({
        name: '',
        login: '',
        avatar: '',
        bio: '',
    });

    const [repos, setRepos] = useState([]);
    const [search, setSearch] = useState('MatheusGomesRocha');

    const [language, setLanguage] = useState('');

    const getData = () => {
        Promise.all([
            fetch(`https://api.github.com/users/${search}`),
            fetch(`https://api.github.com/users/${search}/repos`),
        ]).then(async (response) => {
            const userJson = await response[0].json();
            const reposJson = await response[1].json();

            setUser({login: userJson.login, name: userJson.name, avatar: userJson.avatar_url, bio: userJson.bio});
            setRepos(reposJson);
        })
    }

    useEffect(() => {
        getData();
    }, [setSearch])


    const userSearch = (v) => {
        setSearch(v.target.value);
    }

    return (
        <div className="app">
            <div className={"side"}>
                <input onChange={userSearch} className={"input"}/>
                <div className={"btn"} onClick={getData}>
                    olá mundo
                </div>

                <img className={"img"} src={user.avatar}/>

                <div className={"userInfo"}>
                    <span className={"name"}>{user.name}</span>
                    <span className={"login"}>{user.login}</span>
                </div>

                <div className={"btns"}>
                    <div style={{alignItems: 'center'}} className={"btn"}>
                        <span>Follow</span>
                    </div>
                    <div className={"btn"}>
                        <span style={{fontSize: 18}} >...</span>
                    </div>
                </div>

                <span className={"bio"}>{user.bio}</span>

                <div className={"ratingAndFork"}>
                    <UsersIcon />
                    <StarIcon />
                </div>
            </div>

            <div className={"side"}>

                <div className={"arrayDiv"}>
                    {repos.map((item, k) => (
                        <div className={"arrayItem"} key={k}>
                            <div className={"linkDiv"}>
                                <a className={"link"} href={item.html_url}>{item.name}</a>
                            </div>

                            <div className={"languageDiv"}>
                                <div style={{
                                    backgroundColor:
                                        item.language == 'JavaScript' && '#F1E05A' ||
                                        item.language == 'Java' && '#B07219' ||
                                        item.language == 'HTML' && '#E34C26' ||
                                        item.language == 'Python' && '#3572A5' ||
                                        item.language == 'GO' && '#00ADD8' ||
                                        item.language == 'Shell' && '#89E051' ||
                                        item.language == 'C' && '#555555' ||
                                        item.language == 'PHP' && '#4F5D95' ||
                                        item.language == 'PowerShell' && '#012456' ||
                                        item.language == 'Pascal' && '#E3F171' ||
                                        item.language == 'C++' && '#F34B7D' ||
                                        item.language == 'Assembly' && '#6E4C13' ||
                                        item.language == 'Ruby' && '#701516' ||
                                        '#fff'
                                }} className={"ballFull"} />
                                <span className={"language"}>{item.language}</span>

                                <div className={"star"}>
                                    <span className={"language"}>Stars - {item.stargazers_count}</span>
                                </div>

                                <div className={"fork"}>
                                    <span className={"language"}>{item.forks}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default App;
