export const decodeHTMLEntities = (str: any) => {
  if (str && typeof str === "string") {
    const element = document.createElement("div");
    // strip script/html tags
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
    element.innerHTML = str;
    str = element.textContent;
    element.textContent = "";
  }

  return str;
};

export const decodeHTMLCharacters = (html: any) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const scroll = () => {
  window.scroll({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};
