import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { json } from "react-router-dom";

const AddressList = ({ name, lastname, setNameLocal, setLastNameLocal }) => {
  const [listAddress, setListAddress] = useState([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [codeMeli, setCodeMeli] = useState("");
  const [codePosty, setCodePosty] = useState("");

  useEffect(() => {
    const savedAddresses = localStorage.getItem("listAddress");
    if (savedAddresses) {
      setListAddress(JSON.parse(savedAddresses)); // اطمینان از تبدیل به آرایه
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAddress = {
      name,
      lastname,
      email,
      phoneNumber,
      codeMeli,
      address,
      codePosty,
    };

    const updatedList = [...listAddress, newAddress];
    setListAddress(updatedList);
    localStorage.setItem("listAddress", JSON.stringify(updatedList));
    // پاک کردن فیلدها بعد از ثبت اطلاعات
    setNameLocal("");
    setLastNameLocal("");
    setEmail("");
    setPhoneNumber("");
    setCodeMeli("");
    setAddress("");
    setCodePosty("");
  };
  const handelDelete = (index) => {
    const updatedList = [...listAddress];
    updatedList.splice(index, 1);
    setListAddress(updatedList);
    localStorage.setItem("listAddress", JSON.stringify(updatedList));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row d-flex justify-content-center align-items-center mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="نام"
              value={name}
              onChange={(e) => setNameLocal(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="نام خانوادگی"
              value={lastname}
              onChange={(e) => setLastNameLocal(e.target.value)}
            />
          </div>
        </div>

        <div className="row d-flex justify-content-center align-items-center mb-3">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="شماره تماس"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="پست الکترونیک"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="آدرس"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="کد ملی"
              value={codeMeli}
              onChange={(e) => setCodeMeli(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            placeholder="کد پستی"
            value={codePosty}
            onChange={(e) => setCodePosty(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-more2 mt-3">
          ثبت اطلاعات
        </button>
      </form>

      <div className="container table-responsive py-5">
        <table className="table table-bordered table-hover table-form-Address">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">حذف</th>
              <th scope="col">نام</th>
              <th scope="col">نام خانوادگی</th>
              <th scope="col">کدملی</th>
              <th scope="col">شماره تماس</th>
              <th scope="col">پست الکترونیک</th>
              <th scope="col">آدرس</th>
              <th scope="col">کد پستی</th>
            </tr>
          </thead>
          <tbody className="p-2">
            {listAddress.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  اطلاعاتی ثبت نشده است
                </td>
              </tr>
            ) : (
              listAddress.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <i
                      className=" bi bi-trash fs-5 text-danger fw-bold"
                      onClick={handelDelete}
                    ></i>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.lastname}</td>
                  <td>{item.codeMeli}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.codePosty}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddressList;
