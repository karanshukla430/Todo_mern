import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/Appcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Header from "./components/Header";
import Main from "./pages/Main";
import Account from "./pages/Account";
import Single from "./pages/Single";
import Search from "./pages/Search";
import Spinner from "./components/Spinner";
import SignUp from "./pages/SignUp";
import Playlist from "./pages/Playlist";
import ExistingPlayList from "./pages/ExistingPlayList";
import NotFound from "./pages/NotFound";
import TodoPage from "./pages/TodoPage";
import "./static/app.css";
import "./static/style.css";
import "./static/util.css";
function App() {
  // Huraay
  // Huraay
  // Huraay
  // Huraay
  // Huraay
  
  return (
    <AppProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Search />} />
          <Route path="/search/:id" element={<Main />} />
          <Route path="/tasklist/:playlistId" element={<ExistingPlayList />} />
          <Route path="/single/:id" element={<Single />} />
          <Route path="/create-list" element={<TodoPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/spinner" element={<Spinner />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/notFound" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
