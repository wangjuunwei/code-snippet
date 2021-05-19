import styled from "styled-components/macro";
import cssConfig from "../../../cssConfig";

export const Wrapper = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 1.25rem 1.25rem;
`

export const Header = styled.div`
  width: 100%;
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

export const HomeWe = styled.div`
  margin-bottom: 2rem;
  margin-top: 1.125rem;
  padding: 1.5625rem 2rem;
  box-shadow: 0.5rem 0.875rem 2.375rem rgb(39 44 49 / 6%), 0.0625rem 0.1875rem 0.5rem rgb(39 44 49 / 3%);
  background-color: #fff;
  border: none;
  border-radius: .5rem;
  p{
    line-height: 1.5;
    margin: 0;
  }
`