import logo from './logo.svg';
import './App.css';
import ProgressBar from "@ramonak/react-progress-bar";


/*async*/ function getTank() {
  return TANK_DATA;
  // const r = (await fetch(`${API_ROOT}/tank`)).json();
  // console.dir(r);
}

/*async*/ function getFlow() {
  return FLOW_DATA;
}

function Tank() {
  const { level, volume, max, unit, lunit, when } = getTank(); // todo: async
  const lfmt = new Intl.NumberFormat([], {style: "unit", unit: lunit, unitDisplay: "short", maximumFractionDigits: 1});
  const vfmt = new Intl.NumberFormat([], {style: "unit", unit: unit, unitDisplay: "short", maximumFractionDigits: 0});
  const pfmt = new Intl.NumberFormat([], {style: "percent", maximumFractionDigits: 0});
  const ratio = volume / max;
  const percent = ratio * 100.0;
  return (
    <div>
      <h4>Tank</h4>
      <ProgressBar completed={percent} customLabel={pfmt.format(ratio)} />
      <p>{lfmt.format(level)} | <b>{vfmt.format(volume)}</b> / {vfmt.format(max)} </p>
      <i>{ new Date(when).toLocaleString() }</i>
    </div>
  );
}

function Flow() {
  const { reading, unit, when } = getFlow(); // todo: async
  const vfmt = new Intl.NumberFormat([], {style: "unit", unit: unit, unitDisplay: "short", maximumFractionDigits: 0});
  return (
    <div>
      <h4>Meter</h4>
      <h1 style={{ borderRadius: "50%", padding: "1em", color: "black", backgroundColor: "white", border: "1px solid gray" }}>{vfmt.format(reading)} </h1>
      <i>{ new Date(when).toLocaleString() }</i>
    </div>
  );
}

function App() {
  const t = Tank();
  return (
    <div className="App">
      <header className="App-header">
      <div style={{ padding: "1em", border: "1px solid green" }}>
          {
            Tank()
          }
        </div>
        <div style={{ padding: "1em", border: "1px solid green" }}>
          {
            Flow()
          }
        </div>
      </header>
    </div>
  );
}

export default App;
