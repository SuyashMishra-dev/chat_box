// import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const messages = req.body;

//   if (!messages) {
//     return res.status(400).json({ error: "Invalid request body" });
//   }

//   try {
//     const response = await axios({
//       url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
//       method: "post",
//       data: {
//         contents: [{ parts: [{ text: messages }] }],
//       },
//     });

//     const aiResponse =
//       response["data"]["candidates"][0]["content"]["parts"][0]["text"];

//     res.status(200).json({ reply: aiResponse });
//   } catch (error: any) {
//     console.error("OpenAI API Error:", error);
//     res
//       .status(500)
//       .json({ error: error.message || "Failed to fetch data from OpenAI" });
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      stream: true, // Enable streaming
    });

    // Set headers for streaming
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.end(); // Close the connection after streaming
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch data from OpenAI" });
  }
}
