let url = document.querySelector("#input-url");
let result = document.querySelector("#output-url");

const URLstructures = {
  FAQ: {
    APP: "picpay://picpay/helpcenter/",
    WEB: "https://meajuda.picpay.com",
  },
};

function newURL() {
  const URLparameters = specifyURL(url.value);
  checkURL(URLparameters.type, URLparameters.group);
  const convertedURL = convertURL(
    URLparameters.type,
    URLparameters.group,
    URLparameters.id
  );

  output(convertedURL);
}

function specifyURL(url) {
  let type, group, id;

  if (url != "") {
    if (url.indexOf(URLstructures.FAQ.WEB) != -1) {
      const extractGroup = JSON.stringify(url.match(/\/[a-z]+[a-z]+\/[0-9]/i));
      const extractId = JSON.stringify(url.match(/\/[0-9]+/i));

      type = "faqlink";
      group = extractGroup.slice(3, extractGroup.length - 4);
      id = extractId.slice(3, extractId.length - 2);
    } else if (url.indexOf(URLstructures.FAQ.APP) != -1) {
      const extractGroup = JSON.stringify(url.match(/\/[a-z]+[a-z]+\/[0-9]/i));
      const extractId = JSON.stringify(url.match(/\/[0-9]+/i));

      type = "faqdeeplink";
      group = extractGroup.slice(3, extractGroup.length - 4);
      id = extractId.slice(3, extractId.length - 2);
    } else {
      type = null;
      group = null;
      id = null;
    }
  }

  return { type, group, id };
}

function checkURL(type, group) {
  const buttons = document.querySelectorAll("button");

  url.classList.remove("error");
  result.classList.remove("error");
  result.setAttribute("placeholder", "URL convertida..");
  for (const button of buttons) {
    button.style.display = "none";
  }

  if (type != undefined && group != "") {
    for (const button of buttons) {
      button.style.display = "flex";
    }
    return true;
  } else if ((type, group === null) || group === "") {
    url.classList.add("error");
    result.classList.add("error");
    result.setAttribute("placeholder", "Digite uma URL de uma FAQ válida");
    return false;
  } else {
    return undefined;
  }
}

function convertURL(type, group, id) {
  let convertedURL;

  switch ((type, group)) {
    case "faqlink" && "categories":
      convertedURL = `${URLstructures.FAQ.APP}category/${id}`;
      return convertedURL;

    case "faqlink" && "sections":
      convertedURL = `${URLstructures.FAQ.APP}section/${id}`;
      return convertedURL;

    case "faqlink" && "articles":
      convertedURL = `${URLstructures.FAQ.APP}article/${id}`;
      return convertedURL;

    case "faqdeeplink" && "category":
      convertedURL = `${URLstructures.FAQ.WEB}/hc/pt-br/categories/${id}`;
      return convertedURL;

    case "faqdeeplink" && "section":
      convertedURL = `${URLstructures.FAQ.WEB}/hc/pt-br/sections/${id}`;
      return convertedURL;

    case "faqdeeplink" && "article":
      convertedURL = `${URLstructures.FAQ.WEB}/hc/pt-br/articles/${id}`;
      return convertedURL;

    default:
      return (convertedURL = null);
  }
}

function output(convertedURL) {
  convertedURL ? (result.value = convertedURL) : (result.value = "");
}

function changeValues() {
  url.value = result.value;
  newURL();
}

function toClipboard() {
  if (result.value != "") {
    result.select();
    result.setSelectionRange(0, 99999);
    document.execCommand("copy");
    navigator.clipboard.writeText(result.value);
  }
}

function openURL() {
  if (result.value != "") {
    window.open(result.value, "_blank");
  }
}
