let url;

const URLstructure = {
  FAQ: {
    APP: "picpay://picpay/helpcenter/",
    WEB: "https://meajuda.picpay.com",
  },
};

function newURL() {
  url = "";
  url = document.querySelector("#input-url").value;
  let URLparameters = specifyURL(url);

  const URLconverted = convertURL(
    URLparameters.type,
    URLparameters.group,
    URLparameters.id
  );

  navigator.clipboard.writeText(URLconverted);
  output(URLconverted);

  // converter para outro formato
}

function specifyURL(url) {
  let type, group, id;

  if (url.indexOf(URLstructure.FAQ.WEB) != -1) {
    const extractGroup = JSON.stringify(url.match(/\/[a-z]+[a-z]+\/[0-9]/i));
    const extractId = JSON.stringify(url.match(/\/[0-9]+/i));

    type = "faqlink";
    group = extractGroup.slice(3, extractGroup.length - 4);
    id = extractId.slice(3, extractId.length - 2);
  } else if (url.indexOf(URLstructure.FAQ.APP) != -1) {
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

  return { type, group, id };
}

function convertURL(type, group, id) {
  let URLconverted;

  switch ((type, group)) {
    case "faqlink" && "categories":
      URLconverted = `${URLstructure.FAQ.APP}category/${id}`;
      return URLconverted;

    case "faqlink" && "sections":
      URLconverted = `${URLstructure.FAQ.APP}section/${id}`;
      return URLconverted;

    case "faqlink" && "articles":
      URLconverted = `${URLstructure.FAQ.APP}article/${id}`;
      return URLconverted;

    case "faqdeeplink" && "category":
      URLconverted = `${URLstructure.FAQ.WEB}/hc/pt-br/categories/${id}`;
      return URLconverted;

    case "faqdeeplink" && "section":
      URLconverted = `${URLstructure.FAQ.WEB}/hc/pt-br/sections/${id}`;
      return URLconverted;

    case "faqdeeplink" && "article":
      URLconverted = `${URLstructure.FAQ.WEB}/hc/pt-br/articles/${id}`;
      return URLconverted;

    default:
      return (URLconverted = null);
  }
}

function output(URLconverted) {
  const placeholder = document.querySelector("#output-url");

  URLconverted ? (placeholder.value = URLconverted) : (placeholder.value = "");
}

function changeValues() {
  document.querySelector("#input-url").value =
    document.querySelector("#output-url").value;

  newURL();
}
