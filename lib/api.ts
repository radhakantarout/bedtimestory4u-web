export async function apiGet(path: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  console.log("API Request URL:", url);
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function apiPost(path: string, body: any) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`POST ${path} failed with status ${res.status}`);
  }

  return res.json();
}
