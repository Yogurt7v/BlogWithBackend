import styled from "styled-components";
import PropTypes from "prop-types"; 
import { Button } from "../../../../components/button/button";

const PaginationContainer = ({className, setPage, lasPage, page}) =>{


    return (
        <div className={className}>
            <Button onClick={() => setPage(1)} className={page === 1 ? "disabled" : ""}>В начало</Button>
            <Button onClick={() => setPage(page - 1)} className={page === 1 ? "disabled" : ""}>Предыдущая</Button>
            <div className="current-page">Страница: {page}</div>
            <Button onClick={() => setPage(page+1)} className={page === lasPage ? "disabled" : ""}>Следующая</Button>
            <Button onClick={() => setPage(2)} className={page === lasPage ? "disabled" : ""}>В конец</Button>
        </div>
    )
}


export const Pagination = styled(PaginationContainer)`
    display: flex;
    justify-content: center;
    text-align: center;
    position: absolute;
    bottom: 140px;
    width: 100%;
    gap: 20px;

    Button{
        width: 100px;
    }

    & .current-page{
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        width: 100px;
        height: 30px;
        text-align: center;
    }

    & .disabled {
        pointer-events: none;
        background-color: white;
        border: 1px solid grey;
        opacity: 0.35;
      }
`


Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    lasPage: PropTypes.number.isRequired,
}