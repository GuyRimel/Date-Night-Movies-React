import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

export default function Navbar({ user }) {
  const onLoggedOut = () => {
		localStorage.clear();
		window.open("/", "_self");
	};

  const isAuth = () => {
		if (typeof window == "undefined") {
			return false;
		}
		if (localStorage.getItem("token")) {
				return localStorage.getItem("token");
		} else {
			return false;
		}
	};

  return (
		<>
			<Container>
				<Navbar className="nav mb-1" variant="dark">
					<Container>
						<Navbar.Brand href="/">See You at the Movies!</Navbar.Brand>
						<Nav className="d-flex align-items-baseline">

							<NavLink className="text p-3" to="/">
								Home
							</NavLink>
							{isAuth() && (<NavLink className="text p-3" to={`/users/${user}`}>
								Profile
							</NavLink>)}
							{!isAuth() && (<NavLink className="text p-3" to="/register">
								Register
							</NavLink>)}
							{isAuth() && (<Button className="p-3 bg-transparent border-0" variant="primary" onClick={onLoggedOut}>
								Logout
							</Button>)}
						</Nav>
					</Container>
				</Navbar>
			</Container>
		</>
	);
}
