// == Import
import State from 'src/components/State';
import { useSelector } from 'react-redux';

import bombLogo from './bomb_icon.svg';
import './styles.css';

// == Composant
function App() {
  const gameState = useSelector((state) => (state.game.state));
  const stepsStyle = {
    left: `${-(gameState * 100) + 100}vw`,
  };
  return (
    <div className="app">
      <State />

      <div className="steps" style={stepsStyle}>

        <div className="home step step-1">
          <img className="game-logo" src={bombLogo} alt="Game Logo" />
          <h1 className="game-title">Pass the bomb !</h1>
        </div>

        <div className="mode step step-2">
          <h1 className="game-title">Mode de jeu</h1>
        </div>

        <div className="first-player step step-3">
          <h1 className="game-title">Tirage du premier joueur</h1>
        </div>

        <div className="game step step-4">
          <h1 className="game-title">JEU !</h1>
          <img className="game-logo" src={bombLogo} alt="Game Logo" />
        </div>

      </div>

    </div>
  );
}

// == Export
export default App;
