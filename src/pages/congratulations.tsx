import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function Congratulations() {
  const [respostasArmazenadas, setRespostasArmazenadas] = useState([]);
  const [nome, setNome] = useState("");
  const [corretas, setCorretas] = useState(0);

  // Recupera as respostas armazenadas no localStorage ou um array vazio se ainda não houver respostas
  useEffect(() => {
    setRespostasArmazenadas(
      JSON.parse(localStorage.getItem("respostas") || "[]"),
    );
    setCorretas(respostasArmazenadas.filter((r) => r).length);
    setNome(parseCookies().user_name);
  }, [respostasArmazenadas]);

  useEffect(() => {
    async function save() {
      const id = parseCookies().user_id;
      const idQuiz = JSON.parse(localStorage.getItem("quizId") || "");
      const data = { usuarioId: id, pontuacao: corretas * 10, quizId: idQuiz };
      await axios.post("http://localhost:4000/pontuacao", data);
      console.log("save");
    }

    save();
  }, [corretas]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="flex w-full h-[10%] border-b border-gray-500">
        <span className="px-4 text-[32px] text-white font-['Lexend Deca']">
          EduQuiz
        </span>
      </div>
      <div className="text-center text-white text-[32px] font-['Lexend Deca'] mt-[3%]">
        Parabéns, {nome}!
      </div>
      <div className="text-center text-white text-sm font-['Lexend Deca']">
        sua pontuação: {corretas}
      </div>
      <div className="flex h-full items-center justify-center">
        <div className="w-[5%] h-full mt-[10%]">
          <div className="text-center text-white text-[40px] font-['Lexend Deca']">
            {corretas * 10}
          </div>
          <div className="flex w-full h-full bg-amber-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
