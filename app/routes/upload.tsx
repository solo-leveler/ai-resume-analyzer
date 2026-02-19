import React, { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";

const upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart Feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="Resume scanning animation"
                className="w-full"
              />
            </>
          ) : (
            <h2>Drop your Resume for an ATS score</h2>
          )}
          {!isProcessing && (
            <form action="" id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input type="text" id="company-name" name="company-name" placeholder="Company name" />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" id="job-title" name="job-title" placeholder="Job title" />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea rows={5} id="job-description" name="job-description" placeholder="Job description"></textarea>
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Resume Upload</label>
                <FileUploader />
              </div>

              <button className="primary-button" type="submit">Anaylze Resume</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
