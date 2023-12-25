import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import GlobalStyle from '../styles/global-style';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App = ({ Component, pageProps }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [routingPageOffset, setRoutingPageOffset] = useState(0)
  const router = useRouter()
  useEffect(() => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  useEffect(() => {
    const pageChange = () => {
      setRoutingPageOffset(window.scrollY)
    }
    router.events.on('routeChangeStart', pageChange)
  }, [router.events])

  return (
    <>
      <StyleSheetManager shouldForwardProp={isPropValid} disableVendorPrefixes={false}>
      <Header />
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
        <PageTransition route={router.asPath} routingPageOffset={routingPageOffset}>
        <Component  {...pageProps} />
        </PageTransition>
      <GlobalStyle />
      </StyleSheetManager>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};



export default App;