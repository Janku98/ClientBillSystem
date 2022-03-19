
import './styles/App.css';
import {useState} from 'react';
import axios from 'axios';
import {useModal} from './hooks/useModal.js';
import Modal from './components/Modal.js';

function App() {
  
  const [isOpenEditClient, openModalEditClient, closeModalEditClient]=useModal(false);
  const [isOpenAddClient, openModalAddClient, closeModalAddClient]=useModal(false);
  const [isOpenDeleteClient, openModalDeleteClient, closeModalDeleteClient]=useModal(false);
  const [isOpenSearchBills, openModalSearchBills, closeModalSearchBills]=useModal(false);
  const [isOpenSeeBills, openModalSeeBills, closeModalSeeBills]=useModal(false);
  const [isOpenAddBill, openModalAddBills, closeModalAddBill]=useModal(false);

  const [client, setClient] = useState({name:"", adress:"", dni:"", iva:"A", ClientId:""});
  const [bill, setBill] = useState([]);
  const [billStats, setBillStats] = useState({billNumber:"", importe: ""})


  const loadClients = async () => {
    var contenido = document.querySelector('#contenido');
    const writeTable = (datos) =>{
      contenido.innerHTML = "";
      for(let valor of datos){
        contenido.innerHTML += `<tr>
                                  <th scope="row">${valor.id}</th>
                                  <td>${valor.name}</td>
                                  <td>${valor.adress}</td>
                                  <td>${valor.dni}</td>
                                  <td>${valor.iva}</td>
                                </tr>`
      }
    };
    const call = await axios.get("http://localhost:3001/client");
    writeTable(call.data);
  };


  const handleSubmitEditClient = async (e) => {
    e.preventDefault(); 
    let packageToEditClient = {
      ClientId: client.ClientId,
      name: client.name,
      adress: client.adress,
      dni: client.adress,
      iva: client.iva
    };
    const sendPost = async (post) =>{
      try{
          await axios.put("http://localhost:3001/editClient", post );
          setClient({name:"", adress:"", dni:"", iva:"A", ClientId:""});
          setTimeout(()=>{
            loadClients();
          },1000);
          closeModalEditClient();
       }catch(error){
         console.log(error)
       };
    }; 
    sendPost(packageToEditClient);
  };

  const handleSubmitAddClient = async(e) =>{
    e.preventDefault(); 
    let packageToAddClient = {
      name: client.name,
      adress: client.adress,
      dni: client.adress,
      iva: client.iva
    };
    const sendPost = async (post) =>{
      try{
          await axios.post("http://localhost:3001/newClient", post );
          setClient({name:"", adress:"", dni:"", iva:"A", ClientId:""});
          setTimeout(()=>{
            loadClients();
          },1000);
          closeModalAddClient();
       }catch(error){
         console.log(error)
       };
    }; 
    sendPost(packageToAddClient);
  };


  const handleSubmitDeleteClient = (e)=>{
    e.preventDefault(); 
    let packageToDelete = {
      id: client.ClientId
    };
    const sendDelete = async (del) =>{
      try{
          await axios.delete("http://localhost:3001/deleteClient", { data: del});
          setClient({ClientId:""});
          setTimeout(()=>{
            loadClients();
          },1000);
          closeModalDeleteClient();
       }catch(error){
         console.log(error)
       };
    }; 
    sendDelete(packageToDelete);
  };
  

  const handleSubmitSearchBills = (e) =>{
    e.preventDefault(); 
    let packageToSeeBills = {
      ClientId: client.ClientId
    };
    const getBills = async (get) =>{
      try{
          const call = await axios.put("http://localhost:3001/findBill", get);
          console.log(".data", call.data);
          setBill(call.data.BillOfClient)
          setClient({ClientId:""});
          closeModalDeleteClient();
       }catch(error){
         console.log(error)
       };
    }; 
    getBills(packageToSeeBills);
    openModalSeeBills()
  };


  const handleSubmitAddBills = async (e) =>{
    e.preventDefault(); 
    let packageToAddBill = {
      ClientId: client.ClientId,
      billNumber: billStats.billNumber,
      importe: billStats.importe,
    };

    const sendNewBill = async (post) =>{
      try{
          await axios.post("http://localhost:3001/newBill", post);
          setClient({ClientId:""});
          setBillStats({billNumber:"", importe:""});
          closeModalAddBill();
       }catch(error){
         console.log(error)
       };
    }; 
    sendNewBill(packageToAddBill)
    alert("New Bill Added")
  };



  return (
    <div className="App">
      <div className='HEADERaPP'>
        <button onClick={loadClients} class="btn btn-success">Load Clients</button>
        <button onClick={openModalEditClient} class="btn btn-secondary">Edit Client</button>
        <button onClick={openModalAddClient} class="btn btn-primary">Add Client</button>
        <button onClick={openModalDeleteClient} class="btn btn-danger">Delete Client</button>
        <button onClick={openModalSearchBills} class="btn btn-warning">See Bills</button>
        <button onClick={openModalAddBills} class="btn btn-warning">Add Bills</button>
      </div>

      <div className='tabla'>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID#</th>
                <th scope="col">NAME</th>
                <th scope="col">ADRESS</th>
                <th scope="col">DNI</th>
                <th scope="col">IVA TYPE</th>
              </tr>
            </thead>

            <tbody id= "contenido">
              
            </tbody>
          </table>
      </div>

      <Modal isOpen={isOpenEditClient} closeModal={closeModalEditClient}>
        <div>
          <h2>Please complete the all the fields</h2>
        </div>
        <div>
          <form onSubmit={handleSubmitEditClient}>
            <div>
              <label>ID</label>
              <input type="number" value={client.ClientId} onChange={(e)=>setClient({...client, ClientId: e.target.value})}></input>
            </div>
            <br/>
            <div>
              <label>Name</label>
              <input type="text" value={client.name} onChange={(e)=>setClient({...client, name: e.target.value})}></input>
            </div>
            <br/>
            <div>
              <label>Adress</label>
              <input type="text" value={client.adress} onChange={(e)=>setClient({...client, adress: e.target.value})}></input>
            </div>
            <br/>
            <div>
              <label>DNI</label>
              <input type="number" value={client.dni} onChange={(e)=>setClient({...client, dni: e.target.value})}></input>
            </div>
            <br/>
            <div>
              <label>IVA</label>
              <select  value={client.iva} onChange={(e)=>setClient({...client, iva: e.target.value})}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <br/>
            <div>
              <button>Edit</button>
            </div>
          </form>
        </div>
      </Modal>
      
      <Modal isOpen={isOpenAddClient} closeModal={closeModalAddClient}>
      <div>
          <h2>Please complete the all the fields</h2>
        </div>
        <div>
          <form onSubmit={handleSubmitAddClient}>
            <div>
              <label>Name</label>
              <input type="text" value={client.name} onChange={(e)=>setClient({...client, name: e.target.value})}></input>
            </div>
            <br/>
            <div>
              <label>Adress</label>
              <input type="text" value={client.adress} onChange={(e)=>setClient({...client, adress: e.target.value})}></input>
            </div>
            <br/>
            <div>
              <label>DNI</label>
              <input type="number" value={client.dni} onChange={(e)=>setClient({...client, dni: e.target.value})}></input>
            </div>
            <br/>
            <div>
              <label>IVA</label>
              <select  value={client.iva} onChange={(e)=>setClient({...client, iva: e.target.value})}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <br/>
            <div>
              <button>Add Client</button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal isOpen={isOpenDeleteClient} closeModal={closeModalDeleteClient}>
          <div>
             <h3>Please write the ID of the client to delete</h3>
          </div>
          <form onSubmit={handleSubmitDeleteClient}>            
            <div>
              <label>ID</label>
              <input type="number" value={client.ClientId} onChange={(e)=>setClient({...client, ClientId: e.target.value})}></input>
            </div>
            <br/>
            <div>
              <button>Delete</button>
            </div>
          </form>
      </Modal>

      <Modal isOpen={isOpenSearchBills} closeModal={closeModalSearchBills}>
          <div>
             <h3>Please write the ID of the client to see the Bills</h3>
          </div>
          <form onSubmit={handleSubmitSearchBills}>            
            <div>
              <label>ID</label>
              <input type="number" value={client.ClientId} onChange={(e)=>setClient({...client, ClientId: e.target.value})}></input>
            </div>
            <br/>
            <div>
              <button>See Bills</button>
            </div>
          </form>
      </Modal>

      <Modal isOpen={isOpenAddBill} closeModal={closeModalAddBill}>
          <div>
             <h3>Please complete the fields</h3>
          </div>
          <div>
            <form onSubmit={handleSubmitAddBills}>            
              <div>
                <label>ID Client</label>
                <br/>
                <input type="number" value={client.ClientId} onChange={(e)=>setClient({...client, ClientId: e.target.value})}></input>
              </div>
              <div>
                <label>Bill Number</label>
                <input type="number" value={billStats.billNumber} onChange={(e)=>setBillStats({...billStats, billNumber: e.target.value})}></input>
              </div>
              <div>
                <label>Price in $$$</label>
                <input type="number" value={billStats.importe} onChange={(e)=>setBillStats({...billStats, importe: e.target.value})}></input>
              </div>
              <br/>
              <div>
                <button>Add Bill</button>
              </div>
            </form>
          </div>
          
      </Modal>


      <Modal isOpen={isOpenSeeBills} closeModal={closeModalSeeBills}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID#</th>
                <th scope="col">Number of BILL</th>
                <th scope="col">IMPORT</th>
              </tr>
            </thead>
            <tbody >
              {bill !== [] && bill.map((b) =>
                                            <tr>
                                            <th scope="row">{b.id}</th>
                                            <td>{b.billNumber}</td>
                                            <td>$ {b.importe}</td>
                                          </tr>)}
            </tbody>
          </table>
      </Modal>

    </div>
  );
}

export default App;
