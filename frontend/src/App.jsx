import React, {useState, useEffect} from 'react';


function App() {

    //Creates a state varible, starts off as an empty string then gets set to varaible 
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    //Will hold all expense objects in an array. {id,item,price,date}
    const [expenses, setExpenses] = useState([]);
    //total cost of expenses 
    const [total, setTotal] = useState(0);
    
  //recalculate total whenever expenses changes
  useEffect(() => {
    //reduce() goes through every item in the array and adds price values
    //acc is accumulated total, curr is current object
    //parseFloat(curr.price) converts string into a number
    const sum = expenses.reduce((acc, curr) => acc + parseFloat(curr.price),0 );
    //STORES TOTAL  
    setTotal(sum);
  }, [expenses]);

    //Sends a get request to the backend when the app starts
    useEffect(() => {
      fetch('/api/expenses')
      .then(res => res.json())
      .then(json => {
        if(json.success) setExpenses(json.data);
      })
      .catch(err => console.error('Error loading expenses:', err));
    }, []);
    

  //creates an event, handlesubmit
  const handleSubmit = async (e) => {
    //prevents it from resetting
    e.preventDefault();
    //checks if all parameters are filled
    if(!item || !price || !date) return;
    //builds an object to send to backend
    const newExpense = {
      item,
      price,
      date
    };
     console.log("submitting:", newExpense);
    //sends POST request to backend
    try{
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newExpense)
      });
      //parses JSON response from server
      const result = await response.json();

      //if successful it appends a new expense to current listing
      if(response.ok){
        //make a new list that has everything from the old one
        //add the new expense with result.data
        setExpenses(prev => [...prev, result.data]);
        setItem('');
        setPrice('');
        setDate('');
      }else{
        console.error("error creating expense:",result.message)
      }
    } catch (error){
      console.error("Error submitting form", error)
    }
  }

  //function that takes an a ID of the expense you want to delete 
  const handleDelete = async (id) => {
    //start a try catch block 
    try {
      //send a request to the backend and save the reponse in the variable to check
      const response = await fetch(`/api/expenses/${id}`, {  
        method: "DELETE",
      });
      //get the reponse back as usable data
      const result = await response.json();
  
      if (response.ok) {
        //if it worked then remove it from the screen 
        setExpenses(prev => prev.filter(exp => Number(exp.id) !== Number(id))); 
      } else {
        console.error("Error deleting expense:", result.message);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  

  return(
 <>
  <nav >
      <section className ="  bg-black p-3" >
      <h1 className = "text-white text-center text-4xl" >Expense Tracker</h1>

      </section>
      
    </nav>

     <form onSubmit = {handleSubmit} className = "">
     <div className = "m-4 flex items-center space-x-4">
      <h1 className = "text-base text-bold" > Date</h1>
      <input type = "date" required value ={date} onChange ={(e) => setDate(e.target.value)}className = "border p-1 rounded"></input>
    </div>
    <div className = "m-4 flex items-center space-x-4">
      <h1 className = "text-base" > Item </h1>
      <input type = "text" required value = {item} onChange ={(e) => setItem(e.target.value)} className = "border p-1 rounded"></input>
    </div>

    <div className = "m-4 flex items-center space-x-4">
      <h1 className = "text-base" > Price</h1>
      <input type = "number" required step="0.01" value = {price} onChange ={(e) => setPrice(e.target.value)} className = "border p-1 rounded"></input>
    </div>
    
    <div className = "m-4 flex items-center space-x-4 black">
      <button type = "submit" className = "border p-1 rounded ">Submit</button>
    </div>

     
     </form>

     <div className = "m-4 flex items-center " >
      <h2 className="text-xl font-bold">Total Spent</h2>
      <p className = "border rounded">${total.toFixed(2)}</p>
     </div>

     

     <div className ="flex flex-col items-center my-4 w-full border">
     
      <div className = "w-full mt-10">
      <table className = "w-3/4 mx-auto ">
      <thead>
      <tr className ="bg-grey-200">
  <th className = "border p-2 bg-black text-white">Date</th>
  <th className = "border p-2  bg-black text-white">Item</th>
  <th className = "border p-2  bg-black text-white">Price</th>
  <th className = "border p-2   bg-black text-white">Remove</th>
  
  </tr>
      </thead>
<tbody>
{expenses.map((exp) => (
  <tr key={exp.id}>
    <td className="border p-2">{exp.date}</td>
    <td className="border p-2">{exp.item}</td>
    <td className="border p-2">${parseFloat(exp.price).toFixed(2)}</td>
    <td className="border p-2">
    <button onClick={() => handleDelete(exp.id)} className="text-red-500 hover:underline">
        Delete
      </button>
    </td>
  </tr>
))}

</tbody>

      </table>

     </div>

      </div>
  
   </>
  ) 
   
}

export default App;
