const Tag = (props) => {

	return(		
			<tr>
				<td>{props.tag.tagName}</td>
				<td><button className="btn btn-danger"
				onClick={ () => props.changeMode("remove", props.index)}>Remove</button></td>
			</tr>
	)
}

export default Tag;