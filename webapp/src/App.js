import "./App.css";
import "./style.css";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import TopNav from "./Components/TopNav";
import Library from "./Components/Library";
import Project from "./Components/Project";
import Department from "./Components/Department";
import Committee from "./Components/Committee";
import Contact from "./Components/Contact";
import SingleDepartment from "./Components/SingleDepartment";
import AddBook from "./Components/AddBook";
import About from "./Components/About";

import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  const renderLibrary = () => <Library />;
  const renderHome = () => <Home />;
  const renderProject = () => <Project />;
  const renderDepartment = () => <Department />;
  const renderCommittee = () => <Committee />;
  const renderContact = () => <Contact />;
  const renderSingleDepartment = () => <SingleDepartment />;
  const renderAddBook = () => <AddBook />;
  const renderUpdateBook = () => <AddBook />;
  const renderAbout = () => <About />;

  return (
    <div className="App">
      <Router>
        <TopNav />
        <Route exact path="/" component={renderHome} />
        <Route exact path="/library" component={renderLibrary} />
        <Route exact path="/projects" component={renderProject} />
        <Route exact path="/departments" component={renderDepartment} />
        <Route exact path="/committees" component={renderCommittee} />
        <Route exact path="/contact" component={renderContact} />
        <Route
          exact
          path="/department/:dname"
          component={renderSingleDepartment}
        />
        <Route exact path="/library/add" component={renderAddBook} />
        <Route
          exact
          path="/library/update/:bookid"
          component={renderUpdateBook}
        />
        <Route exact path="/about-us" component={renderAbout} />

        <Footer />
      </Router>
    </div>
  );
}

export default App;
