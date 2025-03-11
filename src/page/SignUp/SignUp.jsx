import React, {useEffect, useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {useNavigate} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function SignUp() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [passRepeat, setPassRepeat] = useState("");
	const passRepeatRef = useRef(null);
	const [passMatchError, setPassMatchError] = useState(null);

	const validatePassword = (password) => {
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
		if (!passwordRegex.test(password)) {
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (passRepeatRef.current && validatePassword(pass) && passRepeat !== "") {
			if (passRepeat === pass) {
				passRepeatRef.current.style.borderColor = "green";
				setPassMatchError(false);
			} else {
				passRepeatRef.current.style.borderColor = "red";
				setPassMatchError(true);
			}
		}
	}, [pass, passRepeat]);

	const handleRegister = async (e) => {
		e.preventDefault();
		if (!passMatchError) {
			navigate("/");
		}
	};

	return (
		<Container
			style={{
				display: "flex",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Form
				className="d-flex flex-column"
				onSubmit={handleRegister}
				style={{
					marginLeft: "auto",
					marginRight: "auto",
					padding: "25px 20px",
					border: "1px solid #ccc", // Сіра границя
					borderRadius: "8px", // Заокруглені кути
					boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.1)",
				}}
			>
				<h1 style={{alignSelf: "center"}} className="mb-3">
					Sign up
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

				<FloatingLabel
					controlId="floatingInputPassRepeat"
					label="Password Repeat"
					className="mb-2"
				>
					<Form.Control
						ref={passRepeatRef}
						type="password"
						placeholder="Repeat password"
						aria-label="Reapeat password"
						value={passRepeat}
						onChange={(e) => setPassRepeat(e.target.value)}
						style={{
							boxShadow: "none",
							borderWidth: 2,
						}}
						required
					/>
					<Form.Text id="passwordHelpBlock" muted>
						Your password must be 8-20 characters long, contain letters and
						<br />
						numbers, and must not contain spaces, special characters, or emoji.
					</Form.Text>
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
					disabled={passMatchError}
				>
					Sign up
				</Button>
			</Form>
		</Container>
	);
}
