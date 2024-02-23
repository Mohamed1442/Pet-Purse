# Pet Purse App

## Live Demo
You can access the live demo of the Pet Purse App [here](https://pet-purse-app-v1.netlify.app).

## Setup Instructions and How to Use the App
### Prerequisites
Make sure you have the following installed on your machine:
- Node.js
- npm

### Installation Steps
1. Clone the repository to your local machine
2. Install dependencies:
   ```bash
   npm install
3. Run the app locally:
   ```bash
   npm run dev

# Usage
### Pet Owner:
1. Sign up for a pet owner account with your email and password.
   - **Note:** For testing purposes, you can use the following test account:
     - Email: ownertest@test.com
     - Password: password
2. Log in and create a pet profile with details such as name, age, and type.
3. Set up expense categories (e.g., food, toys) and assign budget limits.
4. Assign sitters for owned pets.
5. Confirm expenses which exceeds the limit from pet sitters and submit pet care invoices.

### Pet Sitter:
1. Sign up for a pet owner account with your email and password.
   - **Note:** For testing purposes, you can use the following test account:
     - Email: sittertest@test.com
     - Password: password
2. Can add expenses to pets assigned to him with taking owner's budget limit into consideration.
3. Can track the confirmation status from the owner with three different states (pending, accepted, refused)

### Vet or Pet Care Service Provider:
1. Sign up for a pet owner account with your email and password.
   - **Note:** For testing purposes, you can use the following test account:
     - Email: vet@test.com
     - Password: password
2. Log in and submit invoices to the pet owner.
3. Track the status of sent invoices.

# Overall Architecture
The Pet Purse App is built using React with TypeScript, Redux for App-Wide State management and Tailwind CSS for styling. The app uses a mock backend (JSON server) for data retrieval with axios for making AJAX calls.

## Authentication
- User able to Sign up, Login and Logout.
- User authentication is implemented using Firebase authentication and only authenticated users can access the dashboard.
- Authentication is based on email and password.
- All routes are protected to ensure access is limited to authorized users (each role has its own routes).

# Note
While the app is functional, it requires attention in certain areas for improvement:

- Business logic clarification needed, especially in handling vet invoices and tracking pet services' expenses.
- Sign up bug (user created in firebase but no data for that user to be used in the app).
- Bugs in authentication error responses (due to wrong cridinials in login or worng data format in sign up) need fixing.
- Some Responsive design issues require fix for better usability.
- Overall UI enhancement.