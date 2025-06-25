        let shortenBtn = document.getElementById("shorten");
        let linkinput = document.getElementById("link");
        let errMsg = document.getElementById("errMsg");


/*********************************************FETCH API*************************************** */
let results = document.getElementById("results");


shortenBtn.addEventListener("click", function(){
    if(linkinput.value.trim().length > 0){
        const longUrl = linkinput.value.trim();
        const encodedUrl = encodeURIComponent(longUrl);

            const border = window.getComputedStyle(linkinput).border;
            // console.log(border);

            if (border.includes("2.4px solid") && border.includes("rgb(244, 98, 98)")) {
                linkinput.style.border = "none";

                const styles = document.querySelectorAll("style");
                styles.forEach((s) => {
                    if (s.innerHTML.includes("input::placeholder") && s.innerHTML.includes("hsl(0, 87%, 67%)")) {
                        s.remove();
                    }
                });

                errMsg.style.display = "none";
            }


  fetch(`https://is.gd/create.php?format=json&url=${encodedUrl}`)
    .then(res => res.json())
    .then(data => {
         console.log(data)

         if(data.shorturl){

            let resultDiv = document.createElement("div");
            resultDiv.setAttribute("class","result p-3 rounded-2 mb-3");
            resultDiv.style.backgroundColor="white";

            let insideDiv = document.createElement("div");
            insideDiv.setAttribute("class","d-flex flex-column flex-md-row justify-content-between align-items-center")

            resultDiv.appendChild(insideDiv);
            
            let pOfInsideDiv = document.createElement("p");
            pOfInsideDiv.setAttribute("class","mb-0 fw-semibold text-break")
            pOfInsideDiv.innerHTML = `${linkinput.value.trim()}`

            insideDiv.appendChild(pOfInsideDiv)

            let hr = document.createElement("hr");
            hr.setAttribute("class","d-block d-md-none w-100")
            insideDiv.appendChild(hr)


            let insideSeconDiv = document.createElement("div")
            insideSeconDiv.setAttribute("class","parent-class d-flex gap-4 align-items-center flex-column flex-md-row")

            insideDiv.appendChild(insideSeconDiv);

            let span = document.createElement("span");
            span.setAttribute("class","link fw-semibold w-100")
            span.innerHTML = `${data.shorturl}`

            insideSeconDiv.appendChild(span)

            let button = document.createElement("button");
            button.setAttribute("class","btn rounded-2 copy text-white fw-bold px-3 py-2")
            button.setAttribute("id","copy")
            button.innerHTML = "Copy";

            insideSeconDiv.appendChild(button)

            results.appendChild(resultDiv)
            linkinput.value=""
            shortenBtn.removeAttribute("disabled");

            
            let copy = document.getElementById("copy");
            copy.addEventListener("click",function(){
                navigator.clipboard.writeText(span.innerHTML)
                console.log("copied")
                copy.style.setProperty("background-color", "hsl(257, 27%, 26%)", "important");
                copy.innerHTML = "Copied!"
            })

         }


    })
    }  else if(linkinput.value.length <= 0){
                linkinput.style.border = "3px solid hsl(0, 87%, 67%)"
                let style = document.createElement("style");
                style.innerHTML = `
                input::placeholder {
                    color: hsl(0, 87%, 67%) !important;
                }
                `;
                document.head.appendChild(style);
                errMsg.style.display = "block"
            }

})
