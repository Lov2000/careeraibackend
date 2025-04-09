const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: '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' // ← paste your real free OpenAI API key here
});


app.post('/generate-guide', async (req, res) => {
  const data = req.body;

  const messages = [
    {
      role: "system",
      content: "You are an expert career advisor who creates detailed roadmaps for professionals."
    },
    {
      role: "user",
      content: `
Generate a highly personalized 5000-word career guide for someone with:

Current Salary: ₹${data.currentSalary}
Expected Salary: ₹${data.expectedSalary}
Current Role: ${data.currentRole}
Desired Role: ${data.desiredRole}
Industry: ${data.industry}
Experience: ${data.experience}
Education: ${data.education}
Location: ${data.location}

Include:
1. Introduction & Motivation
2. Feasibility & Timeline
3. Required Skills & Gaps
4. Step-by-Step Roadmap
5. Weekly Tasks
6. Recommended Resources
7. Industry Insights & Salary Trends
8. Final Encouragement
`
    }
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7
    });

    res.json({ guide: response.choices[0].message.content });

  } catch (err) {
    console.error("Error generating guide:", err);
    res.status(500).json({ error: "Failed to generate guide" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
