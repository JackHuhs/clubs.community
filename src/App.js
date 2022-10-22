import './index.css'
import axios from "axios";
import React from "react";
import { render } from '@testing-library/react';
import Resources from './resources';

/**
 * Entrypoint component for App 
 */
function App() {
  
  // Component State
  const [clubs, setClubs] = React.useState([])
  const [filteredClubs, setFilteredClubs] = React.useState([])
  
  /**
   * Get list of Clubs from API
   */
  React.useEffect(() => {
    axios.get("http://localhost:3001")
      .then((response) => {
        const results = response.data.values;
        results.splice(0, 1);
        setClubs(results);
        setFilteredClubs(results)
      })
  }, []);

  /**
   * Callback to handle typing (onChange) of the
   * search inpout field
   */
  const handleSearch = (event) => {
    const search = event.target.value
    if (search) {
      setFilteredClubs(clubs.filter((club) => 
      club[2].toLowerCase().includes(search.toLowerCase())
      || club[4].toLowerCase().includes(search.toLowerCase())))
    } else {
      setFilteredClubs(clubs)
    }
  }
  {/* For category button */}
  const handleClick = (event) => {
    const search = event.target.value
    if (search) {
      setFilteredClubs(clubs.filter((club) => 
      club[7].toLowerCase().includes(search.toLowerCase())))
    } else {
      setFilteredClubs(clubs)
    }
  }

  console.log(filteredClubs)

  const createModal = (event) => {
    console.log("In modal")
    render (
      <div id="overlay">
        <h1> Hello world. </h1>
      </div> 
    )
  }
  

  return (
    <div className="">
      {/* Example of a category button; not sure how to integrate */}
      <button className="categories" onClick={handleClick} value={"Academic"}>
        Academic
      </button>
      <input onChange={handleSearch} type="text" placeholder="Search..."/>
        <div class="container">
          {filteredClubs.map((club, index) => (
            <div key={index} className="clubs" onClick={createModal}>
                <h2 class="card-header">{club[2]}</h2>
                <p class="card-leads">{club[4]}</p>
                <p class="card-body">{club[6]}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;