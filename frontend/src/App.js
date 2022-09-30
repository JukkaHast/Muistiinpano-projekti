import {useState,useEffect} from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import Test from './components/Test';





function App() {

  const [state,setState] = useState({
    list:[]
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

  useEffect(() => {
		getList();
	},[])

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
          case "additem":
						getList();
						return;    
          case "getlist":
            let data = await response.json();
            console.log(data)            
            if(data) {
              setState({
                ...state,
                list:data
              })
            }
            return;
          case "removeitem":
            getList();
            return;
          case "edititem":
            getList();
            return;      
          default:
            return;
        }      
      } else {
        switch(urlRequest.action) {     
          case "additem":
						console.log("Adding new item failed. Server responded with "+response.status+" "+response.statusText);
						return;     
          case "getlist":
            console.log("server responded with a status", response.status)
            return;
          case "removeitem":
            console.log("Removing note failed. Server responded with "+response.status+" "+response.statusText);
            return;
          case "edititem":
            console.log("Updating note failed. Server responded with "+response.status+" "+response.statusText);
            return;
          default:
            return;
        }
      }
    }

    fetchData();
  },[urlRequest]);

  const getList = () => {		
		setUrlRequest({
			url:"/api/note",
			request:{
				method:"GET",
				headers:{"Content-Type":"application/json",
						userId:1}       
			},
			action:"getlist"
		})
	}

  const addItem = (item) => {
		setUrlRequest({
			url:"/api/note",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}

  const removeItem = (id) => {
    setUrlRequest({
			url:"/api/note/"+id,
			request:{
				method:"DELETE",
				headers:{"Content-Type":"application/json", userid:1}
			},
			action:"removeitem"
		})
  }

  const editItem = (item) => {
    setUrlRequest({
			url:"/api/note/"+item.id,
			request:{
				method:"PUT",
				headers:{"Content-Type":"application/json", userid:1},
        body:JSON.stringify(item)
			},
			action:"edititem"
		})
  } 
  let messageArea = <h4> </h4>
	if(state.loading) {
		messageArea = <h4>Loading ...</h4>
  }

  let tempRender = <Routes>
						<Route exact path="/" element={<ShoppingList editItem={editItem} removeItem={removeItem} list={state.list}/>}/>
						<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
            
						
					</Routes>
  return (
    
    <div className="App">
    
      <Navbar/>
      {messageArea}
      <hr/>
      {tempRender}
      

    </div>
  );
}

export default App;
