import React, { Component } from 'react';
import './App.css'
import axios from 'axios';
import DisplaySong from './DisplaySong/DisplaySong';
import CreateSong from './CreateSong/CreateSong';
import SearchBar from './SearchBar/SearchBar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        };
    }

    componentDidMount(){
        this.getSongs();
    }

    getSongs = async () => {
        let response = await axios.get('http://127.0.0.1:8000/music/')
        this.setState({
            songs: response.data
        });
    }

    deleteSongs = async (id) => {
        let response = await axios.delete('http://127.0.0.1:8000/music/' + id + '/')
        this.setState({
            songs: response.data
        });
    }

    filterSongs = (filtered) => {
        this.setState({
            songs:filtered
        });
    }

    render() {
        return (
            <div class='container'>
                <h1>Music Library</h1>
                <SearchBar search={this.state.songs} filterAction={this.filterSongs}/>
                {this.state.songs.length > 0 && <DisplaySong deleted={this.deleteSongs} songs={this.state.songs} />}
                <CreateSong />
            </div>
                
            
        
        )
    }
}

export default App  