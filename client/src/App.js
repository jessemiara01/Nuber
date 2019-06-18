// /client/App.js
import React, { Component } from '../node_modules/react';
import axios from '../node_modules/axios';
import './column.css';
class App extends Component {
  // initialize our state
  state = {
    driver: [],
    customer:[],
    admin:[],
    message: null,
    _id: 0,
    name: null,
    avail: null,
    wantPickup: null,
    rating: null,
    intervalIsSet: false,
    idToDelete: 0,
    idToUpdate: null,
    objectToUpdate: null,
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDriversFromDb();
    this.getCustomersFromDb();
    this.getAdminsFromDb();
    if (!this.state.intervalIsSet) {
      let interval1 = setInterval(this.getDriversFromDb, 1000);
      this.setState({ intervalIsSet: interval1 });
      let interval2 = setInterval(this.getCustomersFromDb, 1000);
      this.setState({ intervalIsSet: interval2 });
      let interval3 = setInterval(this.getAdminsFromDb, 1000);
      this.setState({ intervalIsSet: interval3 })
      
    }
  }



  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // GET Method for driver data
  getDriversFromDb = () => {
    fetch('https://nuber-manager.herokuapp.com/api/getDrivers')
      .then((driver) => driver.json())
      .then((res) => this.setState({ driver: res.driver }));
  };
  // GET Method for user data
  getCustomersFromDb = () => {
    fetch('https://nuber-manager.herokuapp.com/api/getCustomers')
      .then((customer) => customer.json())
      .then((res) => this.setState({ customer: res.customer }));
  };

    // GET Method for admin data
    getAdminsFromDb = () => {
      fetch('https://nuber-manager.herokuapp.com/api/getAdmins')
        .then((admin) => admin.json())
        .then((res) => this.setState({ admin: res.admin }));
    };
  

