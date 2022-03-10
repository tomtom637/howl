import styled from "styled-components";

const FooterStyled = styled.footer`
    background: var(--dark-grey);
    color: #fff;
    text-align: center;
    font-weight: 300;
    font-size: 13px;
    word-spacing: 5px;
    padding: 15px;
    span {
        font-family: 'Poller One', cursive;
        font-size: 20px;
    }
`;

export default function Footer() {
    return (
        <FooterStyled>
            <span>Howl</span> by CONNECT-E            
        </FooterStyled>
    );
}