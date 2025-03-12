import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {Link, useNavigate} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../logic/firebase";

export default function SignIn() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, pass);
			alert("✅ Успішний вхід!");
			navigate("/");
		} catch (error) {
			if (error.code === "auth/user-not-found") {
				alert("❌ Користувача не знайдено! Перевірте email.");
			} else if (error.code === "auth/invalid-credential") {
				alert("❌ Невірний пароль або email");
			} else {
				alert("❌ Помилка входу: " + error.message);
			}
		}
	};

	return (
		<Container
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<Form
				className="d-flex flex-column"
				onSubmit={handleLogin}
				style={{
					padding: "25px 20px",
					border: "1px solid #ccc",
					borderRadius: "8px",
					boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.1)",
					width: "60dvh",
				}}
			>
				<h1 style={{alignSelf: "center"}} className="mb-3">
					Sign in
				</h1>
				<InputGroup className="mb-2">
					<Form.Control
						placeholder="Email"
						aria-label="Email"
						aria-describedby="basic-addon2"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={{
							boxShadow: "none",
							borderWidth: 2,
						}}
						required
					/>
					<InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
				</InputGroup>

				<FloatingLabel
					controlId="floatingInputPass"
					label="Password"
					className="mb-2"
				>
					<Form.Control
						type="password"
						placeholder="Password"
						aria-label="Password"
						value={pass}
						onChange={(e) => setPass(e.target.value)}
						style={{
							boxShadow: "none",
							borderWidth: 2,
						}}
						required
					/>
				</FloatingLabel>
				<Button
					variant="primary"
					size="lg"
					style={{
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 0,
						maxHeight: 60,
					}}
					type="submit"
				>
					Sign in
				</Button>
				<div style={{display: "flex", justifyContent: "space-between"}}>
					<Link to="/">Home</Link>
					<Link to="/sign-up">Sign up</Link>
				</div>
			</Form>
		</Container>
	);
}
