import React, { useState } from 'react'
import { Card, Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function CommentButton(props) {
	const [show, setShow] = useState(false);
	const [commentData, setCommentData] = useState()
	const token = localStorage.getItem('token');
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const navigate = useNavigate()

// console.log({props})
	const handleSubmit = (e) => {
		e.preventDefault()
		axios({
			method: 'post',
			url: 'https://breadditlaravel-tonybwatson324900.codeanyapp.com/api/v1/comments',
			data: {
				content: commentData,
				post_id: props.post.comments[0].post_id
			},
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
				'Access-Control-Allow-Credentials': true,
				'Authorization': 'Bearer ' + token
			},
		})
			.then(function (response) {
				// console.log(response);
				handleClose();
				// console.log(response)
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	const handleChange = (e) => {
		const newCommentData = e.target.value
		setCommentData(newCommentData)
	}

	const handleRedirect = () => {
		handleClose()
		navigate(`/${props.post.comments[0].post_id}`)
	}
	
	return (
		<>
			<Card>
				<Button variant="dark" onClick={handleShow}>
					Leave a Comment
    			</Button>
			</Card>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Comment</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formComment">
							<Form.Control
								type="name"
								placeholder="Comment Text"
								onChange={handleChange}
								defaultValue={commentData}
							/>
						</Form.Group>
					</Form>

				</Modal.Body>
				<Modal.Footer>
					<Button type="button" variant="dark" onClick={handleClose}>
						Cancel
    				</Button>
					<Button type="button" variant="dark" onClick={handleSubmit}>
						Create
    				</Button>
				</Modal.Footer>
				</Modal>
		</>
	)
}