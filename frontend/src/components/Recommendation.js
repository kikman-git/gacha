import React, {useEffect, useState, Suspense} from 'react'
import axios from "axios"
import CustomCard from './CustomCard';
import '../styles/Recommendation.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import { useScrollTrigger } from '@material-ui/core';

function Recommendation() {
    const [items, setItems] = useState([])
    const [keyword, setKeyword] = useState('人気')
    const [page, setPage] = useState(1)
    useEffect(() => {
        callApi(keyword, page)

        
      }, []);

    const callApi = async (keyword, page) => {
        setKeyword(keyword)
        const applicationId = "1074305052326638295"
        const endpoint = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&keyword=${keyword}&applicationId=${applicationId}&page=${page}`
        const response = await axios.get(endpoint)
        setItems(response.data.Items)
    }

    const onSubmit = (e) => {
        console.log('you are onSubmit')
        e.preventDefault();
        const keyword = e.target.keyword.value
        setPage(1)
        callApi(keyword, 1)

    }

    const handleChange = (event, value) => {
        setPage(value);
        callApi(keyword, value)
        window.scrollTo({
            top: 0,
            behavior: "auto"
          });
      };
    return (
        <div>
            <form className="search" noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField id="outlined-basic" label="Keyword" variant="outlined" name="keyword"style={{marginRight:"10px"}} />
                <Button variant="contained" color="secondary" type="submit">
                Search
                </Button>
            </form>
            <div className="cards">
            {items && items.map((item, index) =>(
                <CustomCard item={item.Item} key={item.Item.itemName + index.toString}/>
            ))}
            </div>
            <div class="pagination">
            <Pagination count={10} color="secondary" page={page} onChange={handleChange}  />
            </div>
        </div>
    )
}

export default Recommendation