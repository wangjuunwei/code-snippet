import styled from "styled-components/macro";

export const DragWrapper = styled.div`

  height: 200px;
  line-height: 100px;
  width: 300px;
  border: 2px dashed #eee;
  text-align: center;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
  }

`


export const CubeWrapper = styled.div`
  h4 {
    margin: 20px 0;
    width: 100px;
  }

  .cube {
    width: 20px;
    height: 20px;
    line-height: 18px;
    border: 1px black solid;
    background: #eee;
    float: left;

    > .success {
      background-color: green;
    }

    > .error {
      background-color: red;
    }

    > .uploading {
      background-color: blue;
    }
  }
`
