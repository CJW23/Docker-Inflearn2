import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
    useEffect(()=> {
        //DB값 가져옴
        axios.get(`/api/values`)
            .then(response => {
                console.log("response", response)
                setLists(response.data);
            })
    }, []);

    const changeHandler = (event) => {
        setValue(event.currentTarget.value);
    };

    const [lists, setLists] = useState([]);
    const [value, setValue] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post('/api/value', {value:value})
            .then(res => {
                if(res.data.success) {
                    console.log('res ', res);
                    setLists([...lists, res.data])
                    setValue("");
                } else {
                    alert("에러");
                }
            })
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div className="container">
                    {lists && lists.map((list, index) => (
                        <li key={index}>{list.value}</li>
                    ))}<br/>
                    <form className="example" onSubmit={submitHandler}>
                        <input type="text" placeholder="입력" onChange={changeHandler} value={value}/>
                        <button type="submit">확인</button>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default App;
