# OpenAI Codex App

An interactive web-based chat application powered by OpenAI Codex. Users can ask questions to the AI model, and the application will provide the AI-generated response.

## Features

- User-friendly chat interface.
- Real-time interaction with the OpenAI Codex model.
- Typing effect for a more realistic chat experience.
- First-time input prompt saved for easier bootstrapping in future sessions.

## Folder Structure

\```
├── client
│   ├── index.html
│   ├── script.js
│   └── style.css
└── server
    └── server.js
\```

### Client

- `index.html`: The main HTML file rendering the chat interface.
- `script.js`: Handles the dynamic functionality of the chat interface, including the typing effect, sending messages, and fetching responses from the server.
- `style.css`: Contains styles for the chat interface.

### Server

- `server.js`: The server-side code which interfaces with the OpenAI Codex API to fetch the model's responses.

## Prerequisites

1. You need an OpenAI API key to use the application. Store it as `OPENAI_API_KEY` in a `.env` file within the server directory.
2. Install the necessary packages using `npm` or `yarn`.

## Setup

1. Clone the repository.

    \```bash
    git clone <repository_url>
    \```

2. Navigate to the server directory and install the dependencies.

    \```bash
    cd server
    npm install
    \```

3. Run the server.

    \```bash
    npm start
    \```

    The server should be running on [http://localhost:5000](http://localhost:5000).

4. Open `client/index.html` in your preferred browser to interact with the chat application.

## Usage

1. Type in your question or prompt in the provided textbox.
2. Click on the send button or press Enter to send the message.
3. Wait for the AI's response, which will be displayed shortly.

## Contributions

Feel free to contribute to the project by submitting pull requests or raising issues.

