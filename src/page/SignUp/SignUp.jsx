import React, {useEffect, useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {Link, useNavigate} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
} from "firebase/auth";
import {auth} from "../../logic/firebase";

export default function SignUp() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [passRepeat, setPassRepeat] = useState("");
	const passRepeatRef = useRef(null);
	const [passMatchError, setPassMatchError] = useState(false);
	const [confirmSent, setConfirmSent] = useState(false);
	const [user, setUser] = useState(null);

	const validatePassword = (password) => {
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
		if (passwordRegex.test(password)) {
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (passRepeatRef.current && validatePassword(pass)) {
			if (passRepeat === pass && passRepeat !== "") {
				passRepeatRef.current.style.borderColor = "green";
				setPassMatchError(false);
			} else if (passRepeat !== "") {
				passRepeatRef.current.style.borderColor = "red";
				setPassMatchError(true);
			}
		}
	}, [pass, passRepeat]);

	useEffect(() => {
		if (confirmSent) {
			const interval = setInterval(async () => {
				await auth.currentUser.reload();
				if (auth.currentUser.emailVerified) {
					clearInterval(interval);
					await signInWithEmailAndPassword(auth, email, pass);
					navigate("/");
				}
			}, 3000);

			return () => clearInterval(interval);
		}
	}, [confirmSent, email, pass, navigate]);

	const handleRegister = async (e) => {
		e.preventDefault();
		if (!email || !validatePassword(pass) || pass !== passRepeat) {
			alert("Please fill in all fields correctly.");
			return;
		}

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				pass
			);
			const newUser = userCredential.user;
			setUser(newUser);
			await sendEmailVerification(newUser);
			setConfirmSent(true);
			alert("Confirm your email");
		} catch (er) {
			alert(er.message);
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
				onSubmit={handleRegister}
				style={{
					padding: "25px 20px",
					border: "1px solid #ccc", // Сіра границя
					borderRadius: "8px", // Заокруглені кути
					boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.1)",
					width: "60dvh",
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
					<Form.Text
						id="passwordHelpBlock"
						style={{
							fontSize: 10,
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							display: "block",
							maxWidth: "100%", // або конкретна ширина
						}}
						title="Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
						muted
					>
						Your password must be 8-20 characters long, contain letters and
						numbers, and must not contain spaces, special characters, or emoji.
					</Form.Text>
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
				</FloatingLabel>
				<Button
					variant="primary"
					size="lg"
					style={{
						maxHeight: 60,
					}}
					type="submit"
					disabled={passMatchError}
				>
					Sign up
				</Button>
				<div style={{display: "flex", justifyContent: "space-between"}}>
					<Link to="/">Home</Link>
					<Link to="/sign-in">Sign in</Link>
				</div>
			</Form>
		</Container>
	);
}
