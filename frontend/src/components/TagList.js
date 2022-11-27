import { useState } from 'react';
import AddTagForm from './AddTagForm';
import RemoveTag from './RemoveTag';
import Tag from './Tag';

const TagList = (props) => {

	const [state,setState] = useState({		
		removeIndex:-1		
	})

	const changeMode = (mode,index) => {
		if(mode === "remove"){
			setState({
				removeIndex:index				
			})
		}		
		if(mode === "cancel") {
			setState({
				removeIndex:-1				
			})
		}
	}

	const removeTag = (id) => {
		props.removeTag(id);
		changeMode("cancel");
	}
	const addTag = (item) => {
		props.addTag(item);
	}
	
	let items = props.list.map((tag,index) => {		
		if(state.removeIndex === index) {
			return <RemoveTag key={tag.id} tag={tag} changeMode={changeMode} removeTag={removeTag}/>
		}
		return <Tag key={tag.id} tag={tag} index={index} changeMode={changeMode}/>
	})
	//let items = props.list.map((item) => {
	//	return <Row list={item.text}/>;
	//})

	return(
		<div>
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Tag name</th>					
				</tr>
			</thead>
			<tbody>
				{items}
			</tbody>
		</table>
		<AddTagForm addTag={addTag}></AddTagForm>
		</div>
	)
}

export default TagList;