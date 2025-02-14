import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// components

export default function CardForm() {
  // axios.defaults.baseURL = "http://localhost:3333";
  axios.defaults.baseURL = "https://url-shortener-slink.herokuapp.com";

  const [url, setUrl] = useState("");
  const [err, setErr] = useState("");
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(url);

    axios
      .post("/api/short", {
        origUrl: url,
      })
      .then((res) => {
        console.log(res.data);
        setUrl("");
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data);
      });
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Shorten Your URL Here!
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={onSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Where you want to take your audience to?
            </h6>
            <div className="flex flex-wrap">

              <div className="w-full px-4">

              <div>
              {err && (
                <div
                  class="bg-red-500 text-white px-4 py-3 rounded relative"
                  role="alert"
                >
                  {err}
                </div>
              )}

              <br></br>
            </div>
            
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Target URL
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                    placeholder="http://sampleurl.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <br></br>

            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Create Your Url
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
