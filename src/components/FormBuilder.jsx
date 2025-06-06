import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import { smartAsk } from "../utils/aiService";
import "./FormBuilder.css";

const MOCK_USER = {
  name: "Neelam",
  paid: true, // Mark as paid to bypass payment check
  formsGeneratedCount: 0,
};

const MOCK_USER_PROFILE = {
  "Full Name": "Neelam Sadat",
  "Date of Birth": "1990-01-01",
  "Email": "neelamsayed100@gmail.com",
};

const FormBuilder = () => {
  const [user, setUser] = useState(MOCK_USER);
  const [userProfile, setUserProfile] = useState(MOCK_USER_PROFILE);

  const [formType, setFormType] = useState("");
  const [region, setRegion] = useState("");
  const [formStructure, setFormStructure] = useState(null);
  const [formAnswers, setFormAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});

  const totalFields = formStructure
    ? formStructure.sections.reduce(
      (acc, section) => acc + section.questions.length,
      0
    )
    : 0;

  useEffect(() => {
    if (!formStructure) return;

    const newAnswers = {};
    formStructure.sections.forEach((section) => {
      section.questions.forEach((q) => {
        if (userProfile[q]) newAnswers[q] = userProfile[q];
      });
    });
    setFormAnswers(newAnswers);
    setCurrentStep(0);
    setErrors({});
  }, [formStructure, userProfile]);

  const validateStep = () => {
    if (!formStructure) return true;
    const currentSection = formStructure.sections[currentStep];
    const newErrors = {};
    let valid = true;
    currentSection.questions.forEach((q) => {
      if (!formAnswers[q] || formAnswers[q].trim() === "") {
        newErrors[q] = "This field is required";
        valid = false;
      }
    });
    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (currentStep < formStructure.sections.length - 1) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleGenerateForm = async () => {
    if (!formType || !region) {
      alert("Please enter both form type and region.");
      return;
    }

    setLoading(true);
    try {
      const prompt = `Create a standard JSON structure for a "${formType}" application in the "${region}" region. 
Return JSON with:
- formType
- region
- sections: array of sections, each with a title and a list of questions (text only). 
Do not explain. Return pure JSON. Make sure it reflects standard fields used in real forms from that region.`;

      const rawJson = await smartAsk(prompt);
      const parsed = JSON.parse(rawJson);
      setFormStructure(parsed);
      setFormAnswers({});
      setCurrentStep(0);
      setErrors({});

      setUser((prev) => ({
        ...prev,
        formsGeneratedCount: prev.formsGeneratedCount + 1,
      }));
    } catch (error) {
      console.error("❌ Error generating form structure:", error);
      alert("Something went wrong. Try again or check the console.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (question, value) => {
    setFormAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));

    if (errors[question]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[question];
        return newErrors;
      });
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(formAnswers, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formStructure?.formType || "form"}-data.json`;
    a.click();
  };

  const downloadPDF = () => {
    const element = document.getElementById("form-preview");
    if (!element) return;
    html2pdf()
      .set({
        margin: 0.5,
        filename: `${formStructure?.formType || "form"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <div className="form-builder-container">
      <h1>AutoForm AI</h1>
      <div className="form-header-inputs">
        <input
          type="text"
          placeholder="Enter Form Type (e.g., Rental, Visa)"
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Region (e.g., US, UK, India)"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <button className="generate-btn" onClick={handleGenerateForm}>
          {loading ? "Generating..." : "Generate Form"}
        </button>
      </div>

      {formStructure && (
        <div id="form-preview">
          <h2>{formStructure.formType} Application</h2>
          <p>Region: {formStructure.region}</p>

          {formStructure.sections.map((section, index) => {
            if (index !== currentStep) return null;
            return (
              <div key={index} className="section">
                <h3>{section.title}</h3>
                {section.questions.map((q, i) => (
                  <div key={i} className="question">
                    <label>{q}</label>
                    <input
                      type="text"
                      value={formAnswers[q] || ""}
                      onChange={(e) => handleChange(q, e.target.value)}
                    />
                    {errors[q] && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {errors[q]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}

          <div className="button-row">
            {currentStep > 0 && <button onClick={handlePrev}>Previous</button>}
            {currentStep < formStructure.sections.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <>
                <button className="json-btn" onClick={downloadJSON}>
                  Download JSON
                </button>
                <button className="pdf-btn" onClick={downloadPDF}>
                  Download PDF
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;










