import styled from "styled-components/macro";
import cssConfig from "../../cssConfig";

export const Header = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 1rem;

  h1 {
    margin-bottom: 0px;

    a {
      color: ${cssConfig.fontColor}
    }
  }
`