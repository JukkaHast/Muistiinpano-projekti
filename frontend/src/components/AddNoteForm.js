import { useState } from "react";

const AddNoteForm = (props) => {

	const [state,setState] = useState({
		notetitle:"",
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

	const onChecked = (event) => {
		var value = event.target.value;
		let tempstate = {...state};
		let tags = tempstate.taglist;
		//tags.push(value);
		if(event.target.checked){
			tags.push(value);
		} else {
			const index = tags.indexOf(value);
			if (index > -1) { // only splice array when item is found
			tags.splice(index, 1); // 2nd parameter means remove one item only
			}
		}
		console.log(event.target.checked)
		setState((state) => {
			return {
				...state,
				taglist: tags
			}
		})
	}

	const onSubmit = (event) => {
		event.preventDefault();
		let item = {
			...state
		}
		props.addNote(item);
		setState({
			...state,
			notetitle:"",
			notetext:""		
		})
		//props.getTagNoteIds();
		//props.getNotes();
	}
	let tagboxes = props.taglist.map((tag) => {
		return <div key={tag.id}>
			<input type="checkbox" id={tag.tagName} name={tag.tagName} value={tag.id} onChange={onChecked}/>
			<label htmlFor={tag.tagName}>{tag.tagName}</label>
		</div>
	})
	let tags = <fieldset>
    <legend>Choose tags:</legend>    
	{tagboxes}
	</fieldset>
	return (
		<div style={{
			backgroundColor:"lightblue",
			width:"40%",
			margin:"auto"
		}}>
			<form onSubmit={onSubmit}>
				<br/>
				<label htmlFor="notetitle">Otsikko: </label>				
				<input type="text"
						name="notetitle"
						id="notetitle"						
						value={state.notetitle}
						onChange={onChange}/>
				<br/>
				<label htmlFor="notetext">Add Note:</label>
				<br/>
				<textarea id="notetext" name="notetext" rows="12" cols="50" onChange={onChange} value={state.notetext}></textarea>
				<br/>
				
				<br/>
				{tags}
				<br/>		
				<input type="submit" value="Add"/>
			</form>
		</div>
	)
}

export default AddNoteForm;