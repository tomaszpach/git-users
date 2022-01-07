import React, {useState, useEffect} from 'react';
import useDebounce from "../../utils/UseDebounce";
import UsersData from "../UsersData/UsersData";
import Loader from "../../utils/Loader/Loader";

import './styles/SearchInput.scss'

const PER_PAGE = 50; // default for GitHub API is 30
const MIN_SEARCH_LENGTH = 3;
const DEBOUNCE_DELAY = 500; // value in milliseconds

const GitSearch = () => {
    const [inputState, setInputState] = useState('')
    const [isFetching, setIsFetching] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [activeElement, setActiveElement] = useState(0);
    const [tileRef, setTileRef] = useState(null)

    const debouncedSearchTerm = useDebounce(inputState, DEBOUNCE_DELAY);

    useEffect(
        () => {
            if (debouncedSearchTerm && debouncedSearchTerm.length >= MIN_SEARCH_LENGTH) {
                setIsFetching(true);
                fetch(`https://api.github.com/search/users?q=${debouncedSearchTerm}&per_page=${PER_PAGE}`, {
                    headers: {
                        'accept': 'application/vnd.github.v3.text-match+json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setIsFetching(false);
                        setUsersData(data);
                    })
                    .catch(error => console.log('ttt error', error));
            } else {
                setUsersData([]);
            }
        }, [debouncedSearchTerm]
    );


    const handleKeyStrokes = (event) => {
        if (event.keyCode === 38 && activeElement > 0) {
            setActiveElement(activeElement - 1);
            tileRef && tileRef.current.scrollIntoView({block: "center", inline: "nearest"});
            event.preventDefault();
        } else if (event.keyCode === 40 && activeElement < 50) {
            setActiveElement(activeElement + 1);
            tileRef && tileRef.current.scrollIntoView({block: "center", inline: "nearest"});
            event.preventDefault();
        } else if (event.keyCode === 13 && usersData.total_count > 0) {
            window.open(usersData?.items[activeElement].html_url, '_blank');
        }
    }

    return (
        <div className="search-input">
            <h1>Git search</h1>
            <h4>Search input</h4>
            <input
                autoFocus
                value={inputState} type="text"
                placeholder="Search for git users..."
                onKeyDown={(e) => handleKeyStrokes(e)}
                onChange={(e) => setInputState(e.target.value)}
            />

            {isFetching ? <Loader /> : <UsersData activeElement={activeElement} data={usersData} inputState={inputState} activeElementRef={(ref) => setTileRef(ref)} />}
        </div>
    )
}

export default GitSearch;
