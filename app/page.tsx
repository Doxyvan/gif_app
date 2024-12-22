'use client';
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState} from "react";



export default function Home() {

  const request = require("request");
//ptYfbwh6alh1n5j5IyKIrDgQHPiAUBcb https://api.giphy.com

  function api_request(){
    var input_value = document.getElementById("inputfield")?.value;
    var gif_window = document.getElementById("gifwindow");
    var giftext = document.getElementById("stylizedGif");
    
    if(input_value.slice(0,4) == "/gif"){
      giftext.style.display = "block";
      gif_window.style.display = 'flex';
      if ((input_value.slice(5)).indexOf(" ")>=0 && (input_value.slice(5)).indexOf(" ") < (input_value.slice(5)).length){
        input_value = (input_value.slice(5)).replace(" ", "+");
      }

      var url = "https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/search?q=" + input_value + "g&api_key=ptYfbwh6alh1n5j5IyKIrDgQHPiAUBcb&limit=9"
      const options = {
        method: "GET",
        url: url,
        headers: {
          api_key: "ptYfbwh6alh1n5j5IyKIrDgQHPiAUBcb",
          username: "Doxyvan"
          }
        };
  
        request(options, function(error, response){
          if (error) console.log(error);
          if (response){
            let data = response.body;
            data = JSON.parse(data);
            if(data){
              console.log(typeof data)
              if (gif_window.hasChildNodes()) {
                while (gif_window.hasChildNodes()){
                  gif_window.removeChild(gif_window.lastChild);
                }
              }
              for(let i = 0; i<9; i++){
                const img = document.createElement("img");
                img.src = data["data"][i]["images"]["original"]["url"];
                img.style.flex = "1";
                img.style.minHeight = "118px";
                img.style.maxHeight = "118px";
                img.style.maxWidth = "404px";
                img.style.minWidth = "100px";
                img.style.borderRadius = "2px";
                img.style.margin = "10px 7px 10px 10px";
                img.onmouseover = changeBackground;
                img.onmouseout = changeBackgroundBack;
                img.onclick = sendMessage;
                gif_window.appendChild(img);
              }
            }
            
          }
  
        });
        }else{
          gif_window.style.display = 'none';
          giftext.style.display = "none";
      }
  };

  function changeBackground(e) {
    e.target.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
  };
  function changeBackgroundBack(e) {
    e.target.style.boxShadow = "0px 0px 0px 0px rgba(0, 0, 0, 0)"
  };

  function sendMessage(e) {
    const url = e.target.getAttribute("src");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const paragraph = document.createElement("p");
    const main_div = document.getElementById("dialog_content");
    const gif_window = document.getElementById("gifwindow");
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();

    gif_window.style.display = 'none';

    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.flexWrap = "wrap";
    div.style.justifyContent = "flex-start";
    div.style.alignItems = "flex-end";
    div.style.width = "393px";
    div.style.height = "220px";
    div.style.marginBottom = "12px";

    img.style.maxHeight = "220px";
    img.style.maxWidth = "352px";
    img.style.borderRadius = "6px";
    img.setAttribute("src", url);

    paragraph.style.width = "33px";
    paragraph.style.height = "17px";
    paragraph.style.marginLeft = "8px";
    paragraph.style.color = "rgb(153, 162, 173)";
    paragraph.innerHTML = (hours + "") + ":" + (minutes + "");
    
    div.appendChild(img);
    div.appendChild(paragraph);
    main_div.appendChild(div);
  };

    
  
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.dialog_window}>
          <div className={styles.gifwindow} id="gifwindow">

          </div>
          <div className={styles.dialog_content} id="dialog_content">
            
          </div>
          <div className={styles.dialog_bottom}> 
            <input type="text" className={styles.dialog_bar} id="inputfield" onKeyUp={api_request} placeholder="Напишите сообщение..."></input>
            <p className={styles.stylizedGif} id="stylizedGif">/gif</p>
          </div>
        </div>
      </main>
    </div>
  );
}
