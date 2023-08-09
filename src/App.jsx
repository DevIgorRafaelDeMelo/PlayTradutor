import { useState } from "react";

import {
  AiOutlineProfile,
  AiFillPlayCircle,
  AiOutlineUnorderedList,
  AiOutlineDelete,
} from "react-icons/ai";

const list = JSON.parse(localStorage.getItem("list")) || [];

list.push({ PT: "Nada", EN: "Nothing" });
list.push({ PT: "Nunca", EN: "Never" });
list.push({ PT: "Mais", EN: "More" });
list.push({ PT: "Paraiso", EN: "Heaven" });
list.push({ PT: "Longe", EN: "Far" });
list.push({ PT: "Céu", EN: "Sky" });
list.push({ PT: "House", EN: "House" });
list.push({ PT: "Sozinho", EN: "Alone" });
list.push({ PT: "Mais", EN: "But" });
list.push({ PT: "Sentir", EN: "Feel" });

function App() {
  const [section, SetSection] = useState("play");

  const Pag = () => {
    const handleClicButton = () => {
      const PT = document.getElementById("palavraPT");
      const EN = document.getElementById("palavraEN");

      if (PT.value === "" || EN.value === "") {
        return alert("Nenhum dado inserido");
      }

      const itemAtualNew = {
        PT: PT.value,
        EN: EN.value,
      };

      list.push(itemAtualNew);

      localStorage.setItem("list", JSON.stringify(list));

      if (PT) {
        PT.value = "";
        EN.value = "";
      }
    };

    const handleClickSection = (val) => {
      SetSection(val);
      Play();
    };

    const handleClicKButtonDelet = (val) => {
      list.splice(list.indexOf(val), 1);
      localStorage.setItem("list", JSON.stringify(list));

      if (list.length <= 4) {
        return;
      }

      SetSection("");
      setTimeout(() => {
        SetSection("list");
      }, 1);
    };

    const Alea = (arrey) => {
      const nub = parseInt(Math.random() * arrey.length);
      return nub;
    };

    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    const Play = () => {
      setTimeout(() => {}, 6);
      const chave = document.getElementById("Palavra");
      const um = document.getElementById("OpcUm");
      const dois = document.getElementById("OpcDois");
      const treis = document.getElementById("OpcTreis");
      const quatro = document.getElementById("OpcQuatro");
      const cinco = document.getElementById("OpcCinco");

      const array = shuffle(list);

      const novoArrey = [];

      for (var i = 0; i <= 4; i++) {
        novoArrey.push(array[i]);
      }
      const verdadeiro = Alea(novoArrey);

      if (chave) {
        chave.textContent = novoArrey[verdadeiro].PT;
        um.textContent = novoArrey[0].EN;
        dois.textContent = novoArrey[1].EN;
        treis.textContent = novoArrey[2].EN;
        quatro.textContent = novoArrey[3].EN;
        cinco.textContent = novoArrey[4].EN;
      }
    };

    const handleClicComfirme = (props) => {
      // eslint-disable-next-line react/prop-types
      const id = document.getElementById(props.target.id);
      const verdadeira = document.getElementById("Palavra");
      var valor = false;

      list.map((val) => {
        if (val.PT === verdadeira.textContent) {
          if (val.EN === id.textContent) {
            return (valor = true);
          }
        }
      });

      return Verificar(valor);
    };

    var mais = 0;
    var menos = 0;
    const Verificar = (valor) => {
      if (valor) {
        var v1 = document.getElementById("mais");
        mais++;
        v1.innerText = String(mais);
        Play();
      }
      if (!valor) {
        var v2 = document.getElementById("menos");
        menos++;
        v2.innerText = String(menos);
        Play();
      }
    };

    return (
      <section className="bg-sky-400 h-screen p-10 ">
        <div className="flex justify-between pt-10 w-60 m-auto">
          <div
            className="text-white text-5xl pt-2  "
            onClick={() => handleClickSection("addlist")}
          >
            <AiOutlineProfile />
          </div>
          <div
            className="text-white text-6xl"
            onClick={() => handleClickSection("play")}
          >
            <AiFillPlayCircle />
          </div>
          <div
            className="text-white text-5xl pt-2"
            onClick={() => handleClickSection("list")}
          >
            <AiOutlineUnorderedList />
          </div>
        </div>
        <div className="bg-white w-80 m-auto mt-10  rounded-md bg-white h-4/5 mb-10">
          {section == "play" ? (
            <section className="text-center p-10">
              <div className="font-serif text-2xl mb-10 " id="Palavra">
                {list[1].PT}
              </div>
              <div className="h-px bg-sky-800 mb-10  "></div>
              <div
                className="bg-sky-500 rounded-md p-5 mb-2 text-1xl text-white "
                id="OpcUm"
                onClick={handleClicComfirme}
              >
                {list[0].EN}
              </div>
              <div
                className="bg-sky-500 rounded-md p-5 mb-2 text-1xl text-white "
                id="OpcDois"
                onClick={handleClicComfirme}
              >
                {list[1].EN}
              </div>
              <div
                className="bg-sky-500 rounded-md p-5 mb-2 text-1xl text-white "
                id="OpcTreis"
                onClick={handleClicComfirme}
              >
                {list[2].EN}
              </div>
              <div
                className="bg-sky-500 rounded-md p-5 mb-2 text-1xl text-white "
                id="OpcQuatro"
                onClick={handleClicComfirme}
              >
                {list[3].EN}
              </div>
              <div
                className="bg-sky-500 rounded-md p-5 mb-2 text-1xl text-white "
                id="OpcCinco"
                onClick={handleClicComfirme}
              >
                {list[4].EN}
              </div>

              <div className="flex mt-5 justify-between  p-5">
                <div
                  className=" w-20 bg-sky-500 p-2 rounded-md text-white"
                  id="mais"
                >
                  0
                </div>
                <div
                  className=" w-20 bg-red-500 p-2 rounded-md text-white"
                  id="menos"
                >
                  0
                </div>
              </div>
            </section>
          ) : (
            <></>
          )}

          {section == "addlist" ? (
            <section className="pt-40">
              <form id="Form" className="Form p-10 text-center">
                <div className="bg-sky-300 p-5 rounded-md mb-6">
                  <label className="text-white">Palavra Portugues</label>
                  <input
                    id="palavraPT"
                    type="Text"
                    className="w-full focus:outline-none"
                    placeholder="PT"
                  />
                </div>
                <div className="bg-sky-300 p-5 rounded-md mb-6">
                  <label className="text-white">Tradução Inglês</label>
                  <input
                    id="palavraEN"
                    type="Text"
                    className="w-full focus:outline-none"
                    placeholder="EN"
                  />
                </div>
                <div
                  className="bg-sky-500 rounded-md m-auto p-4 w-40 text-white h-14"
                  onClick={handleClicButton}
                >
                  Comfirmar
                </div>
              </form>
            </section>
          ) : (
            <></>
          )}
          {section == "list" ? (
            <section className="text-center ">
              <div className="text-2xl p-3">Dicionario</div>
              <div className="bg-black w-60 m-auto h-1"></div>
              <div>
                <ul className="p-10 text-start h-60vh overflow-auto ">
                  {list.map((item) => {
                    return (
                      <>
                        <li
                          key={item.PT}
                          id={item.PT}
                          className="flex justify-between my-4"
                        >
                          <div>
                            <div className="font-bold">{item.PT}</div>
                            <div>{item.EN}</div>
                          </div>
                          <div
                            className="pt-4 "
                            onClick={() => {
                              handleClicKButtonDelet(item);
                            }}
                          >
                            <AiOutlineDelete className="text-2xl" />
                          </div>
                        </li>
                        <div className="h-px bg-sky-300"></div>
                      </>
                    );
                  })}
                </ul>
              </div>
            </section>
          ) : (
            <></>
          )}
        </div>
      </section>
    );
  };

  return <Pag />;
}

export default App;
