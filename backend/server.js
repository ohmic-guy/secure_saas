const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DEMO
const USERS = {
  "U123": hash("🍎-🎧-🔥")
};

const SESSIONS = {};

function hash(str){
  return crypto.createHash("sha256").update(str).digest("hex");
}

// Start Auth
app.post("/start-auth",(req,res)=>{
  const { user_id } = req.body;
  if(!USERS[user_id]) return res.status(404).json({error:"No user"});

  const sid = crypto.randomUUID();
  SESSIONS[sid] = { user_id, expires: Date.now()+60000, used:false };
  res.json({ session_id: sid });
});

// Verify Auth
app.post("/verify-auth",(req,res)=>{
  const { session_id, input } = req.body;
  const session = SESSIONS[session_id];
  if(!session || session.used || session.expires < Date.now())
    return res.json({ result:"FAIL" });

  session.used = true;
  const userHash = USERS[session.user_id];
  const attempt = hash(input.join("-"));

  if(attempt === userHash) res.json({ result:"PASS" });
  else res.json({ result:"FAIL" });
});

app.listen(5000,()=>console.log("Auth Server running on http://localhost:5000"));
