import { useState } from "react";

import {
  AiOutlineProfile,
  AiFillPlayCircle,
  AiOutlineUnorderedList,
  AiOutlineDelete,
} from "react-icons/ai";

const list = JSON.parse(localStorage.getItem("list")) || [];

function App() {
  const [section, SetSection] = useState("list");

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

      PT.value = "";
      EN.value = "";
    };

    const handleClickSection = (val) => {
      SetSection(val);
    };

    const handleClicKButtonDelet = (val) => {
      console.log(list);
      list.splice(list.indexOf(val), 1);
      localStorage.setItem("list", JSON.stringify(list));

      SetSection("");
      setTimeout(() => {
        SetSection("list");
      }, 1);
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
          {section == "play" ? <></> : <></>}
          {section == "addlist" ? (
            <section>
              <form id="Form" className="Form p-10 text-center">
                <div className="bg-sky-300 p-5 rounded-md mb-6">
                  <label className="text-white">Palavra Portugues</label>
                  <input
                    id="palavraPT"
                    type="Text"
                    className="w-full focus:outline-none"
                  />
                </div>
                <div className="bg-sky-300 p-5 rounded-md mb-6">
                  <label className="text-white">Tradução Ingles</label>
                  <input
                    id="palavraEN"
                    type="Text"
                    className="w-full focus:outline-none"
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
