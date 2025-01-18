'use client';

import React, { useState } from 'react';

interface FormData {
  github: string;
  linkedin: string;
}

const ProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    github: '',
    linkedin: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        a.click();
      }
    } catch (error) {
      console.error('Error generating resume:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Profile Links</h2>
        <div className="space-y-4">
          <input
            type="url"
            placeholder="GitHub Profile URL"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="input-field"
            required
          />
          <input
            type="url"
            placeholder="LinkedIn Profile URL"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            className="input-field"
            required
          />
        </div>
      </div>

      <button type="submit" className="btn-primary">
        Generate Resume
      </button>
    </form>
  );
};

export default ProfileForm; 