import { Link } from "react-router-dom";

const Navbar = (props) => {
	let links = <ul className="navbar-nav"></ul>
	if(props.isLogged){
		links = <ul className="navbar-nav">
					<li className="nav-item" style={{marginLeft:10,listStyleType:"none"}}>
						<Link to="/esitys">Esitys</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10,listStyleType:"none"}}>
						<Link to="/">Main</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10,listStyleType:"none"}}>
						<Link to="/addnote">Add new note</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10,listStyleType:"none"}}>
						<Link to="/tags">Tags</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10,listStyleType:"none"}}>
						<Link to="/" onClick={props.logout}>Logout</Link>
					</li>
				</ul>
	}
	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<p className="navbar-brand" style={{marginLeft:10}}>Muistilaput</p>
			{links}			
		</nav>
	)
}

export default Navbar;