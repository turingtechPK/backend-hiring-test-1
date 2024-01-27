# Twilio Call Forwarding and Voicemail System
This project implements a Twilio-powered call forwarding and voicemail system. It allows a customer to call the main number of your company and choose between two options:

Press 1: Forward the call to your personal phone.
Press 2: Leave a voicemail for later listening.
The project includes features such as logging calls in a database, tracking call duration, and displaying an activity feed.

# Prerequisites
Before you begin, make sure you have the following:

# Node.js installed
# npm (Node Package Manager) installed
# MongoDB installed and running (if using MongoDB)

# Getting Started
Follow these steps to set up and run the project:

# Clone the Repository:


git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install Dependencies:


npm install

# Configure Twilio:

Create a Twilio account if you don't have one.
Obtain your Twilio Account SID, Auth Token, and purchase a Twilio phone number.
Update the config.js file with your Twilio credentials.
Configure Database (if using MongoDB):

If using MongoDB, replace 'YOUR_MONGODB_URI' in server.js with your actual MongoDB connection URI.

# Run the Server:

npm start

# Expose Locally with ngrok (for testing Twilio webhooks):

Download and install ngrok.
#Expose your local server to the internet:

ngrok http 3000

Update your Twilio phone number's webhook URLs with the ngrok URLs.

# Test the Application:

Call your Twilio phone number and test the call forwarding and voicemail features.
Access the activity feed by visiting http://localhost:3000/activity-feed in your browser.

# Project Structure
src/controllers/:

twilioController.js: Handles incoming calls and forwards them based on user input.
voicemailController.js: Handles voicemail recording callbacks.
src/models/:

callModel.js: Defines the MongoDB schema for storing call information.
src/routes/:

index.js: Defines routes including Twilio webhook endpoints and the activity feed endpoint.
src/server.js:

Main server file that sets up Express and defines the server logic.
src/config.js:

Configuration file for storing Twilio credentials.
src/controllers/activityFeedController.js:

Controller for retrieving the activity feed from the database.

# Additional Information
The duration of each call is tracked and stored in the database.
Voicemail audio links are saved, allowing you to listen to voicemails later.
The activity feed provides information on each call, including status, duration, and voicemail audio links.

# Contributing
Feel free to contribute to the project by submitting issues or pull requests. Your contributions are welcome!

# License
This project is licensed under the MIT License.