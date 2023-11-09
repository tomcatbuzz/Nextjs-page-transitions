import { TransitionGroup, CSSTransition } from "react-transition-group"
import styled, { keyframes } from "styled-components"
import { useState, useRef, useEffect } from "react"
import gsap from "gsap"

// const transitionZoom = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   30% {
//     transform: scale(.6);
//   }
//   70% {
//     transform: scale(.6);
//   }
//   100% {
//     transform: scale(1);
//   }
// `;

// const transitionOutFlip = keyframes`
//   from {
//     transform: rotateY(0) translateZ(-1px);
//   }
//   to {
//     transform: rotateY(180deg) translateZ(-1px);
//   }
// `;

// const transitionInFlip = keyframes`
//   from {
//     transform: rotateY(-180deg) translateZ(1px);
//   }
//   to {
//     transform: rotateY(0) translateZ(1px);
//   }
// `;


const MainComponent = styled.div`
${'' /* transform-style: preserve-3d; */}
&.page-enter-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  z-index: 4;

  ${'' /* flip animation */}
  ${'' /* animation: 500ms ${transitionInFlip} 250ms cubic-bezier(0.37, 0, 0.63, 1) both; */}
  backface-visibility: hidden;
}

${'' /* flip animation */}
&.page-enter-active,
&.page-exit-active {
  .page-transition-inner {
    height: 100vh;
    overflow: hidden;
    ${'' /* animation: 1000ms ${transitionZoom} cubic-bezier(0.45, 0, 0.55, 1) both; */}
    background: white;
  }
}

&.page-exit {
  ~ .wipe {
    transform: translateY(100%);
  }
}

&.page-exit-active {
  ~ .wipe {
    transform: translateY(0);
    transition: transform 1000ms ease;
  }

  main {
    transform: translateY(-${(props) => props.routingPageOffset}px);
  }
  ${'' /* flip animation */}
  ${'' /* animation: 500ms ${transitionOutFlip} 250ms cubic-bezier(0.37, 0, 0.63, 1) both; */}

  backface-visibility: hidden;
}

&.page-enter-done {
  ~ .wipe {
    transform: translateY(-100%);
    transition: transform 1000ms ease;
  }
}
`

const Wipe = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background-color: #aaa;
z-index: 5;
transform: translateY(100%);
`
// for zoom and flip animation
const SecondaryComponent = styled.div`
position: relative;
`

const Grid = styled.div`
width: 100%;
height: 100vh;
top: 0;
left: 0;
position: fixed;
display: grid;
grid-template-rows: repeat(10, 1fr);
grid-template-columns: repeat(10, 1fr);

  div {
    background: #444;
    visibility: hidden;
  }
`

const PageTransition = ({ children, route, routingPageOffset }) => {
  // gsap animation
  const tl = useRef()
  const transitionRef = useRef()

  const [transitioning, setTransitioning] = useState()
  const playTransition = () => {
    setTransitioning(true)
    // gsap animation run
    tl.current.play(0)
  }
  const stopTransition = () => {
    setTransitioning('')
  }

  // gsap animation
  useEffect(() => {
    if (!transitionRef.current) {
      return
    }
      const squares = transitionRef.current.children
      gsap.set(squares, {
        autoAlpha: 1
      })
      tl.current = gsap.timeline({
        repeat: 1,
        repeatDelay: 0.2,
        yoyo: true,
        paused: true
      })
      .fromTo(squares, 
        {
          scale: 0,
          borderRadius: '100'
        },
        {
          scale: 1,
          borderRadius: 0,
          stagger: {
            grid: 'auto',
            from: 'edges',
            ease: 'sine.inOut',
            amount: 0.5
          }
        })
      
        return () => {
          tl.current.kill()
        };
  }, []);

  return (
    <>
    {/* below is needed for the wipe animation as null */}
    {/* <TransitionGroup component={null}> */}
    <TransitionGroup className={transitioning ? 'transitioning' : ''}>
      <CSSTransition 
        key={route} 
        classNames='page' 
        timeout={1000}
        onEnter={playTransition}
        onExited={stopTransition}>
        <MainComponent routingPageOffset={routingPageOffset}>
          <SecondaryComponent className='page-transition-inner'>
          {children}
          </SecondaryComponent>
        </MainComponent>
      </CSSTransition>
    </TransitionGroup>
    {/* <Wipe className="wipe" /> */}
    {/* gsap animations */}
    <Grid ref={transitionRef}>
      {[...Array(100)].map((_, i) => (
        <div key={i} />
      ))}
    </Grid>
    </>
  )
}

export default PageTransition;

