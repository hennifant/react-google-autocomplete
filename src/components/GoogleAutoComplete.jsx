import { useState, useEffect } from "react";

const GoogleAutoComplete = () => {
  const [text, setText] = useState("");
  const [coincidences, setCoincidences] = useState([]);

  const getMatches = async () => {
    return new Promise((resolve, reject) => {
      if (!text) {
        return reject(new Error("Need valid text input"));
      }
      if (typeof window === "undefined") {
        return reject(new Error("Need valid window object"));
      }
      try {
        console.log(window.google);
        new window.google.maps.places.AutocompleteService().getPlacePredictions(
          {
            input: text,
            componentRestrictions: { country: "de" },
            types: ["address"],
          },
          resolve
        );
      } catch (e) {
        reject(e);
      }
    });
  };

  const doQuery = async () => {
    const results = JSON.parse(JSON.stringify(await getMatches()));
    setCoincidences(results.map((result) => result.description));
    console.log(
      "🚀 ~ file: GoogleAutoComplete.jsx ~ line 35 ~ useEffect ~ results",
      results
    );
  };

  useEffect(() => {
    if (text) {
      doQuery();
    }
  }, [text]);

  return (
    <div className="w-full flex flex-col">
      <input
        className="h-12 border-gray-300 border-[1px] px-4 outline-none mt-4 w-full"
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="type some text to search in google maps"
      />
      {coincidences.length > 0 && (
        <ul
          id="coincidences_list"
          className="bg-white border-[1px] rounded-lg shadow-lg p-4 absolute max-h-[200px] overflow-y-auto"
        >
          {coincidences.map((item) => (
            <li
              key={item}
              className="min-h-10 w-full border-b-[1px] border-solid border-l-gray-300 py-2"
            >
              🖲 {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoogleAutoComplete;
