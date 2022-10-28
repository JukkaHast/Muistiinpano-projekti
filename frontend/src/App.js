import {useState,useEffect} from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import Test from './components/Test';
import LoginPage from './components/LoginPage';
import AddNoteForm from './components/AddNoteForm';
import Tags from './components/Tags';
import ShowNotes from './components/ShowNotes';


function App() {

  const [state,setState] = useState({
		list:[],
		taglist:[],
		tagnoteidlist:[],
		token:"",
		isLogged:false,
		loading:false,
		error:""
	})

  const [urlRequest,setUrlRequest] = useState({
    url:"",
    request:{},
    action:""
  })

  const setLoading = (loading) => {
		setState((state) => {
			return {
				...state,
				loading:loading,
				error:""
			}
		})
	}

  const setError = (error) => {
		setState((state) => {
			let tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const cleanState = () => {
		let state = {
			list:[],
			taglist:[],
			tagnoteidlist:[],
			isLogged:false,
			token:"",
			loading:false,
			error:""
		}
		saveToStorage(state);
		setState(state);
	}

  //STORAGE FUNCTIONS
	
	const saveToStorage = (state) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	useEffect(() => {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			setState(state);
			
				console.log("testtest")
			
		}
	},[])	
	/*useEffect(() => {
		const getthings = async () => {
			if(state.isLogged) {
				getNotes(state.token);
				getTags(state.token);
				getTagNoteIds(state.token);
		}
	}
	getthings();
 	},[])*/
	useEffect(() => {
		if(state.isLogged){
			getTagNoteIds(state.token);
		}
		
	},[state.list])
	useEffect(() => {
		if(state.isLogged){
			getTags(state.token);
		}		
	},[state.tagnoteidlist])
  useEffect(() => {

    const fetchData = async () => {
      if(!urlRequest.url) {
        return;
      }
      setLoading(true);
      let response = await fetch(urlRequest.url,urlRequest.request);
      setLoading(false);
      if(response.ok) {
        switch(urlRequest.action) {      
			case "addnote":
				getNotes(state.token);
				
				
				return;    
			case "getnotes":
				let data = await response.json();			       
				if(data) {
					setState((state) => {
						let tempState = {
							...state,
							list:data
						}
						saveToStorage(tempState);
						return tempState;
					})
					//getTagNoteIds();
					//getTags();
				}
			
				return;
			case "gettags":
				let tagdata = await response.json();			       
				if(tagdata) {
					setState((state) => {
						let tempState = {
							...state,
							taglist:tagdata
						}
						saveToStorage(tempState);
						return tempState;
					})
				}
				return;
			case "gettagnoteids":
				let tagnoteids = await response.json();			       
				if(tagnoteids) {
					setState((state) => {
						let tempState = {
							...state,
							tagnoteidlist:tagnoteids
						}
						saveToStorage(tempState);
						return tempState;
					})
				}
				return;
			case "removenote":
				getNotes();
				return;
			case "editnote":
				getNotes();
				return;
			case "register":
				setError("You have succesfully registered!");
				return;
			case "login":
				let loginData = await response.json();
				if(loginData) {
					setState((state) => {
						let tempState = {
							...state,
							isLogged:true,
							token:loginData.token
						}
						saveToStorage(tempState);
						return tempState;
					});
					getNotes(loginData.token);
				}
				return;
			case "logout":
				cleanState();
				return;  
			default:
				return;
        }      
      } else {
        if(response.status === 403) {
			cleanState();
			setError("Your session has expired. Logging you out!");
			return;
		}
        switch(urlRequest.action) {     
			case "addnote":
				console.log("Adding new item failed. Server responded with "+response.status+" "+response.statusText);
				return;     
			case "getnotes":
				setError("Fetching note list failed. Server responded with "+response.status+" "+response.statusText);
				return;
			case "gettags":
				setError("Fetching tag list failed. Server responded with "+response.status+" "+response.statusText);
				return;
			case "gettagnoteids":
				setError("Fetching tag list failed. Server responded with "+response.status+" "+response.statusText);
				return;
			case "removenote":
				console.log("Removing note failed. Server responded with "+response.status+" "+response.statusText);
				return;
			case "editnote":
				console.log("Updating note failed. Server responded with "+response.status+" "+response.statusText);
				return;
			case "register":
				if(response.status === 409) {
					setError("Username is already in use");
				} else {
					setError("Registering new user failed. Server responded with "+response.status+" "+response.statusText);
				}
				return;
			case "login":
				setError("Login failed. Server responded with "+response.status+" "+response.statusText);
				return;
			case "logout":
				cleanState();
				return;          
			default:
            	return;
        }
      }
    }

    fetchData();
  },[urlRequest]);

  //LOGIN API
	
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}

	const login = (user) => {
		setUrlRequest({
			url:"/login",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"login"
		})
	}	
	
	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
							token:state.token}
			},
			action:"logout"
		})
	}

  // REST
  const getNotes = (token) => {
		let tempToken = state.token;
		if(token) {
			tempToken = token
		}
		setUrlRequest({
			url:"/api/note",
			request:{
				method:"GET",
				headers:{"Content-Type":"application/json",
						token:tempToken}       
			},
			action:"getnotes"
		})
	}

  const addNote = (item) => {
		setUrlRequest({
			url:"/api/note",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",token:state.token},
				body:JSON.stringify(item)
			},
			action:"addnote"
		})
	}

  const removeNote = (id) => {
    setUrlRequest({
			url:"/api/note/"+id,
			request:{
				method:"DELETE",
				headers:{"Content-Type":"application/json", userid:1}
			},
			action:"removenote"
		})
  }

  const editNote = (item) => {
    setUrlRequest({
			url:"/api/note/"+item.id,
			request:{
				method:"PUT",
				headers:{"Content-Type":"application/json", userid:1},
        		body:JSON.stringify(item)
			},
			action:"editnote"
		})
  }
  const getTags = (token) => {
	let tempToken = state.token;
		if(token) {
			tempToken = token
		}
	setUrlRequest({
		url:"/api/tag",
		request:{
			method:"GET",
			headers:{"Content-Type":"application/json", token:tempToken}
		},
		action:"gettags"
	})
  }
  const getTagNoteIds = (token) => {
	let tempToken = state.token;
		if(token) {
			tempToken = token
		}
	setUrlRequest({
		url:"/api/notetags",
		request:{
			method:"GET",
			headers:{"Content-Type":"application/json", token:tempToken}
		},
		action:"gettagnoteids"
	})
  }
  let messageArea = <h4> </h4>
	if(state.loading) {
		messageArea = <h4>Loading ...</h4>
  }
  if(state.error) {
		messageArea = <h4>{state.error}</h4>
	}

  let tempRender = <Routes>
						<Route exact path="/" element={<LoginPage setError={setError} login={login} register={register}/>}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					 </Routes>
  if(state.isLogged) {
    tempRender = <Routes>
						<Route path="/" element={<div><ShowNotes list={state.list} taglist={state.taglist} tagnoteidlist={state.tagnoteidlist} ></ShowNotes><AddNoteForm getTagNoteIds={getTagNoteIds} getNotes={getNotes} addNote={addNote} taglist={state.taglist}></AddNoteForm></div>}></Route>
									
            			<Route path="*" element={<Navigate to="/"/>}/>				
					</Routes>
  }
  // https://dev.to/tywenk/how-to-use-nested-routes-in-react-router-6-4jhd
  return (    
    <div className="App">
   
	
      {messageArea}
      <hr/>
      {tempRender}
    </div>
  );
}

export default App;
// <Navbar isLogged={state.isLogged} logout={logout}/>