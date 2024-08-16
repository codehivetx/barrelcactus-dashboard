/**
 * Copyright © 2024 Code Hive Tx, LLC
 *
 * SPDX-License: Apache-2.0
 */
import './App.css';
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import * as LOCAL_CONFIG from "./local-config.json";

const { API_ROOT } = LOCAL_CONFIG;

async function getTank() {
  return (await fetch(`${API_ROOT}/tank`)).json();
}

async function getFlow() {
  return (await fetch(`${API_ROOT}/flow`)).json();
}

function Tank() {
  const [tankData, updateTankData] = useState({});

  function update() {
    updateTankData({ ...tankData, updating: true });
    getTank().then((d) => updateTankData(d));
  }

  if (tankData.updating) {
    return <i>updating</i>;
  }

  if (!tankData.when) {
    update();
    return;
  }

  const { level, volume, max, unit, lunit, when } = tankData;
  const lfmt = new Intl.NumberFormat([], { style: "unit", unit: lunit, unitDisplay: "short", maximumFractionDigits: 1 });
  const vfmt = new Intl.NumberFormat([], { style: "unit", unit: unit, unitDisplay: "short", maximumFractionDigits: 0 });
  const pfmt = new Intl.NumberFormat([], { style: "percent", maximumFractionDigits: 0 });
  const ratio = volume / max;
  const percent = ratio * 100.0;

  return (
    <div>
      <h4>Tank</h4>
      <ProgressBar completed={percent} customLabel={pfmt.format(ratio)} />
      <p>{lfmt.format(level)} | <b>{vfmt.format(volume)}</b> / {vfmt.format(max)} </p>
      <i onClick={() => update()}>↻ {new Date(when).toLocaleString()}</i>
    </div>
  );
}

function Flow() {

  const [flowData, updateFlowData] = useState({});

  function update() {
    updateFlowData({ ...flowData, updating: true });
    getFlow().then((d) => updateFlowData(d));
  }

  if (flowData.updating) {
    return <i>updating</i>;
  }

  if (!flowData.when) {
    update();
    return;
  }

  const { reading, unit, when } = flowData;
  const vfmt = new Intl.NumberFormat([], { style: "unit", unit: unit, unitDisplay: "short", maximumFractionDigits: 0 });
  return (
    <div>
      <h4>Meter</h4>
      <h1 style={{ borderRadius: "50%", padding: "1em", color: "black", backgroundColor: "white", border: "1px solid gray" }}>{vfmt.format(reading)} </h1>
      <i onClick={() => update()}>↻ {new Date(when).toLocaleString()}</i>
    </div>
  );
}

function App() {
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