  // Put Customer into DB
  putCustomerInDB = (name, wantPickup, rating) => {
    
    let currentIds = this.state.customer.map((customer) => customer._id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('https://nuber-manager.herokuapp.com/api/putCustomer', {
      _id: idToBeAdded,
      name: name,
      wantPickup: wantPickup,
      rating: rating,
    });
  };
  
  //Put admin into DB
  putAdminInDB = (name) => {
    let currentIds = this.state.admin.map((admin) => admin._id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    


    axios.post('https://nuber-manager.herokuapp.com/api/putAdmin', {
    _id: idToBeAdded,  
    name: name,
    });
  };

    //Put driver into DB
    putDriverInDB = (name, avail, rating) => {
      let currentIds = this.state.driver.map((driver) => driver._id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }


      axios.post('https://nuber-manager.herokuapp.com/api/putDriver', {
      _id: idToBeAdded,  
      name: name,
        avail: avail,
        rating: rating,
      });
    };
  

  // our delete method that uses our backend api
  // to remove existing database information
  deleteDriver = (idTodelete) => {
 
    axios.delete('https://nuber-manager.herokuapp.com/api/deleteDriver', {
      data: {
        id: idTodelete,
      },
    });
  };

  deleteCustomer = (idTodelete) => {
 
    axios.delete('https://nuber-manager.herokuapp.com/api/deleteCustomer', {
      data: {
        id: idTodelete,
      },
    });
  };

  deleteAdmin = (idTodelete) => {
 
    axios.delete('https://nuber-manager.herokuapp.com/api/deleteAdmin', {
      data: {
        id: idTodelete,
      },
    });
  };

  

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDriver = (idToUpdate, driverUpdateToApply) => {

    axios.post('https://nuber-manager.herokuapp.com/api/updateDriver', {
      id: idToUpdate,
      update: { avail: driverUpdateToApply },
    });
  };

  updateCustomer = (idToUpdate, customerUpdateToApply) => {

    axios.post('https://nuber-manager.herokuapp.com/api/updateCustomer', {
      id: idToUpdate,
      update: { wantPickup: customerUpdateToApply },
    });
  };


  //The follwing 4 methods allow only one radio button 
  //to be clicked at at time.

  //For adding a new driver
  driverHandleOptionChangePost = (changeEvent) => {
    this.setState({
      avail: changeEvent.target.value
    });
  };
  //For updating a Driver
  driverHandleOptionChangeUpdate = (changeEvent) => {
    this.setState({
      driverUpdateToApply: changeEvent.target.value
    });
  };

  //For adding a new customer
  customerHandleOptionChangePost = (changeEvent) => {
    this.setState({
      wantPickup: changeEvent.target.value
    });
  };

  //For updating a customer
  customerHandleOptionChangeUpdate = (changeEvent) => {
    this.setState({
      customerUpdateToApply: changeEvent.target.value
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { driver } = this.state;
    const { customer } = this.state;
    const { admin } = this.state;
    const styleGrey = {backgroundColor : 'grey'};
    const styleWhite = {backgroundColor : 'white'};
    const styleRed = {backgroundColor : 'red'};
    return (


<div class="row">
<h1 align="center">Nuber Database UI</h1>
  <div class="column" style={styleGrey} >
  <h1>Drivers: </h1>
  <ul>
          {driver.length <= 0
            ? <h1>Nothing in the database </h1>
            : driver.map((driv) => (
                <li style={{ padding: '10px' }} key={driv._id}>
                  <span style={{ color: 'black' }}> Driver ID: </span> {driv._id} <br />
                  <span style={{ color: 'black' }}> Driver Name: </span> {driv.name} <br />
                  <span style={{ color: 'black' }}> Available to drive?: </span> {driv.avail} <br />
                  <span style={{ color: 'black' }}> rating: </span> {driv.rating}
                </li>
              ))}
        </ul>
        <div style={{ padding: '0px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
            placeholder="Driver's name"
            style={{ width: '200px' }}
          />
  <form>
    <div className="radio">
      <label>
        <input type="radio" value="Yes" 
                      checked={this.state.avail === 'Yes'} 
                      onChange={this.driverHandleOptionChangePost} />
        Available to drive
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="No" 
                      checked={this.state.avail === 'No'} 
                      onChange={this.driverHandleOptionChangePost} />
        Not available to drive
      </label>
    </div>

  </form>
          <input
            type="text"
            onChange={(e) => this.setState({ rating: e.target.value })}
            placeholder="Rating"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDriverInDB(this.state.name, this.state.avail, this.state.rating)}>
            ADD
          </button>
          <br></br>
          <br></br>
          <div style={{ padding: '0px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of the Driver to delete here"
          />
          <button onClick={() => this.deleteDriver(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '0px' }}>
          <br></br>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of Driver to update here"
          />
    <div className="radio">
      <label>
        <input type="radio" value="Yes" 
                      checked={this.state.driverUpdateToApply === 'Yes'} 
                      onChange={this.driverHandleOptionChangeUpdate} />
        Available to drive
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="No" 
                      checked={this.state.driverUpdateToApply === 'No'} 
                      onChange={this.driverHandleOptionChangeUpdate} />
        Not available to drive
      </label>
    </div>
          <button
            onClick={() =>
              this.updateDriver(this.state.idToUpdate, this.state.driverUpdateToApply)
            }
          >
            UPDATE
          </button>
        </div> 
        </div>
  </div>

  <div class="column"  style={styleWhite}>
  <h1>Users:</h1>
  <ul>
          {customer.length <= 0
            ? <h1>Nothing in the database </h1>
            : customer.map((cust) => (
                <li style={{ padding: '10px' }} key={cust._id}>
                  <span style={{ color: 'black' }}> Customer ID: </span> {cust._id} <br />
                  <span style={{ color: 'black' }}> Customer Name: </span> {cust.name} <br />
                  <span style={{ color: 'black' }}> Wanting Pickup?: </span> {cust.wantPickup} <br />
                  <span style={{ color: 'black' }}> Rating: </span> {cust.rating}
                </li>
              ))}
        </ul>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
            placeholder="User's Name"
            style={{ width: '200px' }}
          />
  <form>
    <div className="radio">
      <label>
        <input type="radio" value="Yes" 
                      checked={this.state.wantPickup === 'Yes'} 
                      onChange={this.customerHandleOptionChangePost} />
        Available for pickup
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="No" 
                      checked={this.state.wantPickup === 'No'} 
                      onChange={this.customerHandleOptionChangePost} />
        Not available for pickup
      </label>
    </div>

  </form>
                    <input
            type="text"
            onChange={(e) => this.setState({ rating: e.target.value })}
            placeholder="Rating"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putCustomerInDB(this.state.name, this.state.wantPickup, this.state.rating)}>
            ADD
          </button>
          <br></br>
          <br></br>
          <div style={{ padding: '0px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteCustomer(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '0px' }}>
          <br></br>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of Customer to update here"
          />
    <div className="radio">
      <label>
        <input type="radio" value="Yes" 
                      checked={this.state.customerUpdateToApply === 'Yes'} 
                      onChange={this.customerHandleOptionChangeUpdate} />
        Available for pickup
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="No" 
                      checked={this.state.customerUpdateToApply === 'No'} 
                      onChange={this.customerHandleOptionChangeUpdate} />
        Not available for pickup
      </label>
    </div>
          <button
            onClick={() =>
              this.updateCustomer(this.state.idToUpdate, this.state.customerUpdateToApply)
            }
          >
            UPDATE
          </button>
        </div> 
        </div>
  </div>
  
  <div class="column" style ={styleRed} >
  <h1>Admins: </h1>
  <ul>
          {admin.length <= 0
            ? <h1>Nothing in the database </h1>
            : admin.map((adm) => (
                <li style={{ padding: '10px' }} key={adm.id}>
                  <span style={{ color: 'black' }}> Admin ID: </span> {adm._id} <br />
                  <span style={{ color: 'black' }}> Admin Name: </span> {adm.name} <br />
                </li>
                
              ))}
        </ul>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
            placeholder="add an admin to the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putAdminInDB(this.state.name)}>
            ADD
          </button>
          <br></br>
          <br></br>
          <div style={{ padding: '0px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteAdmin(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
          
        </div>
  
  </div>

      </div>
    ); 
  }
}

export default App;
