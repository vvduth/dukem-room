import Navbar from "components/Navbar";
import type { Route } from "./+types/home";
import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import Button from "components/ui/Button";
import Upload from "components/Upload";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const handleUploadComplete = async (base64Image:string ) => {
    const newId = Date.now().toString();

    navigate(`/visualizer/${newId}`);
    return true;
  }
  return (
    <div className="home">
      <Navbar />
      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>
          <p>Introducing Dukem Room</p>
        </div>
        <h1>Build beautiful spaces at the speed of thought with Dukem Room</h1>
        <p className="subtitle">
          Dukem Room is a powerful and intuitive tool that leverages Ai power to
          help you visualize, render and ship architectural projects faster than
          ever before. With Dukem Room, you can create stunning 3D models,
          generate photorealistic renderings, and collaborate seamlessly with
          your team, all in one platform. Whether you're an architect, designer,
          or builder, Dukem Room empowers you to bring your ideas to life with
          unparalleled speed and precision.
        </p>
        <div className="actions">
          <a href="#upload" className="cta">
            Get started <ArrowRight className="icon" />
          </a>
          <Button variant="outline" size="lg" className="demo">
            Watch demo
          </Button>
        </div>
        <div id="upload" className="upload-shell">
          <div className="grid-overlay" />
          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon"/>
              </div>
              <h3>Upload your floor plan</h3>
              <p>Support jpg, png, formats up to 10MB</p>
            </div>
            <Upload onComplete={handleUploadComplete}/>
          </div>
        </div>
      </section>
      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Project</h2>
              <p>Your latest work and
                 shared community projects, all in one place.</p>
            </div>
          </div>
          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img 
                  src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png"
                  alt="project"
                />
                <div className="badge">
                  <span>Community</span>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <h3>Project Tampere</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span>{new Date('2027-01-01').toLocaleDateString()}</span>
                    <span>By Evum</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
