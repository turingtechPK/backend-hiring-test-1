import app from "./lib/app";

const PORT = process.env.PORT || 5002;
const SERVER = process.env.SERVER || "localhost";

const serve = () =>
  app.listen(PORT, () => {
    console.log(`Project listening on port  http://${SERVER}:${PORT}`);
  });

serve();
