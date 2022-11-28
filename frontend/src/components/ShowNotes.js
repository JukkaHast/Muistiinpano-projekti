import React,{useState,useEffect} from 'react';
import EditRow from './EditRow';
import RemoveRow from './RemoveRow';
import Row from './Row';


const ShowNotes = (props) => {

    const [tagValue, setTagValue] = useState({
        tagid:1
    });
    const [noteidList, setNoteidList] = useState({
        noteidlist: []        
    });
    const [noteList, setNoteList] = useState({
        notelist:[]
    });
    
    const [state,setState] = useState({		
		removeIndex:-1,
		editIndex:-1
	})

	const changeMode = (mode,index) => {
		if(mode === "remove"){
			setState({
				removeIndex:index,
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				removeIndex:-1,
				editIndex:index
			})
		}
		if(mode === "cancel") {
			setState({
				removeIndex:-1,
				editIndex:-1
			})
		}
	}

	const removeItem = (id) => {
		props.removeNote(id);
		changeMode("cancel");
        
	}

	const editItem = (item) => {
		props.editNote(item);
		changeMode("cancel");
	}	

    const tagChoice = (e) => {
        console.log(e.target.value);
        setTagValue({
            tagid:e.target.value});
        /*let newlist = props.tagnoteidlist.map((tag) => {
            if(parseInt(tag.tagId) === parseInt(e.target.value) && Number.isInteger(tag.noteId)){
                return tag.noteId;
            } else {
                return 0;
            }
        })
        let newlistfiltered = newlist.filter(filternoteid)
        //console.log(newlistfiltered);
        setNoteidList({            
            noteidlist: newlistfiltered
        })
        let newnotelist = [];
        if(newlistfiltered.length > 1){
            for(const ids of newlistfiltered){               
                const result = props.list.find(({ id }) => id === ids);
                newnotelist = newnotelist.concat(result);
                setNoteList({                
                    notelist: newnotelist
                })
                console.log("te", result, ids);
                //console.log("ss", fornotes);
            }
        } else {
            const result = props.list.find(({ id }) => id === newlistfiltered[0]);
            newnotelist = newnotelist.concat(result);
            setNoteList({                
                notelist: newnotelist
            })
        }*/
    };
    
    

    /*useEffect(() => {
        //console.log(noteidList.noteidlist);
        let newlist = props.tagnoteidlist.map((tag) => {
            if(parseInt(tag.tagId) === parseInt(tagValue.tagid) && Number.isInteger(tag.noteId)){
                return tag.noteId;
            } else {
                return 0;
            }
        })
        let newlistfiltered = newlist.filter(filternoteid)
        //console.log(newlistfiltered);
        setNoteidList({            
            noteidlist: newlistfiltered
        })
        let newnotelist = [];
        if(newlistfiltered.length > 1){
            for(const ids of newlistfiltered){               
                const result = props.list.find(({ id }) => id === ids);
                newnotelist = newnotelist.concat(result);
                setNoteList({                
                    notelist: newnotelist
                })
                console.log("te", result, ids);
                //console.log("ss", fornotes);
            }
        } else {
            const result = props.list.find(({ id }) => id === newlistfiltered[0]);
            newnotelist = newnotelist.concat(result);
            setNoteList({                
                notelist: newnotelist
            })
        }
        
        
        
	},[props.list])*/    

    //function findalltags(item){
    //    return note === value;
    //}

    
    /*let notes = []
    if(typeof noteList.notelist[0] !== 'undefined'){
        notes = noteList.notelist.map((note,index) => {
            if(typeof note === 'undefined'){
                return <div><h3>Deleted</h3></div>
            }
            if(state.editIndex === index) {
                return <EditRow key={note.id} note={note} editItem={editItem} changeMode={changeMode}></EditRow>
            }
            if(state.removeIndex === index){
                return <RemoveRow key={note.id} note={note} changeMode={changeMode} removeItem={removeItem}></RemoveRow>
            }
            return <Row key={note.id} note={note} index={index} changeMode={changeMode}></Row>
            /*return <div key={note.id}>
                <h3>{note.otsikko}</h3>
                <p>{note.text}</p>
            </div>
        })
    } else {
        notes = <div><h3>No notes with this tag</h3></div>
    }*/
    
    // Dropdown valikko tageille
    let tagselect = props.taglist.map((tag) => {
		return <option key={tag.id} value={tag.id}>{tag.tagName}</option>
	})

    let tagSel = <select  name="taglist" id="taglist" onChange={tagChoice}>
                    {tagselect}
                </select>

    let notes2 = []
    let pushed = []
    props.list.map((note,index) => {
        let check = false
        props.tagnoteidlist.map((element) => {            
            if (parseInt(element.tagId) === parseInt(tagValue.tagid)) {               
                if(parseInt(element.noteId) === parseInt(note.id)){                    
                    check = true
                    return;
                }
            }
        });        
        if(check){
            let tagsfornote = props.tagnoteidlist.filter(function (e) {
                return e.noteId === note.id;
            })
            let tagnamesfornote = []
            tagsfornote.forEach(element => {
                pushed = props.taglist.filter(function (e) {
                    return e.id === element.tagId
                })
                console.log("pushed", pushed)
                if(pushed.length > 0){
                    tagnamesfornote.push(pushed[0].tagName)
                }                
            });
            let tagstring = tagnamesfornote.join(", ")
            if(state.editIndex === index) {
                notes2.push(<EditRow key={note.id} note={note} editItem={editItem} changeMode={changeMode}></EditRow>)
                return;
            }
            if(state.removeIndex === index){
                notes2.push(<RemoveRow key={note.id} note={note} changeMode={changeMode} removeItem={removeItem}></RemoveRow>)
                return; 
            }
            notes2.push(<Row key={note.id} tagstring={tagstring} note={note} index={index} changeMode={changeMode}></Row>)
            return; 
        }
    })
    if(notes2.length === 0){
        notes2.push(<p key="empty">No notes with this tag</p>)
    }    
    return (
        <div>            
            {tagSel}
            {notes2}
        </div>
    )
}

export default ShowNotes;