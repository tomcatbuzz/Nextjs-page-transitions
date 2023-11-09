import { useRouter } from 'next/router'
import styled from 'styled-components'

const StyledLink = styled.a`
  text-decoration: ${({ href, path }) => (href === path ? "none" : "underline")};
  padding: 20px;
  color: 'white';
  cursor: pointer;
`

function ActiveLink({ children, href }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <StyledLink href={href} onClick={handleClick} currentPath={router.asPath}>
      {children}
    </StyledLink>
  )
}

export default ActiveLink