import express from "express";
import { AdminRoute, VandorRoute } from "./routes";
import { CreateVandor, GetVandor, GetVandorByID } from "./controllers";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { MONGO_URL } from "./config";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", AdminRoute);
app.use("/Vandor", VandorRoute);
mongoose.connect(MONGO_URL).then(result => {
    // console.log('result', result);    
    console.log('connectd with database');
    
}).catch(err => console.log('err', err)
)
app.listen(8000, () => {
  console.clear();
  console.log("App is listing port no. 8000");
});
