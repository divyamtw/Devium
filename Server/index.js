import app from "./src/app.js";
import connectDB from "./src/config/index.js";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Something went wrong while connecting db!");
  });
