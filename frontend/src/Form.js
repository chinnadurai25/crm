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
    const [document, setDocument] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("companyName", companyName);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("projectType", projectType);
            formData.append("projectBudget", projectBudget);
            formData.append("projectDescription", projectDescription);
            formData.append("document", document);

            await axios.post("http://localhost:5000/save", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("Form Submitted successfully!");
            setName(""); setCompanyName(""); setEmail(""); setPhone("");
            setProjectType(""); setProjectBudget(""); setProjectDescription("");
            setDocument(null);
        } catch (error) {
            console.error("Submission error:", error);
            const errorMessage = error.response?.data || "Failed to submit form.";
            alert(errorMessage);
        }
    };

    return (
        <div style={styles.wrapper}>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
                input:focus, select:focus, textarea:focus { 
                    outline: none !important; 
                    border-color: #2563eb !important; 
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1) !important;
                }
                .submit-btn:hover { background-color: #1d4ed8 !important; transform: translateY(-1px); }
                .submit-btn:active { transform: translateY(0); }
                `}
            </style>
            
            <div style={styles.container}>
                <div style={styles.header}>
                    <span style={styles.badge}>B2B Project Portal</span>
                    <h1 style={styles.title}>Project Inquiry</h1>
                    <p style={styles.subtitle}>Submit your requirements to receive a customized technical proposal.</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Section 1: Partnership Details */}
                    <h3 style={styles.sectionTitle}>Client Information</h3>
                    <div style={styles.row}>
                        <div style={styles.group}>
                            <label style={styles.label}>Full Name</label>
                            <input style={styles.input} type="text" placeholder="e.g. Alex Chen" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Company Entity</label>
                            <input style={styles.input} type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.group}>
                            <label style={styles.label}>Corporate Email</label>
                            <input style={styles.input} type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Contact Number</label>
                            <input style={styles.input} type="text" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                    </div>

                    {/* Section 2: Project Parameters */}
                    <h3 style={styles.sectionTitle}>Project Scope</h3>
                    <div style={styles.row}>
                        <div style={styles.group}>
                            <label style={styles.label}>Engagement Type</label>
                            <select style={styles.input} value={projectType} onChange={(e) => setProjectType(e.target.value)} required>
                                <option value="" disabled>Select engagement type</option>
                                <option value="web">Enterprise Web Apps</option>
                                <option value="mobile">Native Mobile Development</option>
                                <option value="design">Product UI/UX Design</option>
                                <option value="marketing">Growth & Marketing</option>
                            </select>
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Estimated Budget Range</label>
                            <input style={styles.input} type="text" placeholder="e.g. $50k - $100k" value={projectBudget} onChange={(e) => setProjectBudget(e.target.value)} required />
                        </div>
                    </div>

                    <div style={styles.group}>
                        <label style={styles.label}>Technical Requirements & Objectives</label>
                        <textarea style={{...styles.input, minHeight: '120px', resize: 'vertical'}} placeholder="Briefly outline your project goals and key features..." value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} required />
                    </div>

                    <div style={styles.group}>
                        <label style={styles.label}>Supporting Documentation</label>
                        <div style={styles.fileUpload}>
                            <input type="file" id="doc" style={{display: 'none'}} onChange={(e) => setDocument(e.target.files[0])} />
                            <label htmlFor="doc" style={styles.fileLabel}>
                                {document ? `Selected: ${document.name}` : "Click to upload Briefing PDF/Doc"}
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" style={styles.button}>
                        Submit Formal Request
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        backgroundColor: '#f1f5f9',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    container: {
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '850px',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
    },
    header: {
        padding: '48px 48px 32px 48px',
        borderBottom: '1px solid #f1f5f9',
        textAlign: 'center',
    },
    badge: {
        color: '#2563eb',
        backgroundColor: '#eff6ff',
        padding: '6px 14px',
        borderRadius: '50px',
        fontSize: '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        display: 'inline-block',
        marginBottom: '16px',
    },
    title: {
        fontSize: '32px',
        fontWeight: '800',
        color: '#0f172a',
        margin: '0 0 12px 0',
        letterSpacing: '-0.02em',
    },
    subtitle: {
        fontSize: '16px',
        color: '#64748b',
        margin: 0,
        lineHeight: '1.6',
    },
    form: {
        padding: '40px 48px',
    },
    sectionTitle: {
        fontSize: '14px',
        fontWeight: '700',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '24px',
        marginTop: '32px',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '8px',
    },
    row: {
        display: 'flex',
        gap: '24px',
        marginBottom: '4px',
        flexWrap: 'wrap',
    },
    group: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '24px',
        flex: '1 1 300px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#334155',
        marginBottom: '8px',
    },
    input: {
        padding: '14px 16px',
        borderRadius: '12px',
        border: '1px solid #cbd5e1',
        fontSize: '15px',
        backgroundColor: '#fff',
        transition: 'all 0.2s ease',
        color: '#1e293b',
    },
    fileUpload: {
        border: '2px dashed #cbd5e1',
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
    },
    fileLabel: {
        cursor: 'pointer',
        color: '#64748b',
        fontSize: '14px',
        fontWeight: '500',
    },
    button: {
        width: '100%',
        padding: '16px',
        backgroundColor: '#2563eb',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginTop: '20px',
    }
};

export default Form;