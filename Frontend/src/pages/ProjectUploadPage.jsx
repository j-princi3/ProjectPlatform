import React, { useState } from "react";
import TextArea from "../components/TextArea";
import { TagsInput } from "react-tag-input-component";
import { Button } from "@material-tailwind/react";
import { addProject } from "../services/projectData";

function ProjectUploadPage() {
  const [Author, changeAuthor] = useState([]);
  const [Domain, changeDomain] = useState([]);
  const [projectData, setProjectData] = useState({
    title: "",
    authors: [],
    domain: [],
    abstract: "",
    document: null,
  });

  const handleInputChange = (field, value) => {
    setProjectData({ ...projectData, [field]: Array.isArray(value) ? value : [value] });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProjectData({ ...projectData, document: file });
  };

  const handleUploadProject = async () => {
    try {
      const newProject = await addProject(projectData);
      console.log("Project uploaded successfully:", newProject);

      // Reset form
      setProjectData({
        title: "",
        authors: [],
        domain: [],
        abstract: "",
        document: null,
      });
    } catch (error) {
      console.error("Error uploading project:", error);
    }
  };

  return (
    <div className="font-Arial m-0 p-0 bg-beige">
      <div className="mt-16 font-Arial">
        <h1 className="flex items-center justify-center mt-3 mb-0 text-xl md:text-5xl text-bold">
          Project Upload
        </h1>
      </div>
      <div className="flex items-center justify-center font-Arial m-0 p-0 bg-beige">
        <section className="flex flex-col md:flex-row mx-auto p-4 md:p-8 bg-whitesmoke shadow-md rounded-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUploadProject();
            }}
            encType="multipart/form-data"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 justify-center"
          >
            <div className="md:col-span-2 lg:col-span-1 bg-palevioletred text-blanchedalmond p-2 md:p-12 rounded-4 text-18 font-bold text-xl">
              Idea Title (100 characters):
            </div>
            <TextArea
              label="Title"
              onChange={(e) => handleInputChange("title", e.target.value)}
              value={projectData.title}
            />
            
            <div className="md:col-span-2 lg:col-span-1 bg-palevioletred text-blanchedalmond p-2 md:p-12 rounded-4 text-18 font-bold text-xl">
              Authors(s) Username:
            </div>
            <TagsInput
              value={Author}
              onChange={changeAuthor}
              name="Authors"
              placeHolder="Enter Author Name:"
            />

            <div className="md:col-span-2 lg:col-span-1 bg-palevioletred text-blanchedalmond p-2 md:p-12 rounded-4 text-18 font-bold text-xl">
            Domain (AIML, Blockchain, etc):
            </div>
            <TagsInput
              value={Domain}
              onChange={changeDomain}
              name="Domain"
              placeHolder="Enter Domain:"
            />

            <div className="md:col-span-2 lg:col-span-1 bg-palevioletred text-blanchedalmond p-2 md:p-12 rounded-4 text-18 font-bold text-xl">
              Abstract (1500 characters):
            </div>
            <TextArea
              label="Abstract"
              onChange={(e) => handleInputChange("abstract", e.target.value)}
              value={projectData.abstract}
            />
            
            <div className="md:col-span-2 lg:col-span-1 bg-palevioletred text-blanchedalmond p-2 md:p-12 rounded-4 text-18 font-bold text-xl">
              Document (PDF or word format, up to 500Kb):
            </div>
            <div className="md:col-span-2 lg:col-span-1 p-2 md:p-12 rounded-4 text-18 font-bold text-xl">
              <input
                type="file"
                accept=".pdf, .doc, .docx"
                onChange={handleFileChange}
                multiple
              />
            </div>

            <div className="flex jmt-4 flex-col md:flex-row mx-auto col-span-2">
              <div className="mb-2 md:mr-2 display-block">
                <Button variant="filled" size="lg" type="submit">
                  Plagiarism Checker
                </Button>
              </div>
              <br />
              <div className="mb-2">
                <Button variant="filled" size="lg" type="submit">
                  Upload Project
                </Button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ProjectUploadPage;

 
 