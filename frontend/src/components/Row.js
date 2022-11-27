const Row = (props) => {

	return(
		<div>
			<p>{props.note.otsikko}</p>
			<p>{props.note.text}</p>
			<button className="btn btn-danger"
				onClick={ () => props.changeMode("remove", props.index)}>Remove</button>
			<button className="btn btn-secondary"
				onClick={() => props.changeMode("edit", props.index)}>Edit</button>			
		</div>

	)
}

export default Row;