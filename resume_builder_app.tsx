import React, { useState } from 'react';
import { Upload, FileText, Sparkles, Download, TrendingUp, User, Briefcase, GraduationCap, Award, Code } from 'lucide-react';

const ResumeBuilder = () => {
  const [step, setStep] = useState('input');
  const [inputMethod, setInputMethod] = useState(null);
  const [resumeData, setResumeData] = useState({
    personal: { name: '', email: '', phone: '', location: '', linkedin: '' },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: []
  });
  const [atsScore, setAtsScore] = useState({ before: 0, after: 0 });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [processing, setProcessing] = useState(false);

  const templates = [
    { id: 'modern', name: 'Modern Professional', preview: 'Clean, ATS-friendly layout with clear sections' },
    { id: 'classic', name: 'Classic Executive', preview: 'Traditional format with elegant typography' },
    { id: 'tech', name: 'Tech Focused', preview: 'Optimized for technical roles with project highlights' }
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProcessing(true);
      // Simulate file processing
      setTimeout(() => {
        setResumeData({
          personal: { name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', location: 'San Francisco, CA', linkedin: 'linkedin.com/in/johndoe' },
          summary: 'Experienced software engineer with 5+ years in full-stack development',
          education: [{ degree: 'BS Computer Science', school: 'University of California', year: '2018', gpa: '3.8' }],
          experience: [
            { title: 'Senior Software Engineer', company: 'Tech Corp', duration: '2020-Present', points: ['Led team of 5 developers', 'Improved performance by 40%'] }
          ],
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
          projects: [{ name: 'E-commerce Platform', description: 'Built scalable platform serving 100K users' }]
        });
        setAtsScore({ before: 65, after: 0 });
        setStep('scoring');
        setProcessing(false);
      }, 2000);
    }
  };

  const handleManualEntry = () => {
    setInputMethod('manual');
    setStep('manual-entry');
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { degree: '', school: '', year: '', gpa: '' }]
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { title: '', company: '', duration: '', points: [''] }]
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { name: '', description: '' }]
    });
  };

  const enhanceWithAI = async () => {
    setProcessing(true);
    setStep('enhancing');
    
    // Simulate AI enhancement
    setTimeout(() => {
      setAtsScore({ ...atsScore, after: 92 });
      setStep('template-selection');
      setProcessing(false);
    }, 3000);
  };

  const generateResume = () => {
    setProcessing(true);
    setTimeout(() => {
      setStep('complete');
      setProcessing(false);
    }, 2000);
  };

  // Input Selection Screen
  if (step === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Resume Builder & ATS Optimizer</h1>
            <p className="text-lg text-gray-600">Create professional, ATS-optimized resumes in minutes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer" onClick={() => document.getElementById('file-upload').click()}>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Upload className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Upload Resume</h2>
                <p className="text-gray-600 mb-4">Upload your existing resume (PDF or Word) and let AI optimize it</p>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                  Choose File
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer" onClick={handleManualEntry}>
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                  <FileText className="w-12 h-12 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Build from Scratch</h2>
                <p className="text-gray-600 mb-4">Enter your details manually and create a resume from the ground up</p>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                  Start Building
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Manual Entry Screen
  if (step === 'manual-entry') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Enter Your Details</h1>
          
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resumeData.personal.name}
                  onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, name: e.target.value}})}
                  className="border rounded-lg px-4 py-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={resumeData.personal.email}
                  onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, email: e.target.value}})}
                  className="border rounded-lg px-4 py-2"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={resumeData.personal.phone}
                  onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, phone: e.target.value}})}
                  className="border rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={resumeData.personal.location}
                  onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, location: e.target.value}})}
                  className="border rounded-lg px-4 py-2"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
              <textarea
                placeholder="Brief summary of your experience and goals..."
                value={resumeData.summary}
                onChange={(e) => setResumeData({...resumeData, summary: e.target.value})}
                className="w-full border rounded-lg px-4 py-2 h-24"
              />
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <GraduationCap className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold">Education</h2>
                </div>
                <button onClick={addEducation} className="text-blue-600 hover:text-blue-700">+ Add</button>
              </div>
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="grid md:grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="Degree" className="border rounded-lg px-4 py-2" />
                  <input type="text" placeholder="School" className="border rounded-lg px-4 py-2" />
                  <input type="text" placeholder="Year" className="border rounded-lg px-4 py-2" />
                  <input type="text" placeholder="GPA (optional)" className="border rounded-lg px-4 py-2" />
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Code className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Skills</h2>
              </div>
              <input
                type="text"
                placeholder="Enter skills separated by commas (e.g., JavaScript, React, Python)"
                value={resumeData.skills.join(', ')}
                onChange={(e) => setResumeData({...resumeData, skills: e.target.value.split(',').map(s => s.trim())})}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <button
              onClick={() => { setAtsScore({before: 0, after: 0}); setStep('scoring'); }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Continue to ATS Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ATS Scoring Screen
  if (step === 'scoring') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">ATS Score Analysis</h1>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Current ATS Score</span>
                <span className="text-3xl font-bold text-orange-600">{atsScore.before}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-orange-600 h-4 rounded-full transition-all duration-500" style={{width: `${atsScore.before}%`}}></div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">Improvement Areas Detected:</h3>
              <ul className="list-disc list-inside text-yellow-700 space-y-1">
                <li>Missing industry-specific keywords</li>
                <li>Experience descriptions could be more impactful</li>
                <li>Skills section needs optimization</li>
                <li>Achievement metrics are not quantified</li>
              </ul>
            </div>

            <button
              onClick={enhanceWithAI}
              disabled={processing}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-semibold flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {processing ? 'Enhancing with AI...' : 'Enhance with AI'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AI Enhancement Screen
  if (step === 'enhancing') {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Enhancement in Progress</h2>
          <p className="text-gray-600">Using OpenAI and Gemini to optimize your resume...</p>
          <div className="mt-8 space-y-2 text-left">
            <div className="flex items-center text-green-600">
              <span className="mr-2">✓</span> Analyzing content structure
            </div>
            <div className="flex items-center text-green-600">
              <span className="mr-2">✓</span> Optimizing keywords
            </div>
            <div className="flex items-center text-blue-600 animate-pulse">
              <span className="mr-2">⟳</span> Improving phrasing and tone
            </div>
            <div className="flex items-center text-gray-400">
              <span className="mr-2">○</span> Calculating new ATS score
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Template Selection Screen
  if (step === 'template-selection') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-2">AI Enhancement Complete!</h3>
                <p className="text-green-700">Your resume has been optimized for ATS systems</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-green-600 mb-1">New ATS Score</div>
                <div className="text-4xl font-bold text-green-600 flex items-center">
                  {atsScore.after}%
                  <TrendingUp className="w-8 h-8 ml-2" />
                </div>
                <div className="text-sm text-green-600">+{atsScore.after - atsScore.before}% improvement</div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-6">Choose Your Template</h1>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition hover:shadow-xl ${
                  selectedTemplate === template.id ? 'ring-4 ring-blue-500' : ''
                }`}
              >
                <div className="bg-gray-100 h-48 rounded mb-4 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.preview}</p>
              </div>
            ))}
          </div>

          <button
            onClick={generateResume}
            disabled={!selectedTemplate || processing}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {processing ? 'Generating Resume...' : 'Generate Resume'}
          </button>
        </div>
      </div>
    );
  }

  // Completion Screen
  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-12 max-w-2xl text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Resume Ready!</h1>
          <p className="text-lg text-gray-600 mb-8">Your ATS-optimized resume has been generated successfully</p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Original Score</div>
                <div className="text-3xl font-bold text-orange-600">{atsScore.before}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Final Score</div>
                <div className="text-3xl font-bold text-green-600">{atsScore.after}%</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </button>
            <button className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition font-semibold flex items-center justify-center">
              <Download className="w-5 h-5 mr-2" />
              Download Word (.docx)
            </button>
            <button
              onClick={() => { setStep('input'); setResumeData({ personal: {}, summary: '', education: [], experience: [], skills: [], projects: [] }); setSelectedTemplate(null); }}
              className="w-full bg-gray-200 text-gray-700 py-4 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Create Another Resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ResumeBuilder;