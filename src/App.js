import React, {useState} from "react";
import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import Auth from "./components/Auth/Auth";
import SignIn from "./components/Auth/SignIn";
import { ProjectsProvider, SelectedProjectProvider } from './context';
import { AuthProvider } from "./context/auth-context";
import { Provider } from './components/TimeTracker/context';
import { NotesProvider } from './components/Notepad/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/auth-context";
import './App.scss';

const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  const { currentUser } = useAuth();

  return (
  <AuthProvider>
  <SelectedProjectProvider>
    <ProjectsProvider>
    <Provider>
    <NotesProvider>
    <div className="app">
    <main
          className={darkMode ? 'darkmode' : undefined}
        >
      <Router>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={!currentUser ? <Auth /> : <Content />} />
            <Route path="/auth" element={<Auth /> }/>
            <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router> 
        </main>
    </div>
    </NotesProvider>
    </Provider>
    </ProjectsProvider>
  </SelectedProjectProvider>
  </AuthProvider>
  );
}

export default App;
