import React from 'react';

const sendToLambda = ({ name, title, message }) => {
  const url = "https://3ahw3zl4t4.execute-api.eu-west-1.amazonaws.com/production/feedback"
}

class FeedbackForm extends React.Component {

  constructor(props) {
    super(props)

    this.nameInput = React.createRef();
    this.titleInput = React.createRef();
    this.messageInput = React.createRef();

    this.state = {
      sending: false,
    }
  }

  onSubmit = (event) => {
    console.log('Got these values:', this.nameInput.current.value, this.titleInput.current.value, this.messageInput.current.value)
    console.log('sending now')
    sendToLambda({
      name: this.nameInput.current.value,
      title: this.titleInput.current.value,
      message: this.messageInput.current.value,
    })
    this.setState({ sending: true });
    setTimeout(() => { this.setState({ sending: false })}, 5000)
    event.preventDefault()
  }

  render() {

    if (this.state.sending) {
      return <div>Spinning</div>
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
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
            <input type="text" name="message" ref={this.messageInput} />
          </label>
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default FeedbackForm;

