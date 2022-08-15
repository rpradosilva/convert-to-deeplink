let url, deeplink;

function FaqToDeeplink() {
  url = document.querySelector("#faq-link").value;
  const parameters = sanitizeUrl(url);

  deeplink = convertDeeplink(parameters.type, parameters.id);
  toClipboard(deeplink);
  checkFeedback(deeplink);
}

function sanitizeUrl(url) {
  const extractType = JSON.stringify(url.match(/\/[a-z]+[a-z]+\/[0-9]/i));
  const type = extractType.slice(3, extractType.length - 4);

  const extractId = JSON.stringify(url.match(/\/[0-9]+-/i));
  const id = extractId.slice(3, extractId.length - 3);

  return { type, id };
}

function convertDeeplink(type, id) {
  DlStructure = "picpay://picpay/helpcenter";

  switch (type) {
    case "categories":
      deeplink = `${DlStructure}/section/${id}`;
      return deeplink;

    case "articles":
      deeplink = `${DlStructure}/article/${id}`;
      return deeplink;

    default:
      deeplink = "";
      break;
  }
}

function toClipboard(deeplink) {
  navigator.clipboard.writeText(deeplink);
}

function checkFeedback(deeplink) {
  const cardFeedback = document.querySelector(".feedback");

  deeplink
    ? (cardFeedback.style.display = "flex")
    : (cardFeedback.style.display = "none");
}
