const RemoveTag = (props) => {

	return(
		<div>
			<p>{props.tag.tagName}</p>			
			<button className="btn btn-danger"
				onClick={ () => props.changeMode("cancel")}>Cancel</button>
			<button className="btn btn-secondary"
				onClick={() => props.removeTag(props.tag.id)}>Remove</button>			
		</div>
		/*<tr>
			<td>{props.item.text}</td>
			
			<td><button className="btn btn-danger"
			onClick={ () => props.changeMode("cancel")}>Cancel</button></td>
			<td><button className="btn btn-success"
			onClick={() => props.removeItem(props.item.id)}>confirm</button></td>
		</tr>*/
	)
}

export default RemoveTag;