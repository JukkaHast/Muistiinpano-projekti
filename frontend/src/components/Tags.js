import { Link } from "react-router-dom";

const Tags = (props) => {

    let tags = props.taglist.map((tag) => {
        let url="/shownotes/";
		return <li key={tag.id} className="nav-item">
                <Link to={url}>{tag.tagName}</Link>
            </li>     
    
	})
    let taglinks = <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" style={{marginLeft:10}}>Search By Tag</a>
                    <ul className="navbar-nav">
                        {tags}
                    </ul>
                    </nav>
    
    return(
        <div>
            test
            {taglinks}
        </div>
		
	)
}

export default Tags;