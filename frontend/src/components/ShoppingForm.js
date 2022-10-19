import { useState } from "react";

const ShoppingForm = (props) => {
	const [state,setState] = useState({		
		notetext:"",
		userid:1
		
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
		props.addItem(item);
		setState({
			notetext:""			
		})
	}
	return (
		<div style={{
			backgroundColor:"lightblue",
			width:"40%",
			margin:"auto"
		}}>
			<form onSubmit={onSubmit} className="mb-3">
				<label htmlFor="notetext" className="form-label">notetext</label>
				<input notetext="text"
						name="notetext"
						id="notetext"
						className="form-control"
						value={state.notetext}
						onChange={onChange}/>
				<label htmlFor="userid" className="form-label">Count</label>
				<input notetext="number"
						name="userid"
						id="userid"
						className="form-control"
						value={state.count}
						onChange={onChange}/>				
				<input type="submit" className="btn btn-primary" value="Add"/>
			</form>
		</div>
	)
}

export default ShoppingForm;