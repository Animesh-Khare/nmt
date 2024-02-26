// from material ui
import Pagination from '@mui/material/Pagination'
import Button from '@mui/material/Button';

// css
import styles from './CommonPagination.module.css'

// images
import arrow from '@assets/images/Arrow.svg'
import { useState,useEffect } from 'react';

interface PropsType{
    totalPage: number
    onPageClickHandler: (e:any, page:number)=>void
    page: number
    onGoHandler: (pageNumber:number) => void
}

const CommonPagination: React.FC<PropsType> = ({totalPage, onPageClickHandler, page, onGoHandler}) => {

    const [gotoPage,setGotoPage] = useState(0);
    const [selectedPage, setSelectedPage] = useState (page)

    useEffect(()=>{
        setSelectedPage(page);
    },[page])

    const onButtonClickHandler=() : void=>{
     
        onGoHandler(gotoPage);
    }

    const onBlurHandler=(e:React.ChangeEvent<HTMLInputElement>) : void=>{
        setGotoPage(Number(e.target.value))
    }

    return (
        <div className={styles.parent_div}>
            <Pagination count={totalPage} onChange={onPageClickHandler} page={selectedPage} size="small"/>

            <div className={styles.go_to_page_container}>
                <span className={styles.text_go_to_page}>Go to page</span>
                <input type="number" placeholder="..." className={styles.input_tag} onBlur={onBlurHandler}></input>
                <span className={styles.text_go}>
                   {/* <a></a> Go */}
                    {/* <img src={arrow} alt=""></img> */}
                    <Button sx={{color:'#383838'}} endIcon={<img src={arrow} alt=""></img>} onClick={onButtonClickHandler}>Go</Button>
                </span>
            </div>
        </div>
    )
}

export default CommonPagination
