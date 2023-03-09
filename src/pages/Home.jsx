import styled from "styled-components";
import {Routes, Route } from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from "axios";

import ArticleBody from "../components/ArticleBody";
import ArticlesList from "../components/ArticlesList";
import FeedsList from "../components/FeedsList";
import Navbar from "../components/Navbar";
import {GlobalContext} from "../contexts/GlobalContext";


const Home = () => {
    const [feeds,setFeeds] = useState([]);
    const [articles, setArticles] = useState([]); 
    let [filteredArticles, setFilteredArticles] = useState([]); 
    // let filteredArticles =[]
    const [searchQuery,setSearchQuery]=useState("");
    function handleSearch(e){
        setSearchQuery(e)
        // filteredArticles= articles.filter(article=>article.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
	useEffect(() => {
		axios.get("http://backend.cyberbriefs.internsprogram.com/api/nameicon/")
			.then((response) => {
				setFeeds(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
    useEffect(() => {
		axios.get("http://backend.cyberbriefs.internsprogram.com/api/database/")
			.then((response) => {
				setArticles(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []); 
    function separateDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();
        const hour = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const months = ["January","February","March","April","May","June","July","August","September","Octomber","November","December"];
        const hours = () => {
            if (hour > 13) {
                return hour - 12;
            }
            if (hour < 13) {
                return hour;
            }
        };
        return [year, months[month], day, hours(), minutes];
    }
    return (

        <StyledHome>
        <GlobalContext.Provider value={{filteredArticles,separateDate,setSearchQuery,searchQuery,handleSearch}} >
            <Routes>
                <Route path={`/`} element={<FeedsList feeds={feeds} articles={articles} />} />
                <Route path={`/:feedname`} element={<FeedsList feeds={feeds} articles={articles} />} />
                <Route path={`/:feedname/:articlename`} element={<FeedsList feeds={feeds} articles={articles} />} />
            </Routes>
            <div className="home-grid">
                <Navbar articles={articles} />
                <div className="home-main">
                    <Routes>
                        <Route path={`/`} element={<ArticlesList articles={articles} feeds={feeds} />} />
                        <Route path={`/:feedname`} element={<ArticlesList articles={articles} feeds={feeds} />} />
                        <Route path={`/:feedname/:articlename`} element={<ArticlesList articles={articles} feeds={feeds} />} />
                    </Routes>

                    <Routes>
                        <Route path={`/`} element={<ArticleBody feeds = {feeds} articles ={articles}/>} />
                        <Route path={`/:feedname`} element={<ArticleBody  articles={articles} feeds={feeds} />} />
                        <Route path={`/:feedname/:articlename`} element={<ArticleBody articles={articles} feeds={feeds} />} />
                    </Routes>
                </div>
            </div>
        </GlobalContext.Provider>
        </StyledHome>
    );
}
 
export default Home;

const StyledHome = styled.div`
&{
    display: flex;
    width: 100%;
    overflow: hidden;
}    

.home-grid{
    width: 100%;
    /* background: var(--pallete-1); */
}
.home-main{
    background-image: linear-gradient(130deg , var(--pallete-2),#ecf4f8);
    display: flex;
}
@media screen and (max-width:1000px){
    .home-main{
        display: grid;
        overflow: auto;
        /* overflow: hidden; */

    }
}
`