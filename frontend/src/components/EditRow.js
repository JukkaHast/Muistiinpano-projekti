import { useState } from "react";

const EditRow = (props) => {
	const [state,setState] = useState({
		notetext:props.item.text		
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
			id:props.item.id
		}
		props.editItem(item);
	}

	return(
		<tr>
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
		</tr>
	)
}

export default EditRow;