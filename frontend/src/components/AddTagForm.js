import { useState } from "react";

const AddTagForm = (props) => {

	const [state,setState] = useState({
		tagName:""
	})

	const onChange = (event) => {		
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}

	

	const onSubmit = (event) => {
		event.preventDefault();
		let item = {
			...state
		}
		props.addTag(item);
		setState({
			tagName:""
		})
		//props.getTagNoteIds();
		//props.getNotes();
	}
	
	return (
		<div style={{
			backgroundColor:"lightblue",
			width:"40%",
			margin:"auto"
		}}>
			<form onSubmit={onSubmit}>
				<br/>
				<label htmlFor="tagName">Tag name: </label>				
				<input type="text"
						name="tagName"
						id="tagName"						
						value={state.tagName}
						onChange={onChange}/>
				<br/>				
				<input type="submit" value="Add"/>
			</form>
		</div>
	)
}

export default AddTagForm;