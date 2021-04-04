import React, {useState, useEffect} from 'react';
import './App.css';

import StarIcon from './svg/star_border';
import ForkIcon from './svg/fork';
import UsersIcon from './svg/2-users';
import EmailIcon from './svg/email';
import PinIcon from './svg/pin';
import LinkIcon from './svg/link';
import TwitterIcon from './svg/twitter';
import BookIcon from './svg/book';
import BookmarkIcon from './svg/bookmark';

function App() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        login: '',
        avatar: '',
        bio: '',
        followers: '',
        following: '',
        location: '',
        blog: '',
        twitter: '',
    });

    const [repos, setRepos] = useState([]);
    const [search, setSearch] = useState('MatheusGomesRocha');
    const [qtdRepos, setQtdRepos] = useState();

    const [language, setLanguage] = useState('');

    const [view, setView] = useState('Overview');

    const getData = () => {
        Promise.all([
            fetch(`https://api.github.com/users/${search}`),
            fetch(`https://api.github.com/users/${search}/repos`),
        ]).then(async (response) => {
            const userJson = await response[0].json();
            const reposJson = await response[1].json();

            setUser({
                login: userJson.login,
                name: userJson.name,
                email: userJson.email,
                avatar: userJson.avatar_url,
                bio: userJson.bio,
                followers: userJson.followers,
                following: userJson.following,
                location: userJson.location,
                blog: userJson.blog,
                twitter: userJson.twitter_username,
            });
            setRepos(reposJson);
            setQtdRepos(userJson.public_repos);
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

            <div className={"changeView"}>
                <div onClick={() => setView('Overview')} style={{marginLeft: '30%', width: 150, borderBottomColor: view == 'Overview' && '#F9826C'}} className={"defaultBtn"}>
                    <BookIcon fill={view == 'Overview' ? '#c3c6ca' : '#777'} />
                    <span style={{color: view == 'Overview' && '#C3C6CA'}} className={"defaultText"}>Overview</span>
                </div>

                <div onClick={() => setView('Repositories')} style={{width: 220, borderBottomColor: view == 'Repositories' && '#F9826C'}} className={"defaultBtn"}>
                    <BookmarkIcon fill={view == 'Repositories' ? '#c3c6ca' : '#777'} />
                    <span style={{color: view == 'Repositories' && '#C3C6CA'}} className={"defaultText"}>Repositories</span>
                    <div className={"qtdRepos"}>
                        <span style={{color: '#999', fontSize: 14}}>{qtdRepos}</span>
                    </div>
                </div>
            </div>

            <div className={"mainDiv"}>
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
                            <span style={{fontSize: 18}}>...</span>
                        </div>
                    </div>

                    <span className={"bio"}>{user.bio}</span>

                    <div className={"followAndStars"}>
                        <div className={"follow"}>
                            <UsersIcon/>
                            <span className={"followText"}><strong
                                style={{color: '#C3C6CA', marginRight: 5}}>{user.followers}</strong>followers</span>
                            <div className={"smallestBall"}></div>
                            <span className={"followText"}><strong
                                style={{color: '#C3C6CA', marginRight: 5}}>{user.following}</strong>following</span>
                            <div className={"smallestBall"}></div>
                        </div>

                        <div className={"stars"}>
                            <StarIcon/>
                            <span className={"followText"}><strong style={{color: '#C3C6CA'}}>2.1k</strong></span>
                        </div>
                    </div>

                    {user.email &&
                    <div className={"emailDiv"}>
                        <EmailIcon/>
                        <span className={"email"}>{user.email}</span>
                    </div>
                    }

                    <div className={"moreInfo"}>
                        {user.location &&
                        <div className={"defaultInfoDiv"}>
                            <PinIcon/>
                            <span className={"email"}>{user.location}</span>
                        </div>
                        }

                        {user.blog &&
                        <div className={"defaultInfoDiv"}>
                            <LinkIcon/>
                            <a href={user.blog} target={"_blank"} className={"link"}>{user.blog}</a>
                        </div>
                        }

                        {user.twitter &&
                        <div className={"defaultInfoDiv"}>
                            <TwitterIcon/>
                            <a href={"https://twitter.com/" + user.twitter} target={"_blank"}
                               className={"link"}>@{user.twitter}</a>
                        </div>
                        }
                    </div>


                </div>

                <div className={"side"}>

                    <div className={"arrayDiv"}>
                        {repos.map((item, k) => (
                            <div className={"arrayItem"} key={k}>
                                <div className={"linkDiv"}>
                                    <a className={"link"} href={item.html_url}>{item.name}</a>
                                    <span className={"description"}>{item.description}</span>
                                </div>

                                <div className={"languageDiv"}>
                                    {item.language &&
                                    <>
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
                                        }} className={"ballFull"}/>

                                        <span className={"language"}>{item.language}</span>
                                    </>
                                    }
                                    <div className={"starDiv"}>
                                        <StarIcon/>
                                        <span className={"starText"}>{item.stargazers_count}</span>
                                    </div>

                                    <div className={"forkDiv"}>
                                        <ForkIcon/>
                                        <span className={"starText"}>{item.forks}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;
