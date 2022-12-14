const RemoveRow = (props) => {

	return(
		<div>
			<p>{props.note.otsikko}</p>
			<p>{props.note.text}</p>
			<button className="btn btn-danger"
				onClick={ () => props.changeMode("cancel")}>Cancel</button>
			<button className="btn btn-secondary"
				onClick={() => props.removeItem(props.note.id)}>Remove</button>			
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

export default RemoveRow;