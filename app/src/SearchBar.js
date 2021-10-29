 export default function SearchBar(props) {
    return (
        <div className="SearchBar__container">
            <input
            type="text"
            className="SearchBar__input"
            value={props.searchText}
            onChange={e => props.handleChange(e)}
            />
                <button
                className="SearchBar__Button"
                onClick={e => props.handleClick(e)}
                >
                    Buscar
                </button>
        </div>
    )
}
