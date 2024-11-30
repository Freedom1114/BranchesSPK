import { Request, Response } from "express";
import { OpenAI } from "openai";
import { config } from "dotenv";

config(); // 환경 변수 로드

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string, // 반드시 환경 변수를 가져옴
});

export const convertTextToSpeech = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "텍스트가 필요합니다." });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
    });

    const synthesizedSpeech = response.choices[0]?.message?.content || "오류 발생";
    res.status(200).json({ speech: synthesizedSpeech });
  } catch (error) {
    console.error("TTS 변환 오류:", error);
    res.status(500).json({ message: "텍스트를 음성으로 변환하는 데 실패했습니다.", error });
  }
};
