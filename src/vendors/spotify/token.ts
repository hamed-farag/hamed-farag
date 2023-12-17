export async function getToken() {
  const response = await fetch(
    `${process.env.SPOTIFY_BASE_ACCOUNTS_URL}/token`,
    {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_APP_CLIENT_ID}:${process.env.SPOTIFY_APP_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    }
  );

  return (await response.json()) as Promise<{
    access_token: string;
    token_type: string;
    expires_in: number;
  }>;
}
