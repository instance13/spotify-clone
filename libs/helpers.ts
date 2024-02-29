import { Price } from "@/types";

export const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/"; // if enviroment variables are not defined

  url = url.includes("http") ? url : `https://${url}`; // https secure
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`; // no extra spaces
  return url;
};

export const postData = async ({ // post query to a specific route
  url, // the route
  data
}: {
  url: string;
  data?: { price: Price; };
}) => {
  console.log("POST REQUEST", url, data);

  const res: Response = await fetch(url, { // the response to the post query
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) { 
    console.log("Error is POST", { url, data, res });
    
    throw new Error(res.statusText);
  };
  return res.json();
};

export const toDateTime = (secs: number) => { 
  var t = new Date("1970-01-01T00:30:00Z");
  t.setSeconds(secs);
  return t;
};