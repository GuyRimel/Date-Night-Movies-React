import React from "react";
import { Container, Nav, Navbar, Button, Link } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./nav-bar.scss";

export function NavBar({ user }) {
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
				<Navbar className="nav mb-2" variant="dark" expand="lg">
					<Container>
						<Navbar.Brand href="/">Date Night Movies!</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
        		<Navbar.Collapse>
							<Nav className="align-items-start">
								<NavLink className="text m-2" to="/">
									Home
								</NavLink>
								{isAuth() && (<NavLink className="text m-2" to={`/users/${user}`}>
									Profile
								</NavLink>)}
								{!isAuth() && (<NavLink className="text m-2" to="/register">
									Register
								</NavLink>)}
								{isAuth() && (<NavLink className="text m-2" onClick={onLoggedOut}>
									Logout
								</NavLink>)}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
		</>
	);
}

export default NavBar;
