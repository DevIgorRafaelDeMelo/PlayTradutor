import { useState } from "react";

import {
  AiOutlineProfile,
  AiFillPlayCircle,
  AiOutlineUnorderedList,
  AiOutlineDelete,
} from "react-icons/ai";

const list = JSON.parse(localStorage.getItem("list")) || [];

function App() {
  const [section, SetSection] = useState("NULL");

  const Pag = () => {
    const handleClicButton = () => {
      const PT = document.getElementById("palavraPT");
      const EN = document.getElementById("palavraEN");

      if (PT.value === "" || EN.value === "") {
        return alert("Nenhum dado inserido");
      }

      list.map((val) => {
        if (EN.value == val.EN) {
          return;
        }
      });

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

    const handleClicComfirmePlay = () => {
      const Cheking = document.getElementById("Cheking");
      Cheking.classList =
        "fixed h-4/6 inset-x-8 top-30 w-max m-auto bg-white hidden rounded-md";
      Play();
    };

    var mais = 0;
    const Verificar = (valor) => {
      if (valor) {
        var v1 = document.getElementById("mais");
        mais++;
        v1.innerText = String(mais);
        Play();
      }
      if (!valor) {
        const Cheking = document.getElementById("Cheking");
        const Check = document.getElementById("Check");
        const Checkout = document.getElementById("Checkout");
        const valor = document.getElementById("Palavra").textContent;
        var traducaoCorreta = list.map((val) => {
          if (val.PT === valor) {
            return val.EN;
          }
        });
        traducaoCorreta = String(traducaoCorreta).replace(/,/g, "");

        Cheking.classList.remove("hidden");

        Checkout.textContent = valor;
        Check.textContent = traducaoCorreta;
      }
    };

    return (
      <section className="bg-sky-400 h-screen overflow-hidden pt-10  ">
        <div className="bg-white w-80 m-auto  rounded-md bg-white h-4/5 mb-10">
          {section == "play" && list.length < 5 ? (
            <>
              <div className="pt-40"></div>
              <div className=" p-5  text-center bg-sky-500">
                Deve conter pelo menos cinco item cadastrado no seu dicionário
              </div>
              <div className="pt-40"></div>{" "}
            </>
          ) : (
            <></>
          )}
          {section == "play" && list.length >= 5 ? (
            <section className="text-center p-10">
              <div
                id="Cheking"
                className="fixed h-4/6 inset-x-8 top-30 w-max m-auto bg-white hidden rounded-md"
              >
                <div id="Check" className="pt-20 w-80 text-2xl">
                  0
                </div>
                <div id="Checkout">0</div>
                <div
                  className="bg-sky-500 mt-20 py-4  text-3xl"
                  onClick={handleClicComfirmePlay}
                >
                  Confirme
                </div>
              </div>
              <div className="font-serif text-2xl  " id="Palavra">
                {list[1].EN}
              </div>
              <div className="h-px bg-sky-800 m-2  "></div>
              <div
                className="bg-sky-500 rounded-md p-5 mb-2 text-1xl text-white "
                id="OpcUm"
                onClick={handleClicComfirme}
              >
                {list[0].PT}
              </div>
              <div
                className="bg-sky-500 rounded-md p-5 mb-2 text-1xl text-white "
                id="OpcDois"
                onClick={handleClicComfirme}
              >
                {list[1].PT}
              </div>
              <div
                className="bg-sky-500 rounded-md p-5 mb-2 text-1xl text-white "
                id="OpcTreis"
                onClick={handleClicComfirme}
              >
                {list[2].PT}
              </div>
              <div
                className="bg-sky-500 rounded-md p-5 mb-2 text-1xl text-white "
                id="OpcQuatro"
                onClick={handleClicComfirme}
              >
                {list[3].PT}
              </div>
              <div
                className="bg-sky-500 rounded-md p-5 mb-2 text-1xl text-white "
                id="OpcCinco"
                onClick={handleClicComfirme}
              >
                {list[4].PT}
              </div>

              <div className=" mt-5  p-5">
                <div className="pb-4">Acertos</div>
                <div
                  className=" w-20 bg-sky-500 p-2 m-auto rounded-md text-white"
                  id="mais"
                >
                  0
                </div>
              </div>
            </section>
          ) : (
            <></>
          )}

          {section == "addlist" ? (
            <section className="pt-10">
              <form id="Form" className="Form p-10 text-center">
                <div className="bg-sky-500 p-5 rounded-md mb-6">
                  <label className="text-white">Palavra Portugues</label>
                  <input
                    id="palavraPT"
                    type="Text"
                    className="w-full focus:outline-none p-3"
                    placeholder="PT"
                  />
                </div>
                <div className="bg-sky-500 p-5 rounded-md mb-6">
                  <label className="text-white">Tradução Inglês</label>
                  <input
                    id="palavraEN"
                    type="Text"
                    className="w-full focus:outline-none p-3"
                    placeholder="EN"
                  />
                </div>
                <div
                  className="bg-sky-500 rounded-md m-auto p-4 w-40 text-white h-14"
                  onClick={handleClicButton}
                >
                  Confirmar
                </div>
              </form>
            </section>
          ) : (
            <></>
          )}
          {section == "list" ? (
            <section className="text-center ">
              <div className="text-2xl p-3">Dicionário</div>
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
        <div className="flex justify-between bg-black p-10 m-auto">
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
      </section>
    );
  };

  return <Pag />;
}

export default App;
