import React,{useState,useEffect} from 'react';


const ShowNotes = (props) => {
    const [tagValue, setTagValue] = useState({
        tagid:0
    });
    const [noteidList, setNoteidList] = useState({
        noteidlist: []        
    });
    const [noteList, setNoteList] = useState({
        notelist:[]
    })
    const tagChoice = (e) => {
        console.log(e.target.value);
        setTagValue({
            tagid:e.target.value});       
    };
    useEffect(() => {
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
        
        
        
	},[tagValue])

    function filternoteid(value){
       return value > 0;
    }

    function findnote(note, value){
        return note.id === value;
    }

    let tagselect = props.taglist.map((tag) => {
		return <option key={tag.id} value={tag.id}>{tag.tagName}</option>
	})

    let tagSel = <select  name="taglist" id="taglist" onChange={tagChoice}>
                    {tagselect}
                </select>
    let notes = []
    if(typeof noteList.notelist[0] !== 'undefined'){
        notes = noteList.notelist.map((note) => {
            return <div key={note.id}>
                <h3>{note.otsikko}</h3>
                <p>{note.text}</p>
            </div>
        })
    } else {
        notes = <div><h3>No notes with this tag</h3></div>
    }
   
    
    
    //
    return (
        <div>

            
            {tagSel}
            {notes}
        </div>
    )
}

export default ShowNotes;