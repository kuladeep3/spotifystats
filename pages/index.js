import axios from 'axios';
import { setCookie, getCookie } from 'cookies-next';
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
      setCookie('code_verifier', codeVerifier, { maxAge: 60 * 60 });
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
  };

  return (
    <main className="homePageMain">
      <h1>Welcome to your Spotify Stats!</h1>
      <button onClick={handleLoginButton}>Sign in to spotify</button>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { code, state } = context.query;

  if (code && state) {
    // Get code verifier
    const codeVerifier = getCookie('code_verifier', { req, res });

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          code_verifier: codeVerifier,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      if (response?.status === 200 && response?.data) {
        response?.data?.access_token &&
          setCookie('access_token', response.data.access_token, { req, res, maxAge: 60 * 60 });
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          },
        };
      }
    } catch (error) {
      return {
        notFound: true,
      };
    }
  }
  return {
    props: {},
  };
}
