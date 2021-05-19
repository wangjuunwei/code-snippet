import styled from "styled-components/macro";
import cssConfig from "../../../cssConfig";

export const MapWrapper = styled.div`

  padding-top: 2.1875rem;
  position: relative;
  padding: 1.5625rem 2rem;
  margin-top: 1.125rem;
  margin-bottom: 3.125rem;
  box-shadow: 0.5rem 0.875rem 2.375rem rgb(39 44 49 / 6%), 0.0625rem 0.1875rem 0.5rem rgb(39 44 49 / 3%);
  background-color: #fff;
  border: none;
  border-radius: .5rem;

  .nya-title {
    position: absolute;
    left: 1.875rem;
    top: -1.125rem;
    padding: .5rem .9375rem;
    font-weight: 700;
    background-color: ${cssConfig.themeColor};
    color: #fff;
    font-size: 90;
    box-shadow: 0 0.5rem 0.625rem rgb(36 159 253 / 30%);
    border-radius: .5rem;

    span {
      font-size: 1.0625rem;
      vertical-align: middle;
    }

    span:nth-child(2) {
      margin-left: 0.4rem;
    }
  }
}
`

export const Mapitem = styled.a`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: calc(20% - .875rem);
  margin: .4375rem;
  padding: .625rem .9375rem;
  font-size: 1.125rem;
  font-weight: 700;
  text-align: center;
  color: ${cssConfig.fontColor};
  letter-spacing: .0625rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: transparent;
  cursor: pointer;
  border-radius: .25rem;
  border: none;
  box-shadow: 0 0.125rem 0.125rem 0 rgb(8 11 14 / 10%);
  vertical-align: top;
  transform: translateZ(0);
  :hover {
    color: #fff;
    transform: translateY(-.125rem);
    box-shadow: 0 0 0.0625rem 0 rgb(8 11 14 / 6%), 0 0.375rem 0.375rem -0.0625rem rgb(8 11 14 / 10%);
    background-color: ${cssConfig.themeColor};
    transition: transform .1s ease,background-color .1s ease,color .05s ease-out;
  }
`