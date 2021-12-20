import React from "react";

const Table = () => {
  const [data, setData] = React.useState(null);
  const [addFormData, setFormData] = React.useState({zid:"", location:""})
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

    setFormData(newFormData);
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e);
    // console.log("form handler fired");
    const newZombie = {
      zid: addFormData.zid,
      location: addFormData.location
    };
    // const newData = [...data, newZombie];
    // setData(newData);

    fetch("./api", {
      method: "PUT",
      redirected: false,
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newZombie:newZombie
      })
    });
  }

  if (!data) {
    return (
      <div className="container">
        <p>"Loading..."</p>
      </div>
    );
  } else { 
    return (
      <div className="container">
        <table className="table table-primary">
          <thead>
            <tr>
              <th>Zombie ID</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((zombie) => 
              <tr className="table-success">
                <td>{zombie.zid}</td>
                <td>{zombie.location}</td>
              </tr>
            )}
          </tbody>
        </table>
        <form className="row g-3">
        <div className="col-auto">
          <input 
            className="form-control" 
            type="text" 
            id="zombieId"
            name="zid" 
            placeholder="Enter zombie ID" 
            onChange={formChangeHandler}/>
        </div>
        <div className="col-auto">
          <select className="form-select" id="location-01" name="location" onChange={formChangeHandler}>
            <option selected>Select Location</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Hospital">Hospital</option>
            <option value="School">School</option>
          </select>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3" onChange={formSubmitHandler}>Add Zombie</button>
        </div>
        </form>
      </div>
    )
  }
}

export default Table;