import styled from "styled-components/macro";

interface codeAction {
    isShow: boolean
}

export const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  margin: 0 0 16px;
  position: relative;
  transition: all .2s;
  max-width: 65rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 1.25rem 1.25rem;

  .code-box-demo {
    //border-bottom: 1px solid #f0f0f0;
    color: rgba(0, 0, 0, .85);
    padding: 42px 24px 10px;
    background-color: #fff;
  }

  .highlight-wrapper {
    overflow: auto;
    border-radius: 2px;
    color: rgba(0, 0, 0, .85);
    display: block;
    font-size: 14px;
    line-height: 2;
    padding: 16px 32px;
  }
`


export const CodeAction = styled.section`
  display: flex;
  justify-content: center;
  opacity: .7;
  padding: 12px 0;
  transition: opacity .3s;
  border-top: 1px dashed #f0f0f0;
  border-bottom: ${(props: codeAction) => props.isShow ? '1px dashed #f0f0f0' : null};

  .code-box-code-action {
    align-items: center;
    color: rgba(0, 0, 0, .45);
    cursor: pointer;
    display: flex;
    height: 16px;
    margin-left: 16px;
    position: relative;
    transition: all .24s;
    width: 16px;

    .code-expand-icon-show {
      opacity: .55;
      pointer-events: auto;
      box-shadow: none;
      left: 0;
      margin: 0;
      max-width: 100%;
      position: absolute;
      top: 0;
      transition: all .4s;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      width: 100%;

      :hover {
        opacity: 1;
      }
    }

    .code-expand-icon-hide {
      box-shadow: none;
      left: 0;
      margin: 0;
      max-width: 100%;
      position: absolute;
      top: 0;
      transition: all .4s;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      width: 100%;
      opacity: 0;
      pointer-events: none;
    }
  }
`