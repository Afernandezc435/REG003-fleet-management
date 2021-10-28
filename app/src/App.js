import SearchBar from './SearchBar'
import React from 'react'
import Recents from './Recents'

 export default class App extends  React.Component {
    state = {
        searchText: '',
        showResults: false,
    };
    hanleInputChange = event => {
        this.setState({ searchText:  event.target.value})
    }
    handleButtonClick = () => {
        this.setSate({ showResults: true})
    }
    render () {
        const { searchText, showResults} = this.state;
        return (
            <React.Fragment>
                <SearchBar
                searchText={searchText}
                handleChange={this.handleChange}
                handleClick={this.handleClick}
                />
                {!!showResults && <gift search={searchText} />}
            </React.Fragment>
        )
    }
}
