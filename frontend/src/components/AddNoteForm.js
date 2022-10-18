import { useState } from "react";

const AddNoteForm = (props) => {

	const [state,setState] = useState({
		notetext:"",
		taglist:[]
		
	})

	const onChange = (event) => {		
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}

	return (
		<div>
			
		</div>
	)
}

export default AddNoteForm;