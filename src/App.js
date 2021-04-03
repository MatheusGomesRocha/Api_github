import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [user, setUser] = useState({
        name: '',
        login: '',
        avatar: '',
    });

    const [repos, setRepos] = useState([]);


    const [search, setSearch] = useState('MatheusGomesRocha');

    const getData = () => {
        Promise.all([
            fetch(`https://api.github.com/users/${search}`),
            fetch(`https://api.github.com/users/${search}/repos`),
        ]).then(async (response) => {
            const userJson = await response[0].json();
            const reposJson = await response[1].json();

            setUser({login: userJson.login, name: userJson.name, avatar: userJson.avatar_url});
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
        <div className="App">

            <input onChange={userSearch} className={"input"}/>
            <div className={"btn"} onClick={getData}>
                olá mundo
            </div>

            <img width="100px" height={"100px"} src={user.avatar}/>

            {repos.map((item, k) => (
                <div key={k}>
                    <span>{item.name}</span>
                    <span>{item.language}</span>
                </div>
            ))}

        </div>
    );
}

export default App;
