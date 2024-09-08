import app from '../src/index.js'; // Import your Express app
import User from '../src/models/user.js'; // Import the User model
import mongoose from 'mongoose';


import chaiModule, {  expect } from "chai";
import chaiHttp from "chai-http";

const chai = chaiModule.use(chaiHttp);



describe('User Routes', () => {
    before(async () => {
        // Connect to the test database
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    after(async () => {
        // Disconnect from the test database
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        // Clear the users collection before each test
        await User.deleteMany({});
    });

    describe('GET /users', () => {
        it('should get all users', async () => {
            const res = await chai.request(app).get('/api/users');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(0);
        });
    });

    describe('GET /users/:id', () => {
        it('should get a user by ID', async () => {
            const user = new User({
                userType: 'Farmer',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                phone: '1234567890',
                password: 'password123',
                city: 'CityName',
                state: 'StateName',
                profilePicture: 'profile.jpg',
                businessName: 'John\'s Farm',
                businessAddress: '123 Farm Lane',
                landArea: '50 acres',
                farmingType: 'Organic',
                hasTransportService: true,
                isCertified: true,
                istermsAccepted: true
            });
            await user.save();

            const res = await chai.request(app).get(`/api/users/${user._id}`);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('firstName', 'John');
            expect(res.body).to.have.property('lastName', 'Doe');
            expect(res.body).to.have.property('email', 'john@example.com');
        });

        it('should return 404 if user not found', async () => {
            const res = await chai.request(app).get('/api/users/invalidUserId');
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message', 'User not found');
        });
    });

    // Add more tests for POST, PUT, DELETE routes as needed
});