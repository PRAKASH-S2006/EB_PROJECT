import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  console.log(id)
  const [formData, setFormData] = useState({
    Applicant_Name: "",
    Gender: "",
    State: "",
    District: "",
    PinCode: "",
    GID: "",
    Owner: "",
    TypeOfConnection: "",
  });

  useEffect(() => {
    fetch(`/api/application/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/edit/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  };
  const HandleUpdate= async (e)=>
    {
      e.preventDefault();
      try
      {
        const resp=await fetch(`/api/edit/${id}`,
        {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData)
        });
        const k=await resp.json()
        if(resp.ok)
        {
          alert("Successfully Updated...")
        }
        else{
          alert("Not Updated...")
        }
      }
      catch (error)
      {
        alert("Not Working...")
      }
    }
  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Application {formData.Applicant_Name}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="Applicant_Name"
            value={formData.Applicant_Name}
            onChange={handleChange}
          />
        </div>
        <br/>
        <div>
          <label>Connection Number</label>
          <br />
          <input
            type="text"
            name="Connection_NUmber"
            value={id}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Gender</label>
          <br />
          <input
            type="text"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>State</label>
          <br />
          <input
            type="text"
            name="State"
            value={formData.State}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>District</label>
          <br />
          <input
            type="text"
            name="District"
            value={formData.District}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>PinCode</label>
          <br />
          <input
            type="number"
            name="PinCode"
            value={formData.PinCode}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Government ID</label>
          <br />
          <input
            type="text"
            name="GID"
            value={formData.GID}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Owner</label>
          <br />
          <input
            type="text"
            name="Owner"
            value={formData.Owner}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Type Of Connection</label>
          <br />
          <input
            type="text"
            name="TypeOfConnection"
            value={formData.TypeOfConnection}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit" onSubmit={HandleUpdate}>
          Update Application
        </button>
      </form>
    </div>
  );
}

export default Edit;