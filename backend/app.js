const express = require('express');
const app = express();
const cors = require('cors');
const routes = require("./routes");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes); 

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json(
    { 
        error: err.message || 'Server error' 
    }
);
});

const PORT = process.env.PORT || 4000;

if (require.main === module) 
{
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
