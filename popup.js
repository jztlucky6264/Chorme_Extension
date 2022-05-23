const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");
btn.addEventListener("click", async () => {
  chrome.storage.sync.get("color", ({ color }) => {
    console.log("color: ", color);
  });
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickcolor,
    },
    async (injectionResult) => {
      const [data] = injectionResult;
      if (data.result) {
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorValue.innerText = color;
        try {
          await navigator.clipboard.writeText(color);
          confirm("Copied Successfully").style.height = "40px";
        } catch (error) {
          console.log(error);
        }
      }
      console.log(injectionResult);
    }
  );
});

async function pickcolor() {
  try {
    //picker

    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
  } catch (error) {
    console.log(error);
  }
}
