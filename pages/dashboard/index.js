import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import Layout from '../../components/Layout';

function Dashbord({ code, state }) {
  const router = useRouter();
  useEffect(() => {
    if (code && state) {
      // Get code verifier
      const codeVerifier = localStorage.getItem('code_verifier');

      // Construct url
      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        code_verifier: codeVerifier,
      });

      // Call token api
      const response = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem('access_token', data.access_token);
          router.replace('/dashboard');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [code, router, state]);

  return <Layout>Dashbord</Layout>;
}

export default Dashbord;

export async function getServerSideProps(context) {
  let code = '';
  let state = '';
  context?.query?.code && (code = context.query.code);
  context?.query?.state && (state = context.query.state);
  return {
    props: {
      code,
      state,
    },
  };
}
