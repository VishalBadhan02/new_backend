const { ableToSwitchToFrame } = require("selenium-webdriver/lib/until")
const { CampusAmbassadorModel } = require("../models/CAList")
const sendMailer = require("../helpers/mailGun")
const reply = require("../helpers/reply")
const { CampusAmbassadorRegistrationModel } = require("../models/CARegistration")


const getCALeads = async (req, res) => {
    try {
        const data = await CampusAmbassadorModel.find()
        return res.json(data)
    } catch (error) {
        return res.json("error in setting leads", error)
    }
}

const sendMail = async (req, res) => {
    try {
        const value = req.params;
        const data = await CampusAmbassadorModel.find();
        const CA = await CampusAmbassadorModel.findOne({ _id: value.id });
        if (!CA) {
            throw new Error("No data found for the specified Campus Ambassador");
        }

        const tableRows = data.map((ambassador) => {
            return `
                <tr style="border:1px solid black">
                    <td style="border:1px solid black; padding: 5px;">${ambassador.name}</td>
                    <td style="border:1px solid black; padding: 5px;">${ambassador.college || 'N/A'}</td>
                    <td style="border:1px solid black; padding: 5px;">${ambassador.role || 'Campus Ambassador'}</td>
                </tr>`;
        }).join('');

        await sendMailer(CA.email, "Congratulations! You’ve Been Shortlisted as a Campus Ambassador for Academor!",
            `<div style="font-family: Arial, sans-serif;">
                <div style="padding: 20px;">
                    <img src="https://www.academor.com/static/media/New_logo.6e38efabb2c2bf7d4347.png" alt="Academor Logo" width="300" />
                    <p>Dear <strong>${CA.name}</strong>,</p>
                    <p>Greetings from the HR Team at <strong>Academor!</strong></p>
                    <p>We are excited to offer you the opportunity to kickstart your career as a Campus Ambassador. Join us in promoting Academor and gain valuable real-world experience, certificates, and more.</p>
                    
                    <h3>Why Join Us?</h3>
                    <ul>
                        <li><strong>Real-World Experience:</strong> Exposure to marketing, strategy, and sales.</li>
                        <li><strong>Certificates & Recommendations:</strong> 
                            <ul>
                                <li>Certificate of Appreciation</li>
                                <li>Certificate of Completion</li>
                                <li>Letter of Recommendation from our CEO</li>
                                <li>LinkedIn Recommendation from senior executives</li>
                            </ul>
                        </li>
                        <li><strong>Earn a Stipend:</strong> Earn up to INR 10,000 based on your performance.</li>
                        <li><strong>Exclusive Internships:</strong> Chance to win free internships with top MNCs.</li>
                    </ul>

                    <h3>Roles & Responsibilities:</h3>
                    <ul>
                        <li>Promote Academor on social media and in your college.</li>
                        <li>Organize Webinars and Meets to engage your peers.</li>
                        <li>Encourage student participation in Academor's programs.</li>
                    </ul>

                    <h3>Meet Your Fellow Shortlisted Students:</h3>
                    <table style="border-collapse: collapse; width: 100%; border: 1px solid black;">
                        <thead>
                            <tr>
                                <th style="border: 1px solid black; padding: 5px;">Name</th>
                                <th style="border: 1px solid black; padding: 5px;">College/University</th>
                                <th style="border: 1px solid black; padding: 5px;">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>

                    <p>Join this incredible team and embark on a rewarding journey with <strong>Academor</strong>!</p>
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="${`http://15.207.254.148:3000/campus_ambassabor/${CA._id}`}" style="text-decoration: none;">
                            <button style="background-color: #23C1F5; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                                Register Now
                            </button>
                        </a>
                    </div>

                    <h3>Ready to Apply?</h3>
                    <p>Don’t miss out on this amazing opportunity to grow your skills and enhance your resume. Apply today!</p>
                    
                    <p>Best regards,</p>
                    <p>Vishal, Senior Executive, Academor</p>

                    <hr style="margin-top: 20px;" />
                    <p style="font-size: 12px;">If you no longer wish to receive emails from us, <a href="unsubscribe_link">click here to unsubscribe</a>.</p>
                </div>
            </div>`
        );

        return res.status(200).json(reply.success("Email sent successfully"));
    } catch (error) {
        return res.status(500).json(reply.failure("Error sending email", error.message));
    }
}


const getCADetails = async (req, res) => {
    try {
        const data = await CampusAmbassadorModel.findOne({ _id: req.params.id })
        return res.json(data)
    } catch (error) {
        return res.status(500).json(reply.failure("Error in saving response", error.message));

    }
}

const setCARegistration = async (req, res) => {
    try {
        const {
            fullname,
            email,
            password,
            conformPassword
        } = req.body;

        const register = new CampusAmbassadorRegistrationModel({
            fullname,
            email,
            password,
            conformPassword,
            status: "active"
        })
        register.save()

        return res.json(reply.success("Registration done succesfully!"))

    } catch (error) {
        return res.json(reply.failure("Error in setting CA"))
    }
}

module.exports = { getCALeads, sendMail, getCADetails, setCARegistration }