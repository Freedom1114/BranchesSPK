import express from "express";
import multer from "multer";
import { convertSpeechToText } from "../controllers/STTController.js";
import { convertTextToSpeech } from "../controllers/TTSController.js";

const voiceRoutes = express.Router();
const upload = multer(); // 메모리 내 업로드 사용

// STT 라우트
voiceRoutes.post("/stt", upload.single("audio"), convertSpeechToText);

// TTS 라우트
voiceRoutes.post("/tts", convertTextToSpeech);

export default voiceRoutes;
