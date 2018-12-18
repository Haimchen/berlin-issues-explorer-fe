import React from 'react';

import './FeedbackForm.css';

const randomName = () => {
  return 'whiny Whale';
}

const sendToLambda = (messageObj, onSuccess, onError) => {

  const content = JSON.stringify(messageObj)
  const url = "https://3ahw3zl4t4.execute-api.eu-west-1.amazonaws.com/production/feedback"
  fetch(url, {
    method: 'POST',
    body: content,
    mode: 'no-cors',
  }).then((res) => {
    console.log('messsage sent:', res)
    onSuccess(res)
  }).catch( err => {
    onError(err)
  })
}

const validate = ({ name, title = '', text }) => {
  console.log('validating', text)
  const isValid = text.length > 10;
  console.log('is valid?', isValid)
  const messageObj = {
    name: name ? name : randomName(),
    title,
    text,
  }
  return {
    isValid,
    messageObj
  }
}

class FeedbackForm extends React.Component {

  constructor(props) {
    super(props)

    this.nameInput = React.createRef();
    this.titleInput = React.createRef();
    this.messageInput = React.createRef();

    this.state = {
      sending: false,
      sent: false,
    }
  }

  afterSubmit = (res) => {
    this.setState(() => ({ sending: false, sent: true }))
  }

  onError = (err) => {
    this.setState(() => ({ sending: false }))
  }

  onSubmit = (event) => {
    event.preventDefault()
    console.log('Got these values:', this.nameInput.current.value, this.titleInput.current.value, this.messageInput.current.value)
    const formData = {
      name: this.nameInput.current.value,
      title: this.titleInput.current.value,
      text: this.messageInput.current.value,
    }
    const { isValid, messageObj } = validate(formData)

    if (!isValid) return;

    console.log('sending now')
    sendToLambda(messageObj, this.afterSubmit, this.onError)
    this.setState({ sending: true });
  }

  render() {

    if (this.state.sent) {
      return <div>Thank you! Your feedback is appreciated!</div>
    }

    if (this.state.sending) {
      return <div>Spinning</div>
    }

    return (
      <div className="feedback">
        <form onSubmit={this.onSubmit} className="feedback-form">
          <label>
            Your Name
            <input type="text" name="name" ref={this.nameInput} />
          </label>
          <label>
            What is this about?
            <input type="text" name="title" ref={this.titleInput} />
          </label>
          <label>
            Your Message
            <textarea name="message" ref={this.messageInput} />
          </label>
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default FeedbackForm;

