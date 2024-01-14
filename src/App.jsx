import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './App.css';
import { fetchData } from './services/api';
import EpisodeList from './pages/EpisodeList';
import EpisodeDetail from './pages/EpisodeDetail';
import CharacterDetail from './pages/CharacterDetail';
import CharacterList from './pages/CharacterList';
import Account from './pages/Account';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <Router>
      <div>
        <Navbar onSearch={handleSearch} />
        {data && <p>Data from API: {JSON.stringify(data)}</p>}
        <Switch>
          <Route path="/account/" component={Account} />
          <Route path="/" exact component={EpisodeList} />
          <Route path="/episodes/:id" component={EpisodeDetail} />
          <Route path="/characters/:id" component={CharacterDetail} />
          <Route path="/character/" component={CharacterList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;