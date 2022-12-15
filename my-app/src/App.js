
import './App.css';
//import { Form, Button, Table } from "react-bootstrap";
import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";


function App() {
   //initial value
const[item,setItem]=useState(
  {
    name:'',
    category:'',
    price:'',
    instock:''
  }
)

const [items, setItems] = useState([
  {
    name:"",
    category:"",
    price:"",
    instock:"",
    _id: "",
  },
]);

const [isPut, setIsPut] = useState(false);
const [updatedItem, setUpdatedItem] = useState({
        name:"",
        category:"",
        price:"",
        instock:"",
        _id: "",
      });

useEffect(() => {
    fetch("/items")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((jsonRes) => setItems(jsonRes))
    .catch((err) => console.log(err));
}, [items]);

//input values change tracking
function handleChange(event){
  const {name,value}=event.target;
  setItem((prevInput) =>{
    return{
      ...prevInput,
      [name]:value,
    };
  });
  console.log(item);
  //console.log("my-app is running");
}

//reading the input values and storing in mongodb when clicking save button
function addItem(event) {
          event.preventDefault();
          const newItem = {
            name: item.name,
            category:item.category,
            price:item.price,
            instock:item.instock
          };

          axios.post("/newitem", newItem);
          console.log(newItem);
          alert("item added");

          //resetting input fields after save
          setItem({
            name: "",
            category:"",
            price:"",
            instock:""
          });
      }

function deleteItem(id) {
        axios.delete("/delete/" + id);
        alert("item deleted");
        console.log(`Deleted item with id ${id}`);
      }

function openUpdate(id) {
        setIsPut(true);
        setUpdatedItem((prevInput) => {
          return {
            ...prevInput,
            id: id,
          };
        });
      }
    
function updateItem(id) {
        axios.put("/put/" + id, updatedItem);
        alert("item updated");
        console.log(`item with id ${id} updated`);
      }
    
function handleUpdate(event) {
        const { name, value } = event.target;
        setUpdatedItem((prevInput) => {
          return {
            ...prevInput,
            [name]: value,
          };
        });
        console.log(updatedItem);
      }      


  
      return (
          <div className="App">
                {!isPut ? (
                  <div className="main">
                  <form>
                    <h4>Add a new product</h4>
                      <p>
                          <label>Name <br /> 
                          <input type="text" class="form-control" placeholder="Item Name" onChange={handleChange} value={item.name} /></label>
                      </p>
                      <p>
                          <label>Category <br /> 
                          <input type="text" class="form-control" placeholder="Item Category" onChange={handleChange} value={item.category}/></label>
                      </p>
                      <p>
                          <label>Price <br /> 
                          <input type="text" class="form-control" placeholder="Item Price" onChange={handleChange} value={item.price} /></label>
                      </p>
                      <p>
                          <label>InStock <br /> 
                          <input type="text" class="form-control" placeholder="Num of stock" onChange={handleChange} value={item.instock} /></label>
                      </p>
                      <button onClick={addItem}>Save</button>
                  </form>
                  </div>
            ) : (
              <div className="main">
              <form>
                    <h4>Edit the product details</h4>
                      <p>
                          <label>Name <br /> 
                          <input type="text" class="form-control" placeholder="New Name" onChange={handleUpdate} value={updatedItem.name} /></label>
                      </p>
                      <p>
                          <label>Category <br /> 
                          <input type="text" class="form-control" placeholder="New Category" onChange={handleUpdate} value={updateItem.category}/></label>
                      </p>
                      <p>
                          <label>Price <br /> 
                          <input type="text" class="form-control" placeholder="New Price" onChange={handleUpdate} value={updateItem.price} /></label>
                      </p>
                      <p>
                          <label>InStock <br /> 
                          <input type="text" class="form-control" placeholder="Num of stock" onChange={handleUpdate} value={updateItem.instock} /></label>
                      </p>
                      <button onClick={addItem}>Save</button>
                  </form>
                  </div>
            )}
                  {items.map((item) => {
              return (
                  <form><br></br>
                    <div style={{ width: "40%", margin: "auto auto"} }>
                    
                      <table style={{backgroundColor:'slategray',border:'1px solid'}}>
                          <thead style={{backgroundColor:'slategray',border:'1px solid'}}>
                              <tr>         
                              <th>Name</th>
                              <th>Category</th>
                              <th>price</th>
                              <th>InStock</th>
                              </tr>
                          </thead>
                            <tbody style={{backgroundColor:'slategray',border:'1px solid'}}>
                                <tr>                                        
                                  <td>{item.name}</td>
                                  <td>{item.category}</td>
                                  <td>${item.price}</td>
                                  <td>{item.instock}</td>
                                  <td><button variant="primary" onClick={() => deleteItem(item._id)}>Delete</button></td>
                                  <td><button variant="primary" onClick={() => openUpdate(item._id)} >Edit</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                  </form>
                  );
                })}
          </div>
        );
      
}

export default App;