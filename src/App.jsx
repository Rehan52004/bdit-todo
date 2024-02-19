import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowRepeat } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import image from "./assets/rightSideImage.svg";

function App() {
	//initializing todos or incompleted todos
	const initTodos = localStorage.getItem("Todos")
		? JSON.parse(localStorage.getItem("Todos"))
		: [];

	//initializing completed todos
	const initCompletedTodos = localStorage.getItem("CompletedTodos")
		? JSON.parse(localStorage.getItem("CompletedTodos"))
		: [];

	//for taking user input
	const [input, setInput] = useState("");

	const [todos, setTodos] = useState(initTodos);
	const [completedTodos, setCompletedTodos] = useState(initCompletedTodos);

	//for displaying list of desired todos by default it show incompleted todos
	const [todosList, setTodosList] = useState(initTodos);

	//adding a new task
	function addHandler(e) {
		e.preventDefault();
		setTodos([
			...todos,
			{ id: Date.now(), task: input, isCompleted: false },
		]);
		setTodosList([
			...todos,
			{ id: Date.now(), task: input, isCompleted: false },
		]);
		setInput("");
	}

	//getting incompleted list of todos
	function getIncompletedList() {
		setTodosList(todos);
	}

	//getting completed list of todos
	function getCompletedList() {
		setTodosList(completedTodos);
	}

	//mark complete
	function completedHandler(id) {
		let requiredTodo = todos.find((todo) => todo.id === id);
		let filterTodos = todos.filter((todo) => todo.id !== id);
		setCompletedTodos([
			...completedTodos,
			{ id, task: requiredTodo.task, isCompleted: true },
		]);
		setTodos([...filterTodos]);
		setTodosList([...filterTodos]);
	}

	//delete task
	function deleteHandler(id) {
		const filteredTodos = todos.filter((todo) => todo.id !== id);
		const filteredCompletedTodos = completedTodos.filter(
			(todo) => todo.id !== id
		);
		if (filteredTodos.length !== todos.length) {
			setTodos(filteredTodos);
			setTodosList(filteredTodos);
		}
		if (filteredCompletedTodos.length !== completedTodos.length) {
			setCompletedTodos(filteredCompletedTodos);
			setTodosList(filteredCompletedTodos);
		}
	}

	//Re adding the task in incompleted list
	function reAddHandler(id) {
		let desiredTodo = completedTodos.find((todo) => todo.id === id);
		let filteredTodos = completedTodos.filter((todo) => todo.id !== id);
		setTodos([
			...todos,
			{ id, task: desiredTodo.task, isCompleted: false },
		]);
		setCompletedTodos([...filteredTodos]);
		setTodosList([...filteredTodos]);
	}

	useEffect(() => {
		localStorage.setItem("Todos", JSON.stringify(todos));
		localStorage.setItem("CompletedTodos", JSON.stringify(completedTodos));
	}, [todos, completedTodos, todosList]);

	return (
		<>
			<div
				style={{
					backgroundColor: "#393F49",
					minHeight: "100vh",
					color: "white",
				}}
			>
				<Container fluid="lg" className="px-md-5">
					<div className="d-flex justify-content-between align-items-center py-4">
						<div>
							<h1>Todo List</h1>
						</div>
						<div className="d-block d-md-flex">
							<div
								className="me-0 mb-2 mb-md-0 me-md-5"
								onClick={getIncompletedList}
								style={{ cursor: "pointer" }}
							>
								Incompleted Task
							</div>
							<div
								onClick={getCompletedList}
								style={{ cursor: "pointer" }}
							>
								Completed Task
							</div>
						</div>
					</div>

					<Row>
						<Col lg="8">
							<Row className="mb-5">
								<Col xs="12">
									<form
										onSubmit={(e) => addHandler(e)}
										className="d-flex align-items-start flex-column align-md-items-center flex-md-row"
									>
										<input
											type="text"
											placeholder="Enter your task"
											onChange={(e) =>
												setInput(e.target.value)
											}
											style={{
												width: "100%",
												padding: "5px",
												borderRadius: "5px",
												borderColor: "white",
												margin: "0px 5px 0px 0px",
											}}
										/>
										<Button
											variant="info"
											style={{
												width: "30%",
											}}
											className="mt-2 mt-md-0 text-light"
											type="submit"
										>
											Add Task
										</Button>
									</form>
								</Col>
							</Row>
							{todosList ? (
								todosList.map((todo, i) => (
									<div
										key={i}
										className="d-flex justify-content-between align-items-center py-4 px-3 border-top border-secondary"
									>
										<div className="d-flex align-items-center">
											<div className="me-2">
												{!todo.isCompleted ? (
													<GoCheckCircleFill
														style={{
															cursor: "pointer",
														}}
														className="check-btn"
														size={23}
														onClick={() =>
															completedHandler(
																todo.id
															)
														}
													/>
												) : (
													<BsArrowRepeat
														style={{
															cursor: "pointer",
														}}
														size={23}
														onClick={() =>
															reAddHandler(
																todo.id
															)
														}
													/>
												)}
											</div>
											<div
												className={
													todo.isCompleted
														? "line-throw"
														: ""
												}
											>
												{todo.task}
											</div>
										</div>
										<div>
											<RiDeleteBin6Line
												style={{ cursor: "pointer" }}
												size={21}
												className="delete-btn"
												onClick={() =>
													deleteHandler(todo.id)
												}
											/>
										</div>
									</div>
								))
							) : (
								<h2>No Task</h2>
							)}
						</Col>
						<Col md="4" className="d-none d-lg-block px-4">
							<img
								src={image}
								alt="image"
								style={{
									height: "25rem",
									width: "100%",
									backgroundColor: "white",
									borderRadius: "5px",
								}}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}

export default App;
