import { useState } from "react";
import swal from "sweetalert";

const MyLogin = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("Enter Login Details");

    const loginCheck = () => {
        if (email == "" || password == "") {
            swal("Empty", "Enter Email And Password", "warning")
        }
        else {
            setMessage("Processing please wait..");
            let loginData = { email: email, password: password }
            let url = "https://easytohire.in/webapi/login/validateme";
            let postData = {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(loginData)
            };

            try {
                fetch(url, postData)
                    .then(response => response.json())
                    .then(info => {
                        console.log(info)
                        setMessage(info?.message);
                        if (info?.status == "SUCCESS") {
                            localStorage.setItem("token", info.tokenno);
                            localStorage.setItem("companyid", info.companyid);
                            localStorage.setItem("fullname", info.name);
                            localStorage.setItem("roletype", info.type);
                            window.location.reload();
                        } else {
                            swal("Fail", "Invalid Credentials", "warning");
                        }
                    })
            } catch (error) {
                console.log(error)

            }
        }
    }
    return (
        <div className="container mt-5 d-flex justify-content-center col-lg-8 ">

            <div className="row justify-content-center">
                <div className="col-lg-12 col-xl-12">
                    <div className="text-center mb-4 col-lg-12 ">
                        <h3>
                            <i className="fa fa-users fa-3x text-info"></i>
                        </h3>
                        <p>Freshers & Experienced Hire and Deploy</p>
                        <p className="text-center text-danger">{message}</p>
                    </div>

                    <div className="card border-0 shadow-lg ">
                        <div className="card-header bg-dark text-white">
                            <h5 className="text-center">
                                <i className="fa fa-lock fa-lg "></i> Login
                            </h5>
                        </div>
                        <div className="card-body col-lg-12">
                            <div className="mb-4">
                                <p>Email ID</p>
                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <p>Password</p>
                                <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-success" onClick={loginCheck}>
                                Login <i className="fa fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyLogin;
