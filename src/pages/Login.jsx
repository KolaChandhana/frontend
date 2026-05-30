import API from "../Api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [pincodeError, setPincodeError] = useState("");
    const [cityError, setCityError] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState({
        firstName: "",
        lastName: ""
    });
    const [number, setNumber] =useState("");
    const [address, setAddress] = useState({
        line1: "",
        line2: ""
    });
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Email and password required");
            return;
        }
        try {
            const response = await API.post("/auth/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/Home");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        let hasError = false;
        if (!name.firstName || !name.lastName || !email || !password || !number || !pincode || !city) {
            setError("All fields are required");
            hasError = true;
        }
        if (hasError) return;
        try {
            await API.post("/auth/register", {
                firstName: name.firstName,
                lastName: name.lastName,
                email,
                password,
                phone: number,
                addressLine1: address.line1,
                addressLine2: address.line2,
                pincode,
                city,
            });
            alert("Registration successful ✅");
            setIsRegister(false);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };
    useEffect(() => {
        setEmail("");
        setPassword("");
        setError("");
        setEmailError("");
        setPasswordError("");
        setFirstNameError("");
        setLastNameError("");
        setPhoneError("");
        setPincodeError("");
        setCityError("");
    }, [isRegister]);
    return (
        <div className="login-container">
            <div className={`login-box ${isRegister ? "register-mode" : ""}`}>
                <h3 className="register-title">{isRegister ? "Register" : "Sign in"}</h3>
                {isRegister && (
                <div className="form-grid">
                    <input type="text"placeholder="First Name" value={name.firstName}onChange={(e) => 
                        setName({ ...name, firstName: e.target.value })}
                        required
                    />
                    {firstNameError && <p style={{ color: "red" }}>{firstNameError}</p>}
                    <input type="text" placeholder="Last Name" value={name.lastName} onChange={(e) => 
                        setName({ ...name, lastName: e.target.value })}
                        required
                    />
                    {lastNameError && <p style={{ color: "red" }}>{lastNameError}</p>}
                    <div className="phone-input">
                        <select value={countryCode} onChange={(e) => 
                            setCountryCode(e.target.value)}>
                                <option value="+91">+91</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                        </select>
                        <input type="text" placeholder="Phone Number" value={number} onChange={(e) => 
                            setNumber(e.target.value.replace(/\D/g, ""))}
                        />
                    </div>
                    {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
                    <input type="text" placeholder="Address Line 1 (House No, Street)"value={address.line1}onChange={(e) =>
                        setAddress({ ...address, line1: e.target.value })}
                        required
                    />
                    <input type="text" placeholder="Address Line 2 (Apartment, Landmark)" value={address.line2}onChange={(e) =>
                        setAddress({ ...address, line2: e.target.value })}
                    />
                    <input type="text" placeholder="Pincode" value={pincode} maxLength={6}onChange={(e) =>
                        setPincode(e.target.value)}
                        required
                    />
                    {pincodeError && <p style={{ color: "red" }}>{pincodeError}</p>}
                    <input type="text" placeholder="City" value={city}onChange={(e) => 
                        setCity(e.target.value)}
                        required
                    />
                    {cityError && <p style={{ color: "red" }}>{cityError}</p>}
                </div>
                )}
                <div className='main'>
                    <label>Email</label>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                    />
                    {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <button className="sign-btn register-btn" onClick={isRegister ? handleRegister : handleLogin}>
                    {isRegister ? "Register" : "Sign in"}
                </button>
                <p className="terms-text">
                    By continuing, you agree to RecipeBook App
                    <a href="#">Conditions of Use</a> and 
                    <a href="#">Privacy Notice</a>.
                </p>
                <p className="login-switch">
                    {isRegister ? "Already have an account?" : "New user?"}{" "}
                    <span onClick={() => setIsRegister(!isRegister)} style={{ color: "blue", cursor: "pointer" }}>
                        {isRegister ? "Login" : "Create account"}
                    </span>
                </p>
            </div>
        </div>
    );
}
export default Login;

