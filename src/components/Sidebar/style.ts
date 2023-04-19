import styled from "styled-components/macro";

export const StyledSidebar = styled.div`
    position: fixed;
    z-index: 1200;
    background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
    height: calc(100vh - 2rem);
    width: 290px;
    margin: 1rem 1rem 0rem 1rem;
    border-radius: 0.75rem;
`

export const StyledHead = styled.div`
    display: flex;
    align-items: center;
    padding: 24px 32px 8px;
    text-align: center;
    background: transparent;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
`

export const StyledBody = styled.div`
    padding: 8px;
    height: inherit;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    overflow-y: auto;
`

export const StyledHeadIcon = styled.div`
    height: fit-content;
    width: fit-content;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background: rgb(255, 255, 255);
    border-radius: 0.75rem;
`

export const StyledHorizontal = styled.div`
    flex-shrink: 0;
    border-top: 0px solid rgba(0, 0, 0, 0.08);
    border-right: 0px solid rgba(0, 0, 0, 0.08);
    border-left: 0px solid rgba(0, 0, 0, 0.08);
    height: 0.0625rem;
    margin: 1rem 0px;
    border-bottom: none;
    opacity: 0.25;
    background-color: transparent;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255), rgba(255, 255, 255, 0)) !important;
`