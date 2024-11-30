import { Request, Response } from "express";
import axios from "axios";
import FormData from "form-data";



export const convertSpeechToText = async (req: Request, res: Response) => {
  try {
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ message: "파일이 없습니다." });
    }

    const formData = new FormData();
    formData.append("file", req.file?.buffer, req.file?.originalname);
    formData.append("model", "whisper-1");

    const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
      headers: {
        Authorization: `Bearer ${process.env.OPEN_AI_SECRET_KEY}`,
        ...formData.getHeaders(),
      },
    });

    res.status(200).json({ text: response.data.text });
  } catch (error) {
    console.error("STT 변환 오류:", error);
    res.status(500).json({ message: "음성을 텍스트로 변환하는데 실패했습니다.", error });
  }
};
