import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: black;
    font-size:14px;
    color:white;
  }
  input {
    all: unset;
    box-sizing: border-box;
    appearance: none;
  }
  button {
    background-color: white;
    color: black;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  form {
    width: 100%;
  }
`;

export default GlobalStyle;
