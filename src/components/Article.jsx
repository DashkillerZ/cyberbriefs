import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext } from 'react';
import {GlobalContext} from "../contexts/GlobalContext";

const Article = ({data,isActive}) => {
    const { feedname } = useParams();
    let {separateDate} = useContext(GlobalContext);

    return (
        <StyledArticle className="article">
		    <Link to={`/${feedname}/${encodeURIComponent(data.title)}`} className={isActive?"list-el active":"list-el"}>
		    	<div className="icon">
		    		<span className="material-symbols-outlined">forum</span>
		    	</div>
		    	<div>
		    		<div className="article-title" title={data.title}>{data.title}</div>
                    <div className="article-summery">{data.summary}</div>
		    	</div>
		    	<div>
		    		<div className="article-date">{
                        separateDate(data.publishedDate)[3]+(
                            parseInt(separateDate(data.publishedDate)[3])>13?"pm":"am"
                        )
                    }</div>
		    		<div className="favourite">
		    			<span className="material-symbols-outlined">star</span>
		    		</div>
		    	</div>
		    </Link>
        </StyledArticle>
    );
}
 
export default Article;

const StyledArticle = styled.div`
--transition-time: 300ms   ;
--padding-inline:10px;
--max-width:320px;
.list-el{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    border-radius: 10px;
    margin: 8px 0;
    text-decoration: none;
    color: unset;
    user-select: none;
    transition:var(--transition-time) ;
    max-width: var(--max-width);
}
.list-el:hover{
    background: var(--secondary-lightest);
}
.list-el.active{
    background: var(--secondary-lightest);
}
.list-el .icon{
    color: var(--white);
    padding: 4px;
    width: 30px;
    min-width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    margin-left: var(--padding-inline);
    background: var(--pallete-4);
}

.list>div:nth-child(even) .icon{
    background: var(--pallete-4);
    
}
.list>div:nth-child(odd) .icon{
    background: var(--pallete-5);
}

.list-el>div:nth-child(2){
    width: 200px;
}
.list-el .article-title{
    white-space: nowrap;
    width:100%;
    text-overflow: ellipsis;
    overflow: hidden;
    margin:0 0 5px 0;
    font-size: 0.9rem;

}
.list-el .article-title::first-letter{
    text-transform: uppercase;
}
.list-el .article-summery{
    color: var(--secondary-lighter);
    font-size: 0.7rem;
    width:100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: flexbox;
    line-clamp: 2;
    box-orient: vertical;
}
.list-el .article-summery::first-letter{
    text-transform: uppercase;
}


.list-el>div:last-child{
    margin-right: var(--padding-inline);
}
.list-el .article-date{
    margin:0 0 5px 0;
    color: var(--secondary-lighter);
    font-size: 0.8rem;
    
}
.list-el .favourite{
    color: var(--secondary-lighter);
    text-align: center;

}
    
`