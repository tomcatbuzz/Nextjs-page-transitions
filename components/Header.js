// 'use client'
import { useRouter } from 'next/router';
// import { usePathname } from 'next/navigation';
import Link from 'next/link'
import styled from 'styled-components';
// import StyledLink from '@/components/ActiveLink'


const StyledHeader = styled.header`
  position: fixed;
  z-index: 9;
  width: 100%;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

const A = styled(Link)`
  padding: 20px;
  color: #000;
  text-decoration: none;
  cursor: pointer;

  ${(props) => props.isActive && `
    text-decoration: underline;
  `};
`;


// const NavLink = styled(Link)`
//   padding: 20px;
//   color: #000;
//   text-decoration: none;
//   cursor: pointer;

//   ${'' /* test the ```&.``` below before props */}
//   ${(props) => (props.isActive) && `
//     text-decoration: underline;
//   `};
// `

const Header = () => {
  const { route, asPath } = useRouter();
  // const pathname = usePathname()
  return (
    // <StyledHeader>
    //   <Link href="/">
    //     <A isActive={route === '/'}>Home</A>
    //   </Link>
    //   <Link href="/about">
    //     <A isActive={route === '/about'}>About</A>
    //   </Link>
    //   <Link href="/contact">
    //     <A isActive={route === '/contact'}>Contact</A>
    //   </Link>
    // </StyledHeader>
    <StyledHeader>
      <A href="/" isActive={route === '/'}>Home</A>
      <A href="/about" isActive={route === '/about'}>About</A>
      <A href="/contact" isActive={route === '/contact'}>Contact</A>
    </StyledHeader>
  );
};


export default Header;