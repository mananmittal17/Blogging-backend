let express = require('express')
const formValidation = require('./valiadtion')
const app = express();
const route = require('./router/postRoute')
const getRoute = require("./router/getRoute")
const cors = require('cors');
app.use(express.json());

app.use(cors({
  origin: '*'
}));



app.use("/blogger" , route)
app.use("/" , getRoute)
app.listen(8080, () => {
  console.log("nskbvkfds")
})