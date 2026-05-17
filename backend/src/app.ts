import express from "express";
import cors from "cors";

import tipSobeRoutes from "./routes/tipSobeRoutes";
import odjelRoutes from "./routes/OdjelRoutes";
import sobaRoutes from "./routes/sobaRoutes";
import tipOdjelaRoutes from "./routes/tipOdjelaRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tipovi-soba", tipSobeRoutes);
app.use("/odjeli", odjelRoutes);
app.use("/sobe", sobaRoutes);
app.use("/api/tipovi-odjela", tipOdjelaRoutes);

app.get("/", (req, res) => {
  res.send("Backend radi!");
});

const PORT = 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server radi na portu ${PORT}`);
  });
}

export default app;