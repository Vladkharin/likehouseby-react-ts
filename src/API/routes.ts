let API_URL = "https://likehouse-back.ru/api";

type OPTIONS = {
  method: string;
  headers: {
    "Content-Type": string;
  };
  body?: string;
};

const f = async (method: string, data: string, url: string) => {
  const options: OPTIONS = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  API_URL = "";

  if (data != "") {
    options.body = data as string;
    API_URL = "https://likehouse-back.ru/api";
  }

  const response = await fetch(API_URL + url, options);

  try {
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export async function sendEmail(data: string) {
  return await f("POST", data, "/sendemail");
}

export async function sendOrder(data: string) {
  return await f("POST", data, "/sendorder");
}

export async function sendShare(data: string) {
  return await f("POST", data, "/sendshare");
}

export async function getAdditionalServices() {
  return await f("GET", "", "./1c_bel_site.json");
}
