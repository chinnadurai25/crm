import React, { useState } from "react";
import axios from "axios";

function Form() {
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [projectType, setProjectType] = useState("");
    const [projectBudget, setProjectBudget] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/save", {
                name,
                companyName,
                email,
                phone,
                projectType,
                projectBudget,
                projectDescription
            });

            alert("Form Submitted successfully!");

            // Reset form
            setName("");
            setCompanyName("");
            setEmail("");
            setPhone("");
            setProjectType("");
            setProjectBudget("");
            setProjectDescription("");
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit form. Please check if the backend is running.");
        }
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h1>Start Your Project</h1>
                <p>Fill out the form below and our team will get in touch with you</p>
            </div>

            <form className="project-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                        id="companyName"
                        type="text"
                        placeholder="Acme Inc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group flex-1">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group flex-1">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            id="phone"
                            type="text"
                            placeholder="+1 (555) 123-4567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="projectType">Project Type</label>
                    <select
                        id="projectType"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select project type</option>
                        <option value="web">Web Development</option>
                        <option value="mobile">Mobile App</option>
                        <option value="design">UI/UX Design</option>
                        <option value="marketing">Digital Marketing</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="projectBudget">Project Budget</label>
                    <input
                        id="projectBudget"
                        type="text"
                        placeholder="$10,000 - $25,000"
                        value={projectBudget}
                        onChange={(e) => setProjectBudget(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="projectDescription">Project Description</label>
                    <textarea
                        id="projectDescription"
                        placeholder="Please describe your project requirements, goals, and any specific features you need..."
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="submit-btn">Submit Request</button>
            </form>
        </div>
    );
}

export default Form;