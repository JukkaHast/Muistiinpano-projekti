const RemoveRow = (props) => {

	return(
		<tr>
			<td>{props.item.text}</td>
			
			<td><button className="btn btn-danger"
			onClick={ () => props.changeMode("cancel")}>Cancel</button></td>
			<td><button className="btn btn-success"
			onClick={() => props.removeItem(props.item.id)}>confirm</button></td>
		</tr>
	)
}

export default RemoveRow;