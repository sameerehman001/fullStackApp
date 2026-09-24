import express from "express";
import "dotenv/config";
import ejs from 'ejs';
import * as path from "path";
import { fileURLToPath } from "url";
import { sendMail } from "./config/mail.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
// app.get("/",(req:Request, res:Response)=>{
//     return res.render("emails/welcome", {name: "samee ur Rehman"});
// })
app.get("/", async (req, res) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
        name: "samee ur rehman",
    });
    await sendMail("bowob15534@bullbaby.com", "Testing SMTP", html);
    return res.json({ msg: "Email send successfully" });
});
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
