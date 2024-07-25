// @/pages/_app.js


import {AuthProvider} from "@/hooks/use-auth";

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
  );
}

export default MyApp;
