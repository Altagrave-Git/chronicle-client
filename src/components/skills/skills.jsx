import "./skills.scss";
import { ReactComponent as ReactLogo } from "../../icons/react.svg";
import { ReactComponent as HtmlLogo } from "../../icons/html.svg";
import { ReactComponent as CssLogo } from "../../icons/css.svg";
import { ReactComponent as SassLogo } from "../../icons/sass.svg";
import { ReactComponent as JavascriptLogo } from "../../icons/javascript.svg";
import { ReactComponent as JqueryLogo } from "../../icons/jquery.svg";
import { ReactComponent as PythonLogo } from "../../icons/python.svg";
import { ReactComponent as DjangoLogo } from "../../icons/django.svg";
import { ReactComponent as RestLogo } from "../../icons/rest.svg";
import { ReactComponent as PostgresLogo } from "../../icons/postgresql.svg";
import { ReactComponent as AuthLogo } from "../../icons/oauth2.svg";
import { ReactComponent as GithubLogo } from "../../icons/github.svg";
import { ReactComponent as NginxLogo } from "../../icons/nginx.svg";
import { ReactComponent as GunicornLogo } from "../../icons/gunicorn.svg";
import { ReactComponent as LinuxLogo } from "../../icons/linux.svg";
import { ReactComponent as BashLogo } from "../../icons/bash.svg";
import { ReactComponent as AnacondaLogo } from "../../icons/anaconda.svg";
import { ReactComponent as OpenIDLogo } from "../../icons/openid.svg";

const Skills = () => {

  return (
    <div className="skills">
      <div className="skills-container">
        <div className="front-end">
          <h3>Front End</h3>
          <ul className="skills-list">
            <li>Responsive Web Design</li>
            <li>DOM Manipulation</li>
            <li>CRUD / AJAX</li>
            <li>Event Scripting</li>
            <li>State Management</li>
            <li>API Integration</li>
            <li>Client-side Routing</li>
            <li>Component-based Arch.</li>
          </ul>
          <div className="icon-container">
            <ul className="icon-list">
              <li className="icon">
                <HtmlLogo />
                HTML
              </li>
              <li className="icon">
                <CssLogo />
                CSS
              </li>
              <li className="icon">
                <SassLogo />
                SCSS
              </li>
              <li className="icon">
                <JavascriptLogo className="javascript-logo" />
                JavaScript
              </li>
              <li className="icon">
                <JqueryLogo />
                jQuery
              </li>
              <li className="icon">
                <ReactLogo />
                React
              </li>
            </ul>
          </div>
        </div>
        <div className="back-end">
          <h3>Back End</h3>
          <ul className="skills-list">
            <li>Authentication</li>
            <li>Routing & Mapping</li>
            <li>Request Handling</li>
            <li>Serialization</li>
            <li>Database Design</li>
            <li>Data Manipulation</li>
            <li>API Development</li>
            <li>Server-side Rendering</li>
          </ul>
          <div className="icon-container">
            <ul className="icon-list">
              <li className="icon">
                <PythonLogo />
                Python
              </li>
              <li className="icon">
                <DjangoLogo />
                Django
              </li>
              <li className="icon">
                <RestLogo />
                Rest API
              </li>
              <li className="icon">
                <PostgresLogo />
                PostgreSQL
              </li>
              <li className="icon">
                <AuthLogo />
                OAuth 2.0
              </li>
              <li className="icon">
                <OpenIDLogo />
                OIDC
              </li>
            </ul>
          </div>
        </div>
        <div className="dev-ops">
          <h3>Sys & Ops</h3>
          <ul className="skills-list">
            <li>Linux Server Config.</li>
            <li>Database Configuration</li>
            <li>Version Control</li>
            <li>CI/CD Pipelines</li>
            <li>Reverse Proxy Routing</li>
            <li>Environment Management</li>
            <li>SSH Access & Tunneling</li>
            <li>Distributed Systems</li>
          </ul>
          <div className="icon-container">
            <ul className="icon-list">
              <li className="icon">
                <GithubLogo className="icon" />
                Github
              </li>
              <li className="icon">
                <NginxLogo />
                Nginx
              </li>
              <li className="icon">
                <GunicornLogo className="gunicorn-logo" />
                Gunicorn
              </li>
              <li className="icon">
                <LinuxLogo className="linux-logo" />
                Linux
              </li>
              <li className="icon">
                <BashLogo className="bash-logo" />
                Bash
              </li>
              <li className="icon">
                <AnacondaLogo />
                Anaconda
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
