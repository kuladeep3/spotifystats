const SCOPE = 'user-read-private user-read-email';

export default function Home() {
  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // Base 64 encode the given string
  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
  }

  const handleLoginButton = async () => {
    const codeVerifier = generateRandomString(128);
    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      const state = generateRandomString(16);
      localStorage.setItem('code_verifier', codeVerifier);
      let args = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        scope: SCOPE,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
      });

      window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
    // router.push(
    //   `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&scope=${SCOPE}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`
    // );
  };
  return (
    <main className="homePageMain">
      <h1>Welcome to your Spotify Stats!</h1>
      <button onClick={handleLoginButton}>Sign in to spotify</button>
    </main>
  );
}
