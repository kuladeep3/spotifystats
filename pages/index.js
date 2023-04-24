import { useRouter } from 'next/router';

const SCOPE = 'user-read-private user-read-email';

export default function Home() {
  const router = useRouter();
  const handleLoginButton = () => {
    router.push(
      `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&scope=${SCOPE}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`
    );
  };
  return (
    <main className="homePageMain">
      <h1>Welcome to your Spotify Stats!</h1>
      <button onClick={handleLoginButton}>Sign in to spotify</button>
    </main>
  );
}
