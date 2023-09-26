import "dotenv/config";
import cors from "cors";
import express from "express";
import uploadRoute from "./infraestrucuture/route/product.route";

export const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", parameterLimit: 50000 }));

const PORT = process.env.PORT || 3003;

app.get("/", (_req, res) => {
  res.send("¡Hellow from Express and TypeScript!");
});

app.use(uploadRoute);

export const server = app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
