import { useState } from "react";

import TipoviSobaPage from "./pages/Sifrarnik";
import MasterDetailPage from "./pages/MasterDetailPage";

function App() {
  const [stranica, setStranica] = useState("master-detail");

  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setStranica("master-detail")}>
          Master-detail
        </button>

        <button onClick={() => setStranica("tipovi-soba")}>
          Šifrarnici za tip odjela i tip sobe
        </button>
      </nav>

      {stranica === "master-detail" && <MasterDetailPage />}

      {stranica === "tipovi-soba" && <TipoviSobaPage />}
    </div>
  );
}

export default App;