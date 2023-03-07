import { Link } from "react-router-dom";
import styled from "styled-components";
const Feed = ({data ,articles,isActive}) => {
    let articlelink= articles.find(article=>data.feedName===article.feedName);
    return (
        <StyledFeed>
            <Link to={`/${data.feedName}/${encodeURIComponent(articlelink?.title)}`} className={isActive?"list-el active":"list-el"} key={data.id} onClick={() => {}}>
				<div className="icon">
					<img src={data.feedIcon} alt="" />
				</div>
				<div className="source-title" title={data.feedName}>{data.feedName}</div>
				<span className="material-symbols-outlined">expand_more</span>
				<div className="border-right"></div>
			</Link>
        </StyledFeed>
    ); 
}
export default Feed;

const StyledFeed = styled.div`
--transition-time:300ms ;
--max-width: 300px;
scroll-snap-type: y mandatory !important;
.list-el{
    display: flex;
    align-items: center;
    height: 50px;
    text-decoration: none;
    color:unset ;
    transition:  var(--transition-time);
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    max-width: var(--max-width);
}
.list-el.active .border-right{
    transform: translate(0);
}
.list-el.active {
    background: var(--secondary-lightest);
}
.list-el.active .material-symbols-outlined{
    transform: rotate(-90deg);
}
.list-el:hover .border-right{
    transform: translate(0);
}
.list-el:hover {
    background: var(--secondary-lightest);
}
.list-el:first-child{
    border-top: 2px solid var(--secondary-lightest);

}
.list-el .source-title{
    font-size: 0.8rem;
    margin: 0 4px;
    white-space: nowrap;
    width:calc( 100% - 20px);
    text-overflow: ellipsis;
    overflow: hidden;
}

.list-el .icon{
    width: 1.5rem ;
    height: 1.5rem;
    min-width: 1.5rem;
    margin: 4px;
    margin-left: 10px;
    padding: 5px;
    border: 2px solid var(--secondary-lightest);
    border-radius: 2rem;
    background: var(--white);
}
.list-el img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
}
.list-el .material-symbols-outlined{
    margin-right: 15px;
    color: var(--secondary-light);
    transition: var(--transition-time);
}
.list-el .border-right{
    height: 100%;
    width: 5px;
    background: var(--pallete-4);
    transform: translateX(4px);
    transition: var(--transition-time);
}
`