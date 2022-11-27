import { useState } from "react";

const EditRow = (props) => {
	const [state,setState] = useState({
		notetext:props.note.text,
		otsikko:props.note.otsikko
	})

	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}

	const editItem = () => {
		let item = {
			...state,
			id:props.note.id
		}
		props.editItem(item);
	}

	return(
		<div>
			<p><input type="text"
						name="otsikko"
						id="otsikko"
						onChange={onChange}
						className="form-control"
						value={state.otsikko}/></p>
			<p><input type="text"
						name="notetext"
						id="notetext"
						onChange={onChange}
						className="form-control"
						value={state.notetext}/></p>
			<button className="btn btn-danger"
				onClick={editItem}>Save</button>
			<button className="btn btn-secondary"
				onClick={() => props.changeMode("cancel")}>Cancel</button>			
		</div>
		/*<tr>
			<td><input type="text"
						name="notetext"
						id="notetext"
						onChange={onChange}
						className="form-control"
						value={state.notetext}/>
			</td>			
			<td><button className="btn btn-success"
			onClick={editItem}>Save</button></td>
			<td><button className="btn btn-danger"
			onClick={() => props.changeMode("cancel")}>Cancel</button></td>
		</tr>*/
	)
}

export default EditRow;