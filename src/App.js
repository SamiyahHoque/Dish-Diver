import React from 'react';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/results">Results</Link>
            </li>
          </ul>
        </nav>

        <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/results" component={Results} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
