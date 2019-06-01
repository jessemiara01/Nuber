// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import './column.css';
class App extends Component {
  // initialize our state
  state = {
    driver: [],
    customer:[],
    admin:[],
    message: null,
    intervalIsSet: false,
    idToDelete: null,
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
    fetch('http://localhost:3001/api/getDrivers')
      .then((driver) => driver.json())
      .then((res) => this.setState({ driver: res.driver }));
  };
  // GET Method for user data
  getCustomersFromDb = () => {
    fetch('http://localhost:3001/api/getCustomers')
      .then((customer) => customer.json())
      .then((res) => this.setState({ customer: res.customer }));
  };

    // GET Method for admin data
    getAdminsFromDb = () => {
      fetch('http://localhost:3001/api/getAdmins')
        .then((admin) => admin.json())
        .then((res) => this.setState({ admin: res.admin }));
    };
  

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
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
  <div class="column" style={styleGrey} >
  <h1>Drivers: </h1>
  <ul>
          {driver.length <= 0
            ? <h1>Nothing in the database </h1>
            : driver.map((driv) => (
                <li style={{ padding: '10px' }} key={driv.id}>
                  <span style={{ color: 'black' }}> Driver Name: </span> {driv.name} <br />
                  <span style={{ color: 'black' }}> Available?: </span> {driv.avail} <br />
                  <span style={{ color: 'black' }}> rating: </span> {driv.rating}
                </li>
              ))}
        </ul>
  </div>

  <div class="column"  style={styleWhite}>
  <h1>Users:</h1>
  <ul>
          {customer.length <= 0
            ? <h1>Nothing in the database </h1>
            : customer.map((cust) => (
                <li style={{ padding: '10px' }} key={cust.id}>
                  <span style={{ color: 'black' }}> User Name: </span> {cust.name} <br />
                  <span style={{ color: 'black' }}> Wanting Pickup?: </span> {cust.wantPickup} <br />
                  <span style={{ color: 'black' }}> rating: </span> {cust.rating}
                </li>
              ))}
        </ul>
  </div>
  
  <div class="column" style ={styleRed} >
  <h1>Admins: </h1>
  <ul>
          {admin.length <= 0
            ? <h1>Nothing in the database </h1>
            : admin.map((adm) => (
                <li style={{ padding: '10px' }} key={adm.id}>
                  <span style={{ color: 'black' }}> Admin Name: </span> {adm.name} <br />
                </li>
              ))}
        </ul>
  
  </div>


        {/* <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div> */}
      </div>
    ); 
  }
}

export default App;
