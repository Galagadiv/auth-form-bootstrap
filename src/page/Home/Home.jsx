import React, {useEffect, useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";

import {useNavigate} from "react-router-dom";

import {Link} from "react-router-dom";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../../logic/firebase";

export default function Home() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	const handleSignOut = async (e) => {
		e.preventDefault();
		try {
			await signOut(auth);
			alert("Ви вийшли з аккаунта");
		} catch (er) {
			console.log(er.message);
			alert("Сталася помилка під час виходу");
		}
	};

	useEffect(() => {
		const logState = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
			} else navigate("/sign-in");
		});
		return () => logState();
	}, [auth, navigate]);

	if (user === null) {
		return (
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		);
	}

	return (
		<>
			<header>
				<Navbar expand="lg" className="bg-body-tertiary" sticky="top">
					<Container>
						<Navbar.Brand href="/">Auth app</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link as={Link} to="/">
									Home
								</Nav.Link>
								<NavDropdown title="All pages" id="basic-nav-dropdown">
									<NavDropdown.Item as={Link} to="/sign-in">
										Sign in
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/sign-up">
										Sign up
									</NavDropdown.Item>
									{/* відокремлення */}
									<NavDropdown.Divider />
									{/* Відмінність від верхнього 
                                    використання 
                                    import {Link} from "react-router-dom";*/}
									<NavDropdown.Item href="#action/3.4">Home</NavDropdown.Item>
								</NavDropdown>
							</Nav>
							<Form className="d-flex">
								<Form.Control
									type="search"
									placeholder="Search"
									className="me-2"
									aria-label="Search"
								/>
								<ButtonGroup aria-label="Basic example">
									<Button variant="success">Search</Button>

									<Button
										variant="danger"
										onClick={handleSignOut}
										style={{whiteSpace: "nowrap"}}
									>
										Log out
									</Button>
								</ButtonGroup>
							</Form>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
			<main style={{height: "100%", paddingBottom: 0}}>
				<Container style={{height: "100%"}}>
					<Note />
				</Container>
			</main>
		</>
	);
}

function Note() {
	const [note, setNote] = useState("");
	const txtareaRef = useRef(null);

	const handleChange = (e) => {
		const newValue = e.target.value;
		setNote(newValue);

		// Якщо textarea існує, курсор встановлюється на початок
		// if (txtareaRef.current) {
		// 	txtareaRef.current.selectionStart = 0;
		// 	txtareaRef.current.selectionEnd = 0;
		// }
	};

	return (
		<Form className="d-flex flex-column" style={{height: "90dvh"}}>
			<Button
				variant="primary"
				size="lg"
				style={{
					borderBottomLeftRadius: 0,
					borderBottomRightRadius: 0,
					maxHeight: 60,
				}}
			>
				Save note
			</Button>
			<Form.Control
				as="textarea"
				ref={txtareaRef}
				placeholder="Take notes"
				className="me-2 flex-grow-1"
				aria-label="Note"
				value={note}
				onChange={handleChange}
				style={{
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0,
					boxShadow: "none",
					borderWidth: 2,
					resize: "none",
					overflowY: "auto",
				}}
			/>
		</Form>
	);
}
