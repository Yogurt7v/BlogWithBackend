import image from "./Logo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoName = styled.div`
    font-size: 40px;
    font-weight: 700;

`
const LogoNameSmall = styled.div`
    font-size: 30px;
    font-weight: 500;
`

const Image = styled.img`
    height: 80px;
    padding-right: 20px;
`

 const LogoContainer = ({ className }) =>{
    return (
        <>
        <Link className={className} to={"/"}>
            <Image src={image} alt="Logo"/>
            <div>
                <LogoName>Blog</LogoName>
                <LogoNameSmall>Web-developer</LogoNameSmall>
            </div>
        </Link>
        </>
    )
}

export const Logo = styled(LogoContainer)`
    display: flex;
    align-items: center;
`
