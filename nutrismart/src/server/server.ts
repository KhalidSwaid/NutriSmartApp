// server.ts

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { spawn } from "child_process";
import path from "path";
import cors from "cors"; // Import cors package

const app = express();
const port = process.env.PORT || 5173;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins (*)

// Endpoint to initiate OTP sending
app.post("/send_otp", async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  try {
    // Execute Python script asynchronously
    const pythonProcess = spawn("python", [
      path.join(__dirname, "../OTP.py"),
      phoneNumber,
    ]);

    pythonProcess.stdout.on("data", (data) => {
      const otp = data.toString().trim(); // Get OTP from stdout
      res.json({ otp });
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error in Python script: ${data}`);
      res.status(500).json({ error: "Failed to send OTP" });
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
