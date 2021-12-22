import React from "react";
import "./Table.css";

const Table = () => {
  const [data, setData] = React.useState(null);
  const [addFormData, setFormData] = React.useState({zid:"", ploc:"", location:"", location2:""})
  React.useEffect(() => {
    fetch("/api")
    .then((data) => data.json())
    .then((data) => {console.log(data); return Promise.resolve(data); })
    .then((data) => setData(data));
  }, []);

  const formChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;

    const newFormData = { ...addFormData};
    newFormData[fieldName] = fieldValue;
    // addFormData[fieldName] = fieldValue;

    setFormData(newFormData);
  }

  const addZombie = (e) => {
    // console.log(e.target.value);
    e.preventDefault();
    fetch("./api/update", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        zid: addFormData.zid,
        location: addFormData.location,
        notes: addFormData.notes,
        action: "add"
      })
    }).then(() => {
      window.location.reload();
    })
  }

  const deleteZombie = (e) => {
    // console.log(e.target.value);
    e.preventDefault();
    fetch("./api/update", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        zid: e.target.value,
        action: "delete"
      })
    }).then(() => {
      window.location.reload();
    })
  }

  const saveZombie = (e) => {
    console.log(e);
    let zInfo = e.target.value;
    const zDetails = zInfo.split(",");
    console.log(zDetails);

    fetch("./api/update", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        zid: zDetails[0],
        location: zDetails[1],
        action: "save"
      })
    }).then(() => {
      window.location.reload();
    })
  }

  if (!data) {
    return (
      <div className="container mb-1">
        <p>"Loading..."</p>
      </div>
    );
  } else { 
    return (
      <div className="container mt-5">
        <h2 className="text-primary">Zombie Manager</h2>
        <form className="row mb-5">
            <div className="col-3">
              <input 
                className="form-control" 
                type="text" 
                id="zombieId"
                name="zid" 
                placeholder="Enter zombie ID" 
                onChange={formChangeHandler}/>
            </div>
            <div className="col-2">
              <select className="form-select" id="location-02" name="location" onChange={formChangeHandler}>
                <option defaultValue>Select Location</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Hospital">Hospital</option>
                <option value="School">School</option>
              </select>
            </div>
            <div className="col-5">
              <input 
                className="form-control" 
                type="text" 
                id="zNotes"
                name="notes" 
                placeholder="Enter optional notes" 
                onChange={formChangeHandler}/>
            </div>
            <div className="col-2">
              <button type="submit" className="btn btn-primary" value="add" onClick={addZombie}>Add Zombie</button>
            </div>
        </form>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Zombie ID</th>
                <th>Previous Location</th>
                <th>Location</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((zombie) => 
                <tr>
                  <td>{zombie.zid}</td>
                  <td>{zombie.pLoc}</td>
                  <td>{zombie.location}</td>
                  <td>{zombie.notes}</td>
                  <td>
                    <select className="form-select col-4" id="location-01" name="location2" onChange={formChangeHandler}>
                      <option selected={true} disabled="disable" defaultValue>Move To:</option>
                      <option value="Warehouse">Warehouse</option>
                      <option value="Hospital">Hospital</option>
                      <option value="School">School</option>
                    </select>
                    <button type="submit" className="btn btn-success me-1" value={[zombie.zid, addFormData.location2]}onClick={saveZombie}>Save</button>
                    <button type="submit" className="btn btn-danger" value={zombie.zid} onClick={deleteZombie}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

export default Table;