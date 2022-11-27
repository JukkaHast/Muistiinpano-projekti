const Tag = (props) => {

	return(
		<div>
			<tr>
				<td>{props.tag.tagName}</td>
				<td><button className="btn btn-danger"
				onClick={ () => props.changeMode("remove", props.index)}>Remove</button></td>
			</tr>
			
		</div>

	)
}

export default Tag;