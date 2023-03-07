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
    console.log(encodeURIComponent("Ransomware payments down 40% in 2022 – Week in security with Tony Anscombe"))

    return (

        <StyledHome>
        <GlobalContext.Provider value={{filteredArticles,searchQuery,handleSearch}} >

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
}    

.home-grid{
    width: 100%;
    /* background: var(--pallete-1); */
}
.home-main{
    background-image: linear-gradient(130deg , var(--pallete-2),#ecf4f8);
    display: flex;
}
`